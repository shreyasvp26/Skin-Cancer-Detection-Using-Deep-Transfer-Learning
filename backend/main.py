import os
import uuid
import logging
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.concurrency import run_in_threadpool

from model.infer import predict_skin_cancer, model
from model.model_loader import verify_model_loaded
from utils.common import UPLOAD_DIR, MAX_UPLOAD_SIZE_BYTES, ALLOWED_IMAGE_EXTENSIONS, MODEL_PATH

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Env config
# ---------------------------------------------------------------------------
ENABLE_DOCS = os.environ.get("ENABLE_DOCS", "false").lower() == "true"
ALLOWED_ORIGINS = [
    o.strip()
    for o in os.environ.get(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://localhost:3000",
    ).split(",")
    if o.strip()
]


# ---------------------------------------------------------------------------
# Lifespan — validate model at startup
# ---------------------------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Validate the model is loaded before accepting requests."""
    if model is None:
        raise RuntimeError("Model failed to load — refusing to start. Check weight file.")
    status = verify_model_loaded(model)
    logger.info("Startup health check: %s", status)
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    yield
    # Shutdown — nothing to clean up


# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------
app = FastAPI(
    title="OncoScan — Skin Cancer Screening API",
    description=(
        "AI-powered skin lesion screening API. "
        "This tool is for RESEARCH AND EDUCATIONAL PURPOSES ONLY. "
        "It is NOT a medical device and has NOT been validated for clinical use."
    ),
    version="1.0.0",
    docs_url="/docs" if ENABLE_DOCS else None,
    redoc_url="/redoc" if ENABLE_DOCS else None,
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@app.get("/")
async def root():
    return {
        "message": "OncoScan API is running",
        "disclaimer": "For research and educational purposes only. Not a medical device.",
    }


@app.get("/health")
async def health():
    """Health-check endpoint for deployment readiness probes."""
    status = verify_model_loaded(model)
    status["model_path"] = os.path.basename(MODEL_PATH)
    return status


@app.post("/predict")
async def predict(
    image: UploadFile = File(...),
    age: int = Form(default=45),
    sex: str = Form(default="unknown"),
    lesion_location: str = Form(default="Other"),
    skin_tone: str = Form(default=""),  # Optional — not used by model
):
    """
    Analyze a dermoscopic image for benign/malignant classification.

    **DISCLAIMER**: This is a research screening tool and is NOT a
    substitute for professional medical evaluation.
    """
    file_path = None
    filename = None
    try:
        # ------------------------------------------------------------------
        # 1. Validate upload
        # ------------------------------------------------------------------
        # Check file extension
        ext = Path(image.filename or "").suffix.lower()
        if ext not in ALLOWED_IMAGE_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type '{ext}'. Allowed: {', '.join(ALLOWED_IMAGE_EXTENSIONS)}",
            )

        # Check file size (read into memory, validate, then write)
        contents = await image.read()
        if len(contents) > MAX_UPLOAD_SIZE_BYTES:
            raise HTTPException(
                status_code=413,
                detail=f"File too large. Maximum size is {MAX_UPLOAD_SIZE_BYTES // (1024*1024)}MB.",
            )

        # Validate magic bytes (JPEG: FF D8 FF, PNG: 89 50 4E 47)
        if not (
            contents[:3] == b"\xff\xd8\xff"  # JPEG
            or contents[:4] == b"\x89PNG"     # PNG
        ):
            raise HTTPException(
                status_code=400,
                detail="File content does not match a valid JPEG or PNG image.",
            )

        # ------------------------------------------------------------------
        # 2. Save to temp file
        # ------------------------------------------------------------------
        filename = f"{uuid.uuid4()}{ext}"
        file_path = os.path.join(UPLOAD_DIR, filename)

        with open(file_path, "wb") as buffer:
            buffer.write(contents)

        # ------------------------------------------------------------------
        # 3. Validate age range
        # ------------------------------------------------------------------
        if not (0 <= age <= 120):
            raise HTTPException(status_code=400, detail="Age must be between 0 and 120.")

        # ------------------------------------------------------------------
        # 4. Run inference
        # ------------------------------------------------------------------
        logger.info(
            "Predict request — age=%s, sex=%s, location=%s, skin_tone=%s",
            age, sex, lesion_location, skin_tone,
        )

        result = await run_in_threadpool(
            predict_skin_cancer,
            image_file=file_path,
            age=age,
            sex=sex,
            lesion_location=lesion_location,
            skin_tone=skin_tone,
        )

        # Add disclaimer to API response
        result["disclaimer"] = (
            "This result is generated by an AI research model and is NOT a medical diagnosis. "
            "Please consult a qualified dermatologist for professional evaluation."
        )

        logger.info("Result: %s (confidence=%.4f)", result["prediction"], result["confidence"])
        return JSONResponse(content=result)

    except HTTPException:
        raise  # Re-raise validation errors as-is

    except Exception as e:
        logger.exception("Prediction failed")
        raise HTTPException(
            status_code=500,
            detail="An internal error occurred during image analysis. Please try again.",
        )

    finally:
        # Always clean up uploaded file — no patient images persist on disk
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
                logger.info("Cleaned up uploaded file: %s", filename or file_path)
            except OSError:
                logger.warning("Failed to clean up: %s", file_path)


# ---------------------------------------------------------------------------
# Entrypoint
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", "8000")),
        reload=os.environ.get("ENV", "production") == "development",
    )
