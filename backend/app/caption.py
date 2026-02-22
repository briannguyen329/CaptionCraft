import base64

import anthropic

from app.config import ANTHROPIC_API_KEY
from app.prompts import SYSTEM_PROMPT, TONE_PROMPTS


client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)


async def generate_caption(image_bytes: bytes, media_type: str, tone: str) -> str:
    image_b64 = base64.standard_b64encode(image_bytes).decode("utf-8")

    tone_instruction = TONE_PROMPTS.get(tone, TONE_PROMPTS["casual"])

    message = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        max_tokens=300,
        system=SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
                            "data": image_b64,
                        },
                    },
                    {
                        "type": "text",
                        "text": tone_instruction,
                    },
                ],
            }
        ],
    )

    return message.content[0].text
