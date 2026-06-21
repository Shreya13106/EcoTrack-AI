import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def get_ai_response(user_message):

    prompt = f"""
    You are an eco sustainability expert.

    Help users reduce carbon footprint.

    User Question:
    {user_message}

    Give:
    - practical advice
    - beginner-friendly explanation
    - actionable eco tips
    """

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        model="llama-3.3-70b-versatile"
    )

    response = (
        chat_completion
        .choices[0]
        .message
        .content
    )

    return response