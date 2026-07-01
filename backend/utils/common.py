import os

# ---------------------------------------------------------------------------
# Class labels (HAM10000 / ISIC)
# ---------------------------------------------------------------------------
# The ensemble model outputs a single sigmoid value (binary: benign vs malignant).
# These class lists are kept for reference and potential future multi-class work.
CLASSES = [
    'akiec',  # Actinic keratoses / Bowen's disease
    'bcc',    # Basal cell carcinoma
    'bkl',    # Benign keratosis-like lesions
    'df',     # Dermatofibroma
    'mel',    # Melanoma
    'nv',     # Melanocytic nevi
    'vasc'    # Vascular lesions
]

# Malignant class subset (for reference only — model uses binary output)
MALIGNANT_CLASSES = ['mel', 'bcc', 'akiec']

# ---------------------------------------------------------------------------
# ImageNet Normalization Stats
# ---------------------------------------------------------------------------
MEAN = [0.485, 0.456, 0.406]
STD = [0.229, 0.224, 0.225]

# ---------------------------------------------------------------------------
# Classification Threshold
# ---------------------------------------------------------------------------
# The sigmoid output is compared against this value.
# Values >= threshold → Malignant; values < threshold → Benign.
#
# NOTE: This MUST be calibrated against a held-out validation set before any
# clinical or public deployment.  The default of 0.5 is the standard binary
# classification midpoint; adjust based on desired sensitivity/specificity.
CLASSIFICATION_THRESHOLD = float(os.environ.get("CLASSIFICATION_THRESHOLD", "0.5"))

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "model", "best_merged_model.pth")
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

# ---------------------------------------------------------------------------
# Upload constraints
# ---------------------------------------------------------------------------
MAX_UPLOAD_SIZE_BYTES = int(os.environ.get("MAX_UPLOAD_SIZE_MB", "10")) * 1024 * 1024
ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png"}