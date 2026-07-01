"""
Model Validation Script
=======================
Quick-check that the skin cancer model loads correctly and can perform inference
on a dummy input tensor with metadata.  Run from the backend/ directory:

    python -m model.test_model

This script does NOT produce clinically meaningful output — it only verifies
that the weight file is compatible with the architecture.
"""

import torch
import sys
import os

# Ensure backend/ is on the path so utils imports work
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from model.model_loader import load_model, verify_model_loaded
from utils.common import MODEL_PATH, CLASSIFICATION_THRESHOLD


def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Device: {device}")
    print(f"Weight file: {MODEL_PATH}")
    print(f"Threshold: {CLASSIFICATION_THRESHOLD}")
    print()

    # 1. Load model (will raise RuntimeError if weights are bad)
    try:
        model = load_model(MODEL_PATH, device)
        print("✅ Model loaded successfully.")
    except RuntimeError as e:
        print(f"❌ Model failed to load: {e}")
        sys.exit(1)

    # 2. Verify model status
    status = verify_model_loaded(model)
    print(f"   Architecture: {status['architecture']}")
    print(f"   Parameters: {status['num_parameters']:,}")
    print()

    # 3. Run dummy inference (image only — no metadata)
    print("Running dummy inference (random 224x224 tensor, no metadata)...")
    dummy_input = torch.randn(1, 3, 224, 224).to(device)

    with torch.no_grad():
        output = model(dummy_input)
        prob = torch.sigmoid(output).item()

    label = "Malignant" if prob >= CLASSIFICATION_THRESHOLD else "Benign"
    confidence = prob if prob >= CLASSIFICATION_THRESHOLD else 1.0 - prob

    print(f"   Raw sigmoid output: {prob:.4f}")
    print(f"   Prediction: {label} (confidence: {confidence:.4f})")
    print()

    # 4. Run dummy inference WITH metadata
    print("Running dummy inference (with metadata: age=45, sex=male)...")
    dummy_metadata = torch.tensor([[0.45, 1.0, 0.0]], dtype=torch.float32).to(device)

    with torch.no_grad():
        output = model(dummy_input, metadata=dummy_metadata)
        prob = torch.sigmoid(output).item()

    label = "Malignant" if prob >= CLASSIFICATION_THRESHOLD else "Benign"
    confidence = prob if prob >= CLASSIFICATION_THRESHOLD else 1.0 - prob

    print(f"   Raw sigmoid output: {prob:.4f}")
    print(f"   Prediction: {label} (confidence: {confidence:.4f})")
    print()

    print("✅ Validation complete — model architecture and weights are compatible.")


if __name__ == "__main__":
    main()