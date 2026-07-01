import torch
import logging

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Metadata Processing
# ---------------------------------------------------------------------------
# The SkinCancerModel uses age + sex as input features (3-d vector).
# Lesion location and skin tone are accepted for logging / future use
# but are NOT consumed by the current model.
# ---------------------------------------------------------------------------


def process_metadata(age, sex, lesion_location, skin_tone):
    """
    Process patient metadata into a tensor for model input.

    The model's metadata branch expects a 3-feature vector:
        [age_normalized, sex_male, sex_female]

    Args:
        age (int | None): Patient age.
        sex (str | None): 'male', 'female', or 'unknown'.
        lesion_location (str | None): Anatomical site (logged, not used by model).
        skin_tone (str | int | None): Fitzpatrick skin type (logged, not used by model).

    Returns:
        torch.Tensor: Shape (1, 3) float32 tensor — [age_norm, sex_male, sex_female].
    """
    # Default age if missing
    if age is None:
        age = 45.0

    # Normalize age (max ~100)
    age_norm = float(age) / 100.0

    # One-hot encode sex
    sex = sex.lower() if sex else "unknown"
    sex_male = 1.0 if sex == "male" else 0.0
    sex_female = 1.0 if sex == "female" else 0.0

    features = [age_norm, sex_male, sex_female]

    logger.debug(
        "Metadata — age=%.2f, sex=%s, location=%s, skin_tone=%s → features=%s",
        age_norm, sex, lesion_location, skin_tone, features,
    )

    # Return as (1, 3) tensor to match model's expected batch dimension
    return torch.tensor([features], dtype=torch.float32)
