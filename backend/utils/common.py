import os

# Class labels for skin cancer types (ISIC/HAM10000 usually has 7 classes, but user mentioned Benign/Malignant output)
# Assuming the model output maps to these or we map them later.
# For now, let's define the standard 7 classes from HAM10000 and a mapping to Benign/Malignant.
CLASSES = [
    'akiec', # Actinic keratoses and intraepithelial carcinoma / Bowen's disease
    'bcc',   # Basal cell carcinoma
    'bkl',   # Benign keratosis-like lesions
    'df',    # Dermatofibroma
    'mel',   # Melanoma
    'nv',    # Melanocytic nevi
    'vasc'   # Vascular lesions
]

# Mapping to Benign/Malignant
# Malignant: mel, bcc, akiec
# Benign: nv, bkl, df, vasc
MALIGNANT_CLASSES = ['mel', 'bcc', 'akiec']

# ImageNet Normalization Stats
MEAN = [0.485, 0.456, 0.406]
STD = [0.229, 0.224, 0.225]

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "model", "ensemble_final.pth")
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
RESULTS_DIR = os.path.join(BASE_DIR, "results")
