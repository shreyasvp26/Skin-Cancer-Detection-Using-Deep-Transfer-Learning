from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import shutil
import os
import uuid
from model.infer import predict_skin_cancer
from utils.common import UPLOAD_DIR

app = FastAPI(title="Skin Cancer Detection API", description="API for detecting benign vs malignant skin lesions.", version="1.0")

# CORS Configuration
origins = [
    "http://localhost:5173", # Vite default
    "http://localhost:3000", # React default
    "*" # Allow all for development convenience
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
async def root():
    return {"message": "Skin Cancer Detection API is running"}

@app.post("/predict")
async def predict(
    image: UploadFile = File(...),
    age: int = Form(...),
    sex: str = Form(...),
    lesion_location: str = Form(...),
    skin_tone: str = Form(...)
):
    print(f"📸 [Backend] Received request: Age={age}, Sex={sex}, Location={lesion_location}, Tone={skin_tone}")
    try:
        # Save uploaded file
        file_extension = image.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
            
        # Run Inference
        result = predict_skin_cancer(
            image_file=file_path,
            age=age,
            sex=sex,
            lesion_location=lesion_location,
            skin_tone=skin_tone
        )
        
        # Clean up uploaded file (optional, keeping for now for debugging or future training)
        # os.remove(file_path)
        
        print(f"✅ [Backend] Returning result to frontend: {result['prediction']} ({result['confidence']})")
        return JSONResponse(content=result)

    except Exception as e:
        print(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
