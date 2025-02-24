import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MCQQuestion,
  FillQuestion,
  TFQuestion,
  FormulaQuestion,
} from "../../types/quizInterface";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="bg-[#1A1A1A] rounded-lg w-full max-w-2xl mx-4">
        {children}
      </div>
    </div>
  );
};

interface QuestionCardProps {
  question: MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  onDelete: (
    id: string,
    type: "mcq" | "fill" | "tf" | "formula"
  ) => Promise<void>;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  isSelected,
  onSelect,
  onPreview,
  onDelete,
}) => {
  const isMCQ = "options" in question && !("quantities" in question);
  const isFillBlank = "choices" in question;
  const isTrueFalse = !("options" in question) && !("choices" in question);
  const isFormula = "quantities" in question;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setIsDeleting(true);
      setTimeout(()=>{setIsDeleting(false)},5000)
    }
  };

  return (
    <div
      className={`bg-[#111111] rounded-lg p-4 ${
        isSelected
          ? "border border-[#21B6F8] bg-opacity-90"
          : "hover:bg-opacity-80"
      } transition-colors`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <p className="text-white text-sm mb-2">
            {index + 1}. {question.question}
          </p>
          <p className="text-[#8C8C8C] text-xs">
            {question.topic || "gravitation"}
          </p>
          <div className="mt-2 text-xs text-[#8C8C8C]">
            {isMCQ && "Multiple Choice"}
            {isFillBlank && "Fill in the Blanks"}
            {isTrueFalse && "True/False"}
            {isFormula && "Formula Based"}
          </div>
          {isFormula && (
            <div className="mt-2 text-xs text-[#21B6F8]">
              Formula: {question.formula.map((f)=>f.symbol)}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onPreview}
              className="text-[#8C8C8C] hover:text-[#21B6F8] text-sm transition-colors"
            >
              Preview
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-400 text-sm transition-colors ml-4"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
          <button
            onClick={onSelect}
            className={`w-6 h-6 rounded flex items-center justify-center ${
              isSelected
                ? "bg-[#21B6F8] text-white"
                : "border border-[#8C8C8C] hover:border-[#21B6F8]"
            }`}
          >
            {isSelected && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ClassQuestions: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { classId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<
    (MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion)[]
  >([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState<
    MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion | null
  >(null);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleDelete = async (
    id: string,
    type: "mcq" | "fill" | "tf" | "formula"
  ) => {
    try {

      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));

      if (selectedQuestions.has(id)) {
        const newSelected = new Set(selectedQuestions);
        newSelected.delete(id);
        setSelectedQuestions(newSelected);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error;
    }
  };

  console.log(previewQuestion?.resource);
 


  const toggleQuestion = (questionId: string) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestions(newSelected);
  };

  const handlePreview = (
    question: MCQQuestion | FillQuestion | TFQuestion | FormulaQuestion
  ) => {
    setPreviewQuestion(question);
    setIsPreviewOpen(true);
    setFeedback(null);
  };

  const filteredQuestions =
    selectedTopic === "all"
      ? questions
      : questions.filter((q) => q.topic === selectedTopic);

  return (
    <>
      {" "}
     
      <div className="flex min-h-screen bg-black">
      

        <div className="flex-1 page-content">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
              <button
                onClick={() => navigate("/teacher/question-bank")}
                className="p-2 hover:bg-[#1A1A1A] rounded-lg hidden md:block transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <h1 className="text-2xl text-white font-normal">
                Class {classId} Questions
              </h1>
            </div>

            <div className="flex justify-between items-center mb-6">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-[#21B6F8] w-48"
              >
                <option value="all">All Topics</option>
              </select>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    localStorage.removeItem("choices");

                    navigate(
                      `/teacher/question-bank/class/${classId}/add-question`
                    );
                  }}
                  className=" px-4 py-2 "
                >
                  <svg
                    width="146"
                    height="53"
                    viewBox="0 0 146 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="path-1-outside-1_223_2619"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="146"
                      height="53"
                      fill="black"
                    >
                      <rect fill="white" width="146" height="53" />
                      <path d="M1 9C1 4.58172 4.58172 1 9 1H137C141.418 1 145 4.58172 145 9V41C145 45.4183 141.418 49 137 49H9C4.58173 49 1 45.4183 1 41V9Z" />
                    </mask>
                    <path
                      d="M1 9C1 4.58172 4.58172 1 9 1H137C141.418 1 145 4.58172 145 9V41C145 45.4183 141.418 49 137 49H9C4.58173 49 1 45.4183 1 41V9Z"
                      fill="#009BD5"
                    />
                    <path
                      d="M0 9C0 4.02944 4.02944 0 9 0H137C141.971 0 146 4.02944 146 9H144C144 5.13401 140.866 2 137 2H9C5.13401 2 2 5.13401 2 9H0ZM146 44C146 48.9706 141.971 53 137 53H9C4.02944 53 0 48.9706 0 44L2 41C2 43.2091 5.13401 45 9 45H137C140.866 45 144 43.2091 144 41L146 44ZM9 53C4.02944 53 0 48.9706 0 44V9C0 4.02944 4.02944 0 9 0V2C5.13401 2 2 5.13401 2 9V41C2 43.2091 5.13401 45 9 45V53ZM137 0C141.971 0 146 4.02944 146 9V44C146 48.9706 141.971 53 137 53V45C140.866 45 144 43.2091 144 41V9C144 5.13401 140.866 2 137 2V0Z"
                      fill="#00658D"
                      mask="url(#path-1-outside-1_223_2619)"
                    />
                    <path
                      d="M28.9965 16C29.387 16 29.7098 16.2901 29.7609 16.6666L29.768 16.7713L29.7692 24.2289H37.2287C37.6547 24.2289 38 24.5743 38 25.0004C38 25.3909 37.7098 25.7137 37.3333 25.7648L37.2287 25.7718H29.7692L29.7713 33.2284C29.7714 33.6544 29.4262 34 29.0002 34C28.6097 34 28.2869 33.7099 28.2357 33.3334L28.2287 33.2287L28.2266 25.7718H20.7713C20.3453 25.7718 20 25.4264 20 25.0004C20 24.6098 20.2902 24.287 20.6667 24.236L20.7713 24.2289H28.2266L28.2253 16.7716C28.2252 16.3456 28.5705 16 28.9965 16Z"
                      fill="#001E2D"
                    />
                    <path
                      d="M57.304 31L62.28 19.72H63.4L68.376 31H67.016L65.624 27.784L66.264 28.12H59.384L60.04 27.784L58.664 31H57.304ZM62.824 21.256L60.248 27.32L59.864 27.016H65.784L65.432 27.32L62.856 21.256H62.824ZM73.2541 31.144C72.5608 31.144 71.9528 30.9787 71.4301 30.648C70.9181 30.3173 70.5181 29.8533 70.2301 29.256C69.9528 28.648 69.8141 27.9333 69.8141 27.112C69.8141 26.28 69.9528 25.5653 70.2301 24.968C70.5181 24.36 70.9181 23.896 71.4301 23.576C71.9528 23.2453 72.5608 23.08 73.2541 23.08C73.9581 23.08 74.5608 23.256 75.0621 23.608C75.5635 23.96 75.8995 24.4347 76.0701 25.032H75.8941V19.72H77.1901V31H75.9261V29.144H76.0861C75.9155 29.752 75.5741 30.2373 75.0621 30.6C74.5608 30.9627 73.9581 31.144 73.2541 31.144ZM73.5261 30.104C74.2621 30.104 74.8435 29.848 75.2701 29.336C75.7075 28.8133 75.9261 28.072 75.9261 27.112C75.9261 26.1413 75.7075 25.4 75.2701 24.888C74.8435 24.376 74.2621 24.12 73.5261 24.12C72.8008 24.12 72.2195 24.376 71.7821 24.888C71.3448 25.4 71.1261 26.1413 71.1261 27.112C71.1261 28.072 71.3448 28.8133 71.7821 29.336C72.2195 29.848 72.8008 30.104 73.5261 30.104ZM83.0823 31.144C82.3889 31.144 81.7809 30.9787 81.2582 30.648C80.7463 30.3173 80.3463 29.8533 80.0583 29.256C79.7809 28.648 79.6423 27.9333 79.6423 27.112C79.6423 26.28 79.7809 25.5653 80.0583 24.968C80.3463 24.36 80.7463 23.896 81.2582 23.576C81.7809 23.2453 82.3889 23.08 83.0823 23.08C83.7863 23.08 84.3889 23.256 84.8903 23.608C85.3916 23.96 85.7276 24.4347 85.8983 25.032H85.7223V19.72H87.0183V31H85.7543V29.144H85.9143C85.7436 29.752 85.4023 30.2373 84.8903 30.6C84.3889 30.9627 83.7863 31.144 83.0823 31.144ZM83.3543 30.104C84.0903 30.104 84.6716 29.848 85.0983 29.336C85.5356 28.8133 85.7543 28.072 85.7543 27.112C85.7543 26.1413 85.5356 25.4 85.0983 24.888C84.6716 24.376 84.0903 24.12 83.3543 24.12C82.6289 24.12 82.0476 24.376 81.6103 24.888C81.1729 25.4 80.9543 26.1413 80.9543 27.112C80.9543 28.072 81.1729 28.8133 81.6103 29.336C82.0476 29.848 82.6289 30.104 83.3543 30.104ZM94.7358 31V19.72H95.7598L102.944 29.304H102.56V19.72H103.776V31H102.784L95.5998 21.416H95.9678V31H94.7358ZM110.408 31.144C109.586 31.144 108.877 30.984 108.28 30.664C107.693 30.3333 107.234 29.8693 106.904 29.272C106.584 28.6747 106.424 27.96 106.424 27.128C106.424 26.3173 106.584 25.6133 106.904 25.016C107.224 24.408 107.661 23.9333 108.216 23.592C108.781 23.2507 109.432 23.08 110.168 23.08C110.872 23.08 111.474 23.2347 111.976 23.544C112.477 23.8533 112.861 24.2907 113.128 24.856C113.405 25.4213 113.544 26.0987 113.544 26.888V27.384H107.416V26.536H112.68L112.424 26.744C112.424 25.8907 112.232 25.2293 111.848 24.76C111.474 24.28 110.925 24.04 110.2 24.04C109.656 24.04 109.192 24.168 108.808 24.424C108.434 24.6693 108.152 25.016 107.96 25.464C107.768 25.9013 107.672 26.4133 107.672 27V27.096C107.672 27.7467 107.773 28.296 107.976 28.744C108.189 29.192 108.504 29.5333 108.92 29.768C109.336 29.992 109.832 30.104 110.408 30.104C110.866 30.104 111.309 30.0347 111.736 29.896C112.173 29.7467 112.584 29.5067 112.968 29.176L113.416 30.088C113.064 30.408 112.616 30.664 112.072 30.856C111.528 31.048 110.973 31.144 110.408 31.144ZM117.889 31L114.993 23.224H116.353L118.737 30.04H118.353L120.817 23.224H121.921L124.337 30.04H123.969L126.385 23.224H127.681L124.769 31H123.537L120.993 24.008H121.681L119.137 31H117.889Z"
                      fill="#00293C"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8 text-white">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredQuestions.map((question, index) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    index={index}
                    isSelected={selectedQuestions.has(question.id)}
                    onSelect={() => toggleQuestion(question.id)}
                    onPreview={() => handlePreview(question)}
                    onDelete={handleDelete}
                  />
                ))}
                {filteredQuestions.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-400">
                    No questions found for this topic
                  </div>
                )}
              </div>
            )}
          </div>

          {isPreviewOpen && previewQuestion && (
            <Modal
              isOpen={isPreviewOpen}
              onClose={() => setIsPreviewOpen(false)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-white text-lg">Question</h3>
                    <p className="text-sm text-[#8C8C8C] mt-1">
                      {"quantities" in previewQuestion
                        ? "Formula Based"
                        : "options" in previewQuestion
                        ? "Multiple Choice"
                        : "choices" in previewQuestion
                        ? "Fill in the Blanks"
                        : "True/False"}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="text-[#8C8C8C] hover:text-white"
                  >
                    ×
                  </button>
                </div>

                <div className="mb-8">
                  <p className="text-white text-lg mb-4">
                    {previewQuestion.question}
                  </p>
                  {"quantities" in previewQuestion ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-[#1A1A1A] rounded-lg">
                        <p className="text-[#8C8C8C] mb-3">Formula:</p>
                        <p className="text-[#21B6F8] font-mono text-lg">
                          {previewQuestion.formula.map((f)=>f.symbol).join(" ")}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <p className="text-[#8C8C8C]">Known Values:</p>
                        {previewQuestion.quantities
                          .filter((q) => !q.isUnknown)
                          .map((q, idx) => (
                            <div
                              key={idx}
                              className="p-3 bg-[#1A1A1A] rounded-lg"
                            >
                              <span className="text-white">{q.name}</span>
                              <span className="text-[#8C8C8C] ml-2">
                                ({q.symbol})
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : "options" in previewQuestion ? (
                    <div className="space-y-3">
                      <p className="text-[#8C8C8C]">Options:</p>
                      {previewQuestion.options.map((option, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg flex items-center justify-between ${
                            previewQuestion.answers.includes(option)
                              ? "bg-[#21B6F8] bg-opacity-10 text-[#21B6F8] border border-[#21B6F8]"
                              : "bg-[#111111] text-white"
                          }`}
                        >
                          {!previewQuestion.resource && <div>{option}</div>}
                          {previewQuestion.resource &&
                            previewQuestion.options[idx] && (
                              <div>
                                {previewQuestion.resource[idx] ? (
                                  <img
                                    src={
                                      previewQuestion.resource[idx] ||
                                      "https://via.placeholder.com/150"
                                    }
                                    alt={`Option ${idx + 1}`}
                                    className="mt-2 w-[50px] h-[50px] rounded-lg"
                                  />
                                ) : (
                                  <div>{option}</div>
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  ) : "choices" in previewQuestion ? (
                    <div className="space-y-3">
                      <p className="text-[#8C8C8C]">Options:</p>
                      {previewQuestion.choices.map((choice, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg flex items-center justify-between  ${
                            previewQuestion.answers.includes(choice)
                              ? "bg-[#21B6F8] bg-opacity-10 text-[#21B6F8] border border-[#21B6F8]"
                              : "bg-[#111111] text-white"
                          }`}
                        >
                          {choice}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-[#8C8C8C]">Options:</p>
                      {["True", "False"].map((option, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg flex items-center justify-between  ${
                            option === previewQuestion.answer
                              ? "bg-[#21B6F8] bg-opacity-10 text-[#21B6F8] border border-[#21B6F8]"
                              : "bg-[#111111] text-white"
                          }`}
                        >
                          {option}
                          {previewQuestion.resource &&
                            previewQuestion.resource[idx] && (
                              <img
                                src={
                                  previewQuestion.resource[idx] ||
                                  "https://via.placeholder.com/150"
                                }
                                alt={`Option ${idx + 1}`}
                                className="mt-2 w-[50px] h-[50px] rounded-lg"
                              />
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        setFeedback(feedback === "up" ? null : "up")
                      }
                      className={`p-2 rounded-full ${
                        feedback === "up"
                          ? "bg-[#21B6F8] text-white"
                          : "text-[#8C8C8C] hover:text-white"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setFeedback(feedback === "down" ? null : "down")
                      }
                      className={`p-2 rounded-full ${
                        feedback === "down"
                          ? "bg-[#21B6F8] text-white"
                          : "text-[#8C8C8C] hover:text-white"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
                      </svg>
                    </button>
                    <span className="text-[#8C8C8C]">Provide Feedback</span>
                  </div>
                  <button
                    onClick={() => toggleQuestion(previewQuestion.id)}
                    className={`px-4 py-2 rounded ${
                      selectedQuestions.has(previewQuestion.id)
                        ? "bg-gray-600 text-white cursor-not-allowed"
                        : "bg-[#21B6F8] text-white hover:bg-opacity-90"
                    }`}
                    disabled={selectedQuestions.has(previewQuestion.id)}
                  >
                    {selectedQuestions.has(previewQuestion.id)
                      ? "Added to Quiz"
                      : "Add to Quiz"}
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassQuestions;
