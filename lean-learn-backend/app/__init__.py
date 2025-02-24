from fastapi import FastAPI
from app.questions import router as question_router
from app.quantities import router as quantity_router

app = FastAPI()
app.include_router(question_router, prefix="/questions")
app.include_router(quantity_router, prefix="/quantities")
