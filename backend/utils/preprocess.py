from PIL import Image
import torchvision.transforms as transforms
from .common import MEAN, STD

def get_transforms():
    """
    Returns the composition of transforms for image preprocessing.
    """
    return transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=MEAN, std=STD)
    ])

def preprocess_image(image_file):
    """
    Loads an image file, converts it to RGB, and applies transforms.
    Returns a tensor ready for model inference.
    """
    image = Image.open(image_file).convert('RGB')
    transform = get_transforms()
    image_tensor = transform(image)
    # Add batch dimension (1, C, H, W)
    image_tensor = image_tensor.unsqueeze(0)
    return image_tensor, image