import torch
import torch.nn.functional as F
from .model_loader import load_model
# from .gradcam import generate_gradcam_image
from utils.preprocess import preprocess_image
from utils.metadata_processing import process_metadata
from utils.common import MODEL_PATH, MALIGNANT_CLASSES, CLASSES

# Global model instance
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = None

def get_model():
    global model
    if model is None:
        model = load_model(MODEL_PATH, device)
    return model

def predict_skin_cancer(image_file, age, sex, lesion_location, skin_tone):
    """
    Main inference function.
    """
    model = get_model()
    
    # 1. Preprocess Image
    print(f"⚙️ [Inference] Preprocessing image: {image_file}")
    image_tensor, original_image_pil = preprocess_image(image_file)
    image_tensor = image_tensor.to(device)
    
    # 2. Process Metadata
    meta_vec = process_metadata(age, sex, lesion_location, skin_tone)
    meta_tensor = torch.from_numpy(meta_vec).unsqueeze(0).to(device)
    
    # 3. Inference
    with torch.no_grad(): # Disable grad since we don't need it for Grad-CAM anymore
        output = model(image_tensor, meta_tensor)
        
        # Binary Classification (1 output neuron)
        probability = torch.sigmoid(output).item()
        
        # Threshold 0.5
        if probability >= 0.5:
            prediction = "Malignant"
            confidence = probability
        else:
            prediction = "Benign"
            confidence = 1.0 - probability

    print(f"🧠 [Inference] Model Prediction: {prediction} (Conf: {confidence:.4f})")

    # 4. Grad-CAM (Disabled)
    # print("🎨 [Inference] Generating Grad-CAM heatmap...")
    # gradcam_image = generate_gradcam_image(model, image_tensor, original_image_pil, metadata=meta_tensor)
    gradcam_image = None
    
    return {
        "prediction": prediction,
        "confidence": round(confidence, 4),
        "gradcam_image": gradcam_image
    }