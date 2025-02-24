from fastapi import APIRouter, HTTPException
from config.database import get_database
from models.quantity_model import QuantityModel
from fastapi.encoders import jsonable_encoder

router = APIRouter()
db = get_database()
quantity_collection = db["quantities"]

@router.post("/quantities")
def create_quantity(quantity: QuantityModel):
    quantity_data = jsonable_encoder(quantity)
    result = quantity_collection.insert_one(quantity_data)
    created_quantity = quantity_collection.find_one({"_id": result.inserted_id})
    return created_quantity

@router.get("/quantities")
def list_quantities():
    quantities = list(quantity_collection.find())
    return quantities

@router.get("/quantities/{id}")
def get_quantity(id: str):
    try:
        obj_id = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid quantity ID format.")
    
    quantity = quantity_collection.find_one({"_id": obj_id})
    if quantity is None:
        raise HTTPException(status_code=404, detail=f"Quantity with id {id} not found")
    return quantity