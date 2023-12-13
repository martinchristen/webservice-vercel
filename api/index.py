from fastapi import FastAPI

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World",
            "version": "1.0"}

@app.get("/api/list")
def liste():
    return {"liste": ["Apfel", "Banane", "Birne", "Ananas", "Mango", "Orange"]}
