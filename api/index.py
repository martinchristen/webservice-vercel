from fastapi import FastAPI, Request
from pyproj import Transformer

app = FastAPI()

wgs84= "epsg:4326"
lv95= "epsg:2056"
transformer1 = Transformer.from_crs("epsg:4326", "epsg:2056")

@app.middleware("http")
async def addcors(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World",
            "version": "1.0"}

@app.get("/api/list")
def liste():
    return {"liste": ["Apfel", "Banane", "Birne", "Ananas", "Mango", "Orange"]}

@app.get("/api/add")
def addiere(a: int, b: int):
    return {"sum": a+b}

@app.get("/api/transform")
def addiere(lat: float, lng: float):
    E,N = transformer1.transform(lat, lng)
    result = str(f"({E},{N})")
    return {"E": E, "N": N, "result": result}


