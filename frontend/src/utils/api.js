import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
    baseURL: 'http://localhost:8000', // FastAPI Backend
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export const analyzeImage = async (imageFile, metadata) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    // Append metadata
    // Append metadata with key mapping
    formData.append('age', metadata.age);
    formData.append('sex', metadata.sex);
    formData.append('lesion_location', metadata.location); // Map to backend expected key
    formData.append('skin_tone', metadata.skinTone);       // Map to backend expected key

    try {
        const response = await api.post('/predict', formData);

        // Map backend response to frontend expectation
        return {
            label: response.data.prediction,
            confidence: response.data.confidence,
            heatmap: response.data.gradcam_image
        };

    } catch (error) {
        console.error("Error analyzing image:", error);
        throw error;
    }
};

export default api;
