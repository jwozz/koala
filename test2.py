from transformers import AutoModelForCausalLM, AutoTokenizer

# Load the fine-tuned model and tokenizer
model = AutoModelForCausalLM.from_pretrained("./fine_tuned_model")
tokenizer = AutoTokenizer.from_pretrained("./fine_tuned_model")

# Set pad_token_id if not already set
tokenizer.pad_token = tokenizer.eos_token  # This will prevent any issues with padding

# Test the model with some example input
input_text = "What is your name?"
inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True)

# Generate a response
outputs = model.generate(inputs["input_ids"], max_length=50, num_return_sequences=1, pad_token_id=tokenizer.pad_token_id)

generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

print(generated_text)
