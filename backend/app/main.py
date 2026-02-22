from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.caption import generate_caption
from app.config import ALLOWED_ORIGINS, ALLOWED_TYPES, MAX_FILE_SIZE, RATE_LIMIT

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="CaptionCraft API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

VALID_TONES = {"casual", "professional", "witty", "poetic", "instagram"}


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.post("/api/caption")
@limiter.limit(RATE_LIMIT)
async def create_caption(
    request: Request,
    image: UploadFile = File(...),
    tone: str = Form("casual"),
):
    # Validate tone
    if tone not in VALID_TONES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid tone. Choose from: {', '.join(sorted(VALID_TONES))}",
        )

    # Validate file type
    if image.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type '{image.content_type}'. Supported: JPG, PNG, WebP",
        )

    # Read and validate file size
    image_bytes = await image.read()
    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size is {MAX_FILE_SIZE // (1024 * 1024)} MB",
        )

    if len(image_bytes) == 0:
        raise HTTPException(status_code=400, detail="Empty file")

    # Generate caption
    try:
        caption = await generate_caption(image_bytes, image.content_type, tone)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Caption generation failed: {str(e)}",
        )

    return {"caption": caption, "tone": tone}
