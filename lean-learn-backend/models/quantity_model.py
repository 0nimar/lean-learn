from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class QuantityModel(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    name: str  # e.g., "Force"
    symbol: str  # e.g., "f"

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}
