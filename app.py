from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
 
# Initialize FastAPI app
app = FastAPI()

# Allow all origins (can restrict to specific ones for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  
)

# Load the fine-tuned model and tokenizer
model = AutoModelForCausalLM.from_pretrained("./fine_tuned_model")
tokenizer = AutoTokenizer.from_pretrained("./fine_tuned_model")

# Define the input schema for the query
class Query(BaseModel):
    user_input: str

# Chat endpoint
@app.post("/generate")
async def chat(query: Query):
    try:
        # Tokenize the input text (the user's query)
        inputs = tokenizer(query.user_input, return_tensors="pt", padding=True, truncation=True)

        # Ensure to use the pad_token_id as eos_token_id
        output = model.generate(
            inputs['input_ids'], 
            max_length=100, 
            temperature=0.7,         # Lower temperature for less randomness
            do_sample=True,         # Sampling is enabled for variety
            pad_token_id=tokenizer.eos_token_id, 
            top_k=50,               # Top-k sampling (limits the choices for next token)
            top_p=0.95,             # Top-p (nucleus) sampling
            repetition_penalty=2.0, # Helps to reduce repetitive outputs
            num_return_sequences=1  # Only return one generated sequence
        )

        # Decode the generated tokens to text
        generated_text = tokenizer.decode(output[0], skip_special_tokens=True)

        return {"response": generated_text.strip()}

    except Exception as e:
        # Log the error and return a meaningful message
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Root endpoint for health check
@app.get("/")
async def root():
    return {"message": "Chat API is running!"}
