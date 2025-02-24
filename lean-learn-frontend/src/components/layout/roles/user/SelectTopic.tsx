import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import logo from "../../assets/images/Logo.png";
import einstein from "../../assets/Einstein.gif";
import newton from "../../assets/Newton.gif";
import galileo from "../../assets/Galileo.gif";
import raman from "../../assets/CV Raman.gif";
import {
  MCQQuestion,
  FillQuestion,
  TFQuestion,
  FormulaQuestion,
} from "../../../../lib/interfaces/quizInterface";

import {
  mcqQuestionApi,
  fillQuestionApi,
  tfQuestionApi,
  formulaQuestionApi,
  aiApi,
} from "../../../../lib/api/questions";
import { quantitiesApi } from "@/lib/api/utils";
import { CommonQty } from "@/types/utilsInteface";
import { correctAudio, incorrectAudio, summaryAudio } from "../../../../lib/function/sound";
import FormulaInterface from "./FormulaInterface";
import OptionButton from "./OptionButton";
import { isFormulaQuestion, isMCQQuestion, isValidOption, isFillQuestion, isTFQuestion, isImageUrl } from "../../../../lib/function/bool";
import { handleSkip, handleAnswerSubmit, handleNext } from "../../../../lib/function/role/user/question";
import { QuestionType } from "../../../../lib/types/quizTypes";
import QuestionOption from "./QuestionOption";
import Sidebar from "./Sidebar";

const companionImages = { 1: einstein, 2: newton, 3: galileo, 4: raman };
const operators = ["+", "-", "X", "/", "=", "^"];

const SelectedTopicPage: React.FC = () => {
  const [formulaSequence, setFormulaSequence] = useState<
    Array<{
      type: "word" | "operator";
      value: string;
    }>
  >([]);

const [disable,setDisable]=useState(false);
  const { topicId } = useParams<{ topicId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCompanion, selectedClass, selectedTopic } =
    location.state || {};

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingCompanionMessage, setLoadingCompanionMessage] = useState(false);
  const [companionMessage, setCompanionMessage] = useState<string>("");
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const [attemptedQuestionsCount, setAttemptedQuestionsCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const storedIndex = localStorage.getItem("currentQuestionIndex");
    return storedIndex ? parseInt(storedIndex, 10) : 0;
  });
  const [commonq,setCommonq]=useState<CommonQty[]>([]);


  const borderColor = isCorrect ? "border-green-500" : "border-red-500";

 
  const [finalquestion,setFinalquestion]=useState("");
  const [disabledSymbols, setDisabledSymbols] = useState(new Set());
  
 



  const formatExplanation = (
    explanation: string,
    isCorrect: boolean,
    correctAnswer: string | {
      name: string;
      symbol: string;
  }[]
  ): string => {
    let cleanText = explanation.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    cleanText = cleanText.replace(/\d+\.\s*/g, "");
    cleanText = cleanText
      .replace("Correct Answer:", "")
      .replace("Evaluation:", "")
      .replace("Explanation:", "")
      .replace("Analysis:", "")
      .replace("Summary:", "");

    const points = cleanText
      .split(".")
      .map((point) => point.trim())
      .filter((point) => point.length > 0);

    if (isCorrect) {
      return `✓ ${points.join(".\n\n")}`;
    } else {
      return `✗ The correct answer is ${correctAnswer}.\n\n${points.join(
        ".\n\n"
      )}`;
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="text-white text-center">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-[#21B6F8] rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Back to Topics
          </button>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="text-white text-center">
          <p className="mb-4">No questions available for this topic</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-[#21B6F8] rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black">
    <Sidebar></Sidebar>

      <div className="flex-1 overflow-y-auto">
        <div className="h-auto lg:h-screen flex items-start lg:items-center p-3 lg:p-8">
          <div className="max-w-4xl mx-auto w-full">
            <div className="mb-8">
              <div className="text-white text-xl">
                {finalquestion}
              </div>
            </div>

            <div className="mb-8">{<QuestionOption/>}</div>

            <div className="flex justify-between items-center">
              <div>
                {showFeedback && (
                  <div className="flex items-center gap-2">
                    <span
                      className={isCorrect ? "text-green-500" : "text-red-500"}
                    >
                      {isCorrect ? (
                        <FaCheckCircle size={36} />
                      ) : (
                        <FaTimesCircle size={36} />
                      )}
                    </span>
                    <span
                      className={isCorrect ? "text-green-500" : "text-red-500"}
                    >
                      {isCorrect ? (
                        "Correct!"
                      ) : (
                        <>
                          Incorrect. The correct answer was:{" "}
                          {isFormulaQuestion(currentQuestion) ? (
                            currentQuestion.formula.map((f)=>(currentQuestion.formula.indexOf(f)%2==0)?f.name:f.symbol).join(" ")
                          ) : isTFQuestion(currentQuestion) ? (
                            isImageUrl(currentQuestion.answer) ? (
                              <div className="flex gap-2">
                                {" "}
                                {/* Flex container for images */}
                                <img
                                  src={currentQuestion.answer}
                                  alt="Correct Answer"
                                  className="w-20 h-20 rounded-lg"
                                />
                              </div>
                            ) : (
                              currentQuestion.answer
                            )
                          ) : (
                            <div className="flex gap-2">
                              {" "}
                              {/* Flex container for multiple answers */}
                              {currentQuestion.answers.map((answer, index) => (
                                <span key={index}>
                                  {isImageUrl(answer) ? (
                                    <img
                                      src={answer}
                                      alt="Correct Answer"
                                      className="w-12 h-12 md:h-20 md:w-20 rounded-lg"
                                    />
                                  ) : (
                                    answer
                                  )}
                                  {index < currentQuestion.answers.length - 1 &&
                                  !isImageUrl(answer)
                                    ? ", "
                                    : ""}
                                </span>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {!showFeedback && (
                  <button
                    onClick={handleSkip}
                    className="px-6 py-2 rounded-lg bg-[#101113] text-white hover:bg-[#1A1A1A] transition-colors"
                  >
                    Skip
                  </button>
                )}
                {!showFeedback ? (
                  <button
                    onClick={handleAnswerSubmit}
                    disabled={
                      isFormulaQuestion(currentQuestion)
                        ? formulaSequence.length === 0
                        : selectedAnswers.length === 0
                    }
                    className="px-6 py-2 rounded-lg bg-[#00A3FF] text-white hover:bg-[#0086CC] transition-colors disabled:opacity-50"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    disabled={loadingCompanionMessage}
                    onClick={handleNext}
                    className="px-6 py-2 rounded-lg bg-[#00A3FF] text-white hover:bg-[#0086CC] transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedTopicPage;