import { FormulaQuestion, MCQQuestion, FillQuestion, TFQuestion } from "../interfaces/quizInterface";
import { QuestionType } from "../types/quizTypes";

 const isValidOption = (option: string): boolean => {
    return option !== "d" && option.trim().length > 0;
  };

  const isFormulaQuestion = (
    question: QuestionType
  ): question is FormulaQuestion => {
    return "formula" in question;
  };

  const isMCQQuestion = (question: QuestionType): question is MCQQuestion => {
    return "options" in question && !("formula" in question);
  };

  const isFillQuestion = (question: QuestionType): question is FillQuestion => {
    return "choices" in question;
  };

  const isTFQuestion = (question: QuestionType): question is TFQuestion => {
    return (
      !("options" in question) &&
      !("choices" in question) &&
      "answer" in question
    );
  };
  const isImageUrl = (url: string): boolean => {
    return /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,/.test(url);
  };
  
  export{
    isFillQuestion,
    isFormulaQuestion,
    isMCQQuestion,
    isTFQuestion,
    isValidOption,
    isImageUrl
  }