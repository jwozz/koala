from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

model_name = "google/flan-t5-base"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

def generate_response(prompt):
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True)
    outputs = model.generate(inputs["input_ids"], max_length=100, temperature=0.7)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()
    return response

user_input = "Where can I find a stamp maker?"
print("User input:", user_input)
print("Bot response:", generate_response(user_input))
