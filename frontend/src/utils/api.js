import axios from 'axios';

// API base URL — configurable via environment variable for deployment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Create axios instance — do NOT set a global Content-Type header;
// let axios auto-set the multipart boundary for FormData requests.
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 30 second timeout
});

export const analyzeImage = async (imageFile, metadata) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    // Append metadata fields
    formData.append('age', metadata.age || '45');
    formData.append('sex', metadata.sex || 'unknown');
    formData.append('lesion_location', metadata.location || 'Other');
    formData.append('skin_tone', metadata.skinTone ? String(metadata.skinTone) : '');

    try {
        const response = await api.post('/predict', formData);

        return {
            label: response.data.prediction,
            confidence: response.data.confidence,
            heatmap: response.data.gradcam_image,
            disclaimer: response.data.disclaimer,
        };

    } catch (error) {
        console.error("Error analyzing image:", error);

        // Provide specific error messages based on response
        if (error.response) {
            const status = error.response.status;
            const detail = error.response.data?.detail;

            if (status === 413) {
                throw new Error('Image file is too large. Maximum size is 10MB.');
            } else if (status === 400) {
                throw new Error(detail || 'Invalid input. Please check your image and metadata.');
            } else if (status === 500) {
                throw new Error('The analysis service encountered an error. Please try again later.');
            } else {
                throw new Error(detail || 'An unexpected error occurred.');
            }
        } else if (error.code === 'ECONNABORTED') {
            throw new Error('Analysis timed out. Please try again with a smaller image.');
        } else {
            throw new Error('Unable to connect to the analysis service. Please check your connection.');
        }
    }
};

export default api;
