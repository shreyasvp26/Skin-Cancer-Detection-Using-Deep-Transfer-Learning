# import torch
# import torch.nn.functional as F
# import cv2
# import numpy as np
# import base64

# class GradCAM:
#     def __init__(self, model, target_layer):
#         self.model = model
#         self.target_layer = target_layer
#         self.gradients = None
#         self.activations = None
        
#         # Register hooks
#         self.target_layer.register_forward_hook(self.save_activation)
#         self.target_layer.register_backward_hook(self.save_gradient)

#     def save_activation(self, module, input, output):
#         self.activations = output

#     def save_gradient(self, module, grad_input, grad_output):
#         self.gradients = grad_output[0]

#     def __call__(self, x, class_idx=None, metadata=None):
#         # Forward pass
#         self.model.zero_grad()
#         output = self.model(x, metadata)
        
#         if class_idx is None:
#             class_idx = torch.argmax(output, dim=1)
            
#         # Backward pass
#         score = output[0, class_idx]
#         score.backward()
        
#         # Generate Heatmap
#         gradients = self.gradients
#         activations = self.activations
        
#         # Global Average Pooling of gradients
#         weights = torch.mean(gradients, dim=[2, 3], keepdim=True)
        
#         # Weighted sum of activations
#         cam = torch.sum(weights * activations, dim=1, keepdim=True)
        
#         # ReLU
#         cam = F.relu(cam)
        
#         # Normalize
#         cam = cam - cam.min()
#         cam = cam / (cam.max() + 1e-7)
        
#         return cam.data.cpu().numpy()[0, 0]

# def generate_gradcam_image(model, image_tensor, original_image_pil, metadata=None):
#     """
#     Generates Grad-CAM heatmap and overlays it on the original image.
#     Returns base64 encoded string of the result.
#     """
#     # We need to choose a target layer. 
#     # For the ensemble, let's pick the last conv layer of ResNet-50 as it's a good representative.
#     # Accessing: model.resnet.layer4[-1] (last bottleneck block)
    
#     try:
#         target_layer = model.resnet.layer4[-1]
#         grad_cam = GradCAM(model, target_layer)
        
#         mask = grad_cam(image_tensor, metadata=metadata)
        
#         # Resize mask to original image size
#         mask = cv2.resize(mask, (original_image_pil.width, original_image_pil.height))
        
#         # Create heatmap
#         heatmap = cv2.applyColorMap(np.uint8(255 * mask), cv2.COLORMAP_JET)
#         heatmap = np.float32(heatmap) / 255
        
#         # Convert original image to numpy
#         img = np.array(original_image_pil)
#         img = np.float32(img) / 255
        
#         # Overlay
#         cam = heatmap + img
#         cam = cam / np.max(cam)
#         cam = np.uint8(255 * cam)
        
#         # Convert to base64
#         _, buffer = cv2.imencode('.png', cam)
#         img_str = base64.b64encode(buffer).decode('utf-8')
        
#         return img_str
        
#     except Exception as e:
#         print(f"Grad-CAM generation failed: {e}")
#         return None
