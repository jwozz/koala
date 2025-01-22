from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

# Specify the model name (you can replace this with your fine-tuned model later)
model_name = "google/flan-t5-base"

# Load the model and tokenizer
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Save the model and tokenizer locally
model.save_pretrained("./fine_tuned_model")
tokenizer.save_pretrained("./fine_tuned_model")

print("Model saved to './fine_tuned_model'")
