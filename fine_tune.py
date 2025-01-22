from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments
import torch

# Step 1: Load and format the dataset
# Step 1: Load and format the dataset
data = load_dataset("json", data_files="your_dataset.jsonl")

# Format the data for GPT-style causal language modeling
def format_data(example):
    return {"text": example["prompt"] + "\n" + example["response"]}

data = data.map(format_data)

# Split the dataset into train and validation subsets
data = data["train"].train_test_split(test_size=0.2)  # 80% train, 20% validation

# Step 2: Tokenize the dataset
model_name = "EleutherAI/gpt-neo-125m"  # Choose your model
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Ensure the tokenizer has a padding token
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token  # Optionally: tokenizer.add_special_tokens({'pad_token': '[PAD]'})

# Define tokenization function
def tokenize_data(examples):
    # Tokenize the input text
    encoding = tokenizer(examples["text"], truncation=True, padding="max_length", max_length=512)
    
    # Shift the input IDs to create labels (GPT model expects input and labels to be the same)
    encoding["labels"] = encoding["input_ids"].copy()  # Shifted labels for causal LM
    
    return encoding
tokenized_data = data.map(tokenize_data, batched=True)

# Step 3: Define training arguments
training_args = TrainingArguments(
    output_dir="./fine_tuned_model",
    overwrite_output_dir=True,
    num_train_epochs=3,
    per_device_train_batch_size=8,
    save_steps=500,
    save_total_limit=2,
    logging_dir="./logs",
    evaluation_strategy="steps",
    eval_steps=100,
    learning_rate=5e-5,
    warmup_steps=500,
    weight_decay=0.01,
    fp16=torch.cuda.is_available(),  # Enable fp16 only if CUDA (GPU) is available
)

# Step 4: Fine-tune the model
model = AutoModelForCausalLM.from_pretrained(model_name)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_data["train"],
    eval_dataset=tokenized_data["test"],  # Split your dataset for validation
    tokenizer=tokenizer,
)

trainer.train()

# Save the model
trainer.save_model("./fine_tuned_model")
tokenizer.save_pretrained("./fine_tuned_model")
