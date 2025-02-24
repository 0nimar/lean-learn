from fastapi import APIRouter, HTTPException
from config.database import get_database
from models.question_model import QuestionModel
from utils.helper import validate_question
from fastapi.encoders import jsonable_encoder

router = APIRouter()
db = get_database()
question_collection = db["questions"]

@router.post("/questions")
def create_question(question: QuestionModel):
    validation_error = validate_question(question.dict())
    if validation_error:
        raise HTTPException(status_code=400, detail=validation_error)
    
    question_data = jsonable_encoder(question)
    result = question_collection.insert_one(question_data)
    created_question = question_collection.find_one({"_id": result.inserted_id})
    return created_question

@router.get("/questions")
def list_questions():
    questions = list(question_collection.find())
    return questions

@router.get("/questions/{id}")
def get_question(id: str):
    try:
        obj_id = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid question ID format.")
    
    question = question_collection.find_one({"_id": obj_id})
    if question is None:
        raise HTTPException(status_code=404, detail=f"Question with id {id} not found")
    return question
