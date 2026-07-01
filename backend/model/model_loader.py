import torch
import torch.nn as nn
import timm
import logging

logger = logging.getLogger(__name__)


class SkinCancerModel(nn.Module):
    """
    Single-backbone skin-lesion classifier with metadata fusion.

    Architecture:
        enet  = EfficientNet-B0  (1280-d image features)
        meta  = MLP              (3 → 512 → 128-d metadata features)
        myfc  = Linear           (1280 + 128 = 1408 → 1 logit)

    Metadata input: [age_norm, sex_male, sex_female]  (3 features).
    Output: single logit (pass through sigmoid for probability).
    """

    def __init__(self, num_classes=1, meta_features=3):
        super(SkinCancerModel, self).__init__()

        # Image backbone — EfficientNet-B0
        self.enet = timm.create_model("efficientnet_b0", pretrained=False, num_classes=0)
        self.enet_dim = self.enet.num_features  # 1280

        # Metadata MLP
        self.meta = nn.Sequential(
            nn.Linear(meta_features, 512),       # meta.0
            nn.BatchNorm1d(512),                  # meta.1
            nn.ReLU(),                            # meta.2
            nn.Dropout(p=0.3),                    # meta.3
            nn.Linear(512, 128),                  # meta.4
            nn.BatchNorm1d(128),                  # meta.5
            nn.ReLU(),                            # meta.6
            nn.Dropout(p=0.3),                    # meta.7
        )
        self.meta_dim = 128

        # Final classifier (image + metadata)
        self.myfc = nn.Linear(self.enet_dim + self.meta_dim, num_classes)

    def forward(self, x, metadata=None):
        """
        Forward pass.

        Args:
            x:        Image tensor  (B, 3, 224, 224).
            metadata: Metadata tensor (B, 3) — [age_norm, sex_male, sex_female].
                      If None, zeros are used as a fallback.
        """
        # Image features
        img_feats = self.enet(x)  # (B, 1280)

        # Metadata features
        if metadata is None:
            metadata = torch.zeros(x.size(0), 3, device=x.device)
        meta_feats = self.meta(metadata)  # (B, 128)

        # Concatenate and classify
        combined = torch.cat([img_feats, meta_feats], dim=1)  # (B, 1408)
        return self.myfc(combined)


def load_model(weights_path: str, device: torch.device) -> SkinCancerModel:
    """
    Load the skin cancer model with trained weights.

    Raises ``RuntimeError`` if weights cannot be loaded — the application
    must NOT silently fall back to random weights.
    """
    model = SkinCancerModel(num_classes=1)

    if not weights_path:
        raise RuntimeError(
            "No model weights path configured. "
            "Set MODEL_PATH in common.py or the MODEL_PATH environment variable."
        )

    map_location = None if (torch.cuda.is_available() and device.type == "cuda") else torch.device("cpu")

    logger.info("Loading weights from %s", weights_path)

    # weights_only=True prevents arbitrary code execution via malicious .pth files.
    state_dict = torch.load(weights_path, map_location=map_location, weights_only=True)

    # strict=True so any shape mismatch or missing key is a hard failure.
    missing_keys, unexpected_keys = model.load_state_dict(state_dict, strict=True)

    if unexpected_keys:
        raise RuntimeError(
            f"Unexpected keys in weight file (architecture mismatch): {unexpected_keys}"
        )

    if missing_keys:
        raise RuntimeError(
            f"Missing keys in weight file (architecture mismatch): {missing_keys}"
        )

    model.to(device)
    model.eval()
    logger.info("Model loaded successfully on device=%s", device)
    return model


def verify_model_loaded(model: SkinCancerModel) -> dict:
    """Return a status dict for health-check endpoints."""
    return {
        "status": "ok" if model is not None else "error",
        "architecture": "SkinCancerModel (EfficientNet-B0 + Metadata MLP)",
        "num_parameters": sum(p.numel() for p in model.parameters()) if model else 0,
    }
