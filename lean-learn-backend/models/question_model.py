from pydantic import BaseModel, Field
from typing import List, Optional, Union
from bson import ObjectId

class QuestionModel(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    question_text: str
    type: str  # "fill_in_the_blanks", "mcq", "true_false", "formula"
    options: Optional[List[str]] = None
    answer: Union[str, bool, None] = None
    formula: Optional[str] = None
    class_name: str  # Class like "9", "10", "12", "BTech"
    topic: str  # Topic under which question falls

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}

