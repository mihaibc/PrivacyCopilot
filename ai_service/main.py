# Entry point for AI service (FastAPI)

from fastapi import FastAPI

app = FastAPI(
    title="Privacy Copilot AI Service",
    description="AI service for Privacy Copilot application",
    version="1.0.0"
)

@app.get("/")
async def root():
    return {"message": "Privacy Copilot AI Service is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
