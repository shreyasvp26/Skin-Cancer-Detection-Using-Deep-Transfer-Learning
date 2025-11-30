import numpy as np
import pandas as pd

# Define expected metadata columns and their processing logic
# This is a simplified version. In a real scenario, we'd load a fitted scaler/encoder.
# For this project, we'll implement manual encoding based on common dataset values.

def process_metadata(age, sex, lesion_location, skin_tone):
    """
    Process metadata into a numerical feature vector.
    
    Args:
        age (int): Age of the patient.
        sex (str): Sex of the patient ('male', 'female', 'unknown').
        lesion_location (str): Location of the lesion.
        skin_tone (str): Skin tone (optional, depending on model training).
        
    Returns:
        np.array: A 1D numpy array of processed features.
    """
    
    # 1. Handle Missing Values / Defaults
    if age is None:
        age = 45.0 # Median age approximation
    
    # 2. Normalize Age (assuming max age approx 100)
    age_norm = float(age) / 100.0
    
    # 3. One-Hot Encoding for Sex
    # Categories: male, female, unknown
    sex = sex.lower() if sex else 'unknown'
    sex_male = 1.0 if sex == 'male' else 0.0
    sex_female = 1.0 if sex == 'female' else 0.0
    
    # 4. Location (Ignored for now to match model input size of 3)
    # The model expects 3 features. Likely Age, Sex_Male, Sex_Female.
    
    features = [age_norm, sex_male, sex_female]
    
    return np.array(features, dtype=np.float32)
