import torch
import logging

from .model_loader import load_model
from utils.preprocess import preprocess_image
from utils.metadata_processing import process_metadata
from utils.common import MODEL_PATH, CLASSIFICATION_THRESHOLD

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Eagerly load the model at import time so the server crashes immediately
# if the weights are broken — never serve random predictions.
# ---------------------------------------------------------------------------
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = load_model(MODEL_PATH, device)
logger.info(
    "Inference module ready — threshold=%.2f, device=%s",
    CLASSIFICATION_THRESHOLD,
    device,
)


def predict_skin_cancer(image_file: str, age: int, sex: str,
                        lesion_location: str, skin_tone: str) -> dict:
    """
    Run inference on a dermoscopic image with patient metadata.

    The model uses age and sex to inform its prediction.
    Lesion location and skin tone are logged for reference but do not
    affect the current model output.

    Returns a dict with prediction, confidence, and gradcam_image (null).
    """
    # 1. Preprocess Image
    logger.info("Preprocessing image: %s", image_file)
    image_tensor, original_image_pil = preprocess_image(image_file)
    image_tensor = image_tensor.to(device)

    # 2. Build metadata tensor (age + sex → 3 features)
    metadata_tensor = process_metadata(age, sex, lesion_location, skin_tone)
    metadata_tensor = metadata_tensor.to(device)

    # 3. Inference
    with torch.no_grad():
        output = model(image_tensor, metadata=metadata_tensor)

        # Binary classification — single sigmoid output
        probability = torch.sigmoid(output).item()

        if probability >= CLASSIFICATION_THRESHOLD:
            prediction = "Malignant"
            confidence = probability
        else:
            prediction = "Benign"
            confidence = 1.0 - probability

    logger.info(
        "Prediction: %s (confidence=%.4f, raw_prob=%.4f, threshold=%.2f)",
        prediction, confidence, probability, CLASSIFICATION_THRESHOLD,
    )

    # Grad-CAM is disabled in the current release
    gradcam_image = None

    return {
        "prediction": prediction,
        "confidence": round(confidence, 4),
        "gradcam_image": gradcam_image,
    }