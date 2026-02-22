TONE_PROMPTS = {
    "casual": (
        "Generate a casual, friendly caption for this image. "
        "Keep it conversational, like something you'd text a friend. "
        "Warm and relatable. 1-2 sentences max."
    ),
    "professional": (
        "Generate a polished, professional caption for this image. "
        "Suitable for LinkedIn or a corporate blog. Thoughtful and articulate. "
        "1-2 sentences max."
    ),
    "witty": (
        "Generate a clever, witty caption for this image. "
        "Use humor, wordplay, or a sharp observation. "
        "Make it the kind of caption that makes someone smirk. 1-2 sentences max."
    ),
    "poetic": (
        "Generate a lyrical, poetic caption for this image. "
        "Use vivid imagery and evocative language. "
        "It should feel like a line from a poem. 1-2 sentences max."
    ),
    "instagram": (
        "Generate an Instagram-ready caption for this image. "
        "Trendy, engaging, with relevant emojis and 3-5 hashtags. "
        "The kind of caption that gets likes and comments."
    ),
}

SYSTEM_PROMPT = (
    "You are CaptionCraft, an AI that generates perfect image captions. "
    "You analyze images carefully and craft captions that match the requested tone. "
    "Be creative, concise, and never generic. Every caption should feel tailored to the specific image."
)
