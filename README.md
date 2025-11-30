# Skin-Cancer-Detection-Using-Deep-Transfer-Learning

This project consists of a React frontend and a FastAPI backend for detecting skin cancer from dermoscopic images.

## 🚀 Quick Start

You need to run **two separate terminals** to start the full application.

### Terminal 1: Backend (FastAPI)

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies (if not already installed):
    ```bash
    pip install -r requirements.txt
    ```
3.  **Ensure your `model_weights.pth` is in `backend/model/`.**
4.  Start the server:
    ```bash
    uvicorn main:app --reload
    ```
    *Server will run at `http://localhost:8000`*

### Terminal 2: Frontend (React)

1.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies (if not already installed):
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    *App will run at `http://localhost:5173`*

## 🧪 Testing

- **Backend API Docs**: Visit `http://localhost:8000/docs` to test endpoints manually.
- **Stress Test**: Run `python3 stress_test_api.py` in the `backend/` directory to verify stability.

