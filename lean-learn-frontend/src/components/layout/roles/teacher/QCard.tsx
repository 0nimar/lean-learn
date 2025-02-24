import { useState } from "react";
import { MCQQuestion, FillQuestion, TFQuestion, FormulaQuestion } from "../../../../lib/interfaces/quizInterface";

interface QuestionCardProps {
    question: {question:string,topic:string};
    index: number;
    isSelected: boolean;
    onSelect: () => void;
    onPreview: () => void;
    onDelete: (
      id: string,
      type: "mcq" | "fill" | "tf" | "formula"
    ) => Promise<void>;
  }
  
  export const QCard: React.FC<QuestionCardProps> = ({
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
                Formula: {question.formula.map((f: { symbol: any; })=>f.symbol)}
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