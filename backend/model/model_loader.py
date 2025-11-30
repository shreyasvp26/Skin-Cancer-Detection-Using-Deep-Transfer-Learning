import torch
import torch.nn as nn
import timm
import ssl
from efficientnet_pytorch import EfficientNet

# Fix for SSL certificate verify failed on Mac
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

class EnsembleSkinCancerModel(nn.Module):
    """
    Ensemble of 4 CNN backbones (NO metadata).
    """

    def __init__(self, num_classes=1):
        super(EnsembleSkinCancerModel, self).__init__()

        # EfficientNet-B1
        self.m1 = timm.create_model("efficientnet_b1", pretrained=False, num_classes=0)
        self.m1_dim = self.m1.num_features

        # EfficientNet-B4
        self.m2 = timm.create_model("efficientnet_b4", pretrained=False, num_classes=0)
        self.m2_dim = self.m2.num_features

        # DenseNet121
        self.m3 = timm.create_model("densenet121", pretrained=False, num_classes=0)
        self.m3_dim = self.m3.num_features

        # ResNet50
        self.m4 = timm.create_model("resnet50", pretrained=False, num_classes=0)
        self.m4_dim = self.m4.num_features

        # total image features
        self.image_dim = self.m1_dim + self.m2_dim + self.m3_dim + self.m4_dim

        # Normalization layer to handle large feature magnitudes
        self.norm = nn.LayerNorm(self.image_dim)

        # final classifier (NO metadata)
        self.fc = nn.Linear(self.image_dim, num_classes)

    def forward(self, x, metadata=None):
        # helper for feature extraction
        def feat(m, inp):
            if hasattr(m, "forward_features"):
                f = m.forward_features(inp)
            else:
                f = m(inp)
            if f.dim() == 4:
                f = nn.functional.adaptive_avg_pool2d(f, 1).reshape(f.size(0), -1)
            return f

        f1 = feat(self.m1, x)
        f2 = feat(self.m2, x)
        f3 = feat(self.m3, x)
        f4 = feat(self.m4, x)

        feats = torch.cat([f1, f2, f3, f4], dim=1)
        
        # Normalize features
        feats = self.norm(feats)
        
        return self.fc(feats)

def load_model(weights_path, device):
    model = EnsembleSkinCancerModel(num_classes=1)

    if weights_path and torch.cuda.is_available() and device.type == 'cuda':
        map_location = None
    else:
        map_location = torch.device('cpu')

    try:
        if weights_path:
            print(f"Loading weights from {weights_path}")

            # Load the state_dict EXACTLY as saved
            state_dict = torch.load(weights_path, map_location=map_location)

            # Load weights (no renaming!)
            missing_keys, unexpected_keys = model.load_state_dict(state_dict, strict=False)

            print("Weights loaded successfully.")
            if missing_keys:
                print(f"Missing keys: {missing_keys}")
            if unexpected_keys:
                print(f"Unexpected keys: {unexpected_keys}")

        else:
            print("No weights provided. Using random weights.")

    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Error loading weights: {e}")
        print("Using initialized model without custom weights.")

    model.to(device)
    model.eval()
    return model
