# Use a slim Python 3.10 image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8000
ENV ENABLE_DOCS=false

# Create app directory
WORKDIR /app

# Install system dependencies if required for OpenCV or ML libraries
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code and model weights
COPY . .

# Ensure uploads directory exists and has correct permissions
RUN mkdir -p uploads && chmod 777 uploads

# Expose port
EXPOSE 8000

# Run uvicorn server with multiple workers for concurrency
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
