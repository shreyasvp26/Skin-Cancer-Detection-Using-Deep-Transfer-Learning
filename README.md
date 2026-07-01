# OncoScan — Skin Lesion Screening Tool

> **⚠️ Medical Disclaimer:** OncoScan is a research and educational AI tool. It is **NOT** a medical device, has **NOT** been validated for clinical use, and is **NOT** FDA-cleared. Always consult a qualified dermatologist for professional evaluation.

This project consists of a React frontend and a FastAPI backend that uses a deep learning model to screen dermoscopic images for benign vs. malignant skin lesions.

## Model Architecture

The system uses a single-backbone model with metadata fusion:
- **EfficientNet-B0** — image feature extraction (1280-d)
- **Metadata MLP** — processes patient age and sex (3 → 512 → 128-d)
- **Fusion classifier** — concatenated features (1408-d → 1 sigmoid output)

The model genuinely uses patient metadata (age and sex) alongside the dermoscopic image to inform its prediction. Lesion location and skin tone are collected for reference only.

**Weight file:** `backend/model/best_merged_model.pth`

**Classification threshold:** Configurable via `CLASSIFICATION_THRESHOLD` env var (default: `0.5`). Must be calibrated against a validation dataset before any deployment.

## 🚀 Quick Start

You need to run **two separate terminals** to start the full application.

### Terminal 1: Backend (FastAPI)

1. Navigate to the backend folder:
    ```bash
    cd backend
    ```
2. (Optional) Copy and customize environment config:
    ```bash
    cp .env.example .env
    ```
3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. **Ensure `best_merged_model.pth` is in `backend/model/`.** The server will refuse to start if weights are missing or incompatible.
5. Start the server:
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000
    ```
    *Server will run at `http://localhost:8000`*

### Terminal 2: Frontend (React)

1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2. (Optional) Copy and customize environment config:
    ```bash
    cp .env.example .env
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
    *App will run at `http://localhost:5173`*

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:3000` | CORS allowed origins |
| `ENABLE_DOCS` | `false` | Enable Swagger UI at `/docs` |
| `CLASSIFICATION_THRESHOLD` | `0.5` | Sigmoid threshold for malignant classification |
| `MAX_UPLOAD_SIZE_MB` | `10` | Maximum upload file size |
| `PORT` | `8000` | Server port |
| `ENV` | `production` | Set to `development` for auto-reload |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8000` | Backend API base URL |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Root — API status |
| `GET` | `/health` | Health check — model status |
| `POST` | `/predict` | Analyze dermoscopic image |

## Validation

Run the model validation script to verify weights load correctly:

```bash
cd backend
python -m model.test_model
```

## Known Limitations

- Anatomical site and skin tone are collected but **not used** by the current model; only age and sex inform predictions.
- Grad-CAM heatmap visualization is disabled in the current release.
- The classification threshold has not been formally calibrated against a clinical validation dataset.
- Performance across different skin tones (Fitzpatrick types) has not been independently validated.

## Team

- Shreyas Patil
- Om Deshmukh
- Ruturaj Challawar
- Vinayak Pandalwad
- Suparna Joshi (Guide)
