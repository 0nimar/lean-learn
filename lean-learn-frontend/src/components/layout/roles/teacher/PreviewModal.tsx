import { useState } from "react";
import { MCQQuestion, FillQuestion, TFQuestion } from "../../../../lib/interfaces/quizInterface";
import { Modal } from "./Modal";


export const PreviewModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    question: MCQQuestion | FillQuestion | TFQuestion | null;
    onSelect: (questionId: string) => void;
    isSelected: boolean;
  }> = ({ isOpen, onClose, question, onSelect, isSelected }) => {
    const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  
    if (!question) return null;
  
    const handleAddToQuiz = () => {
      onSelect(question.id);
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="bg-[#111111] w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-[#1A1A1A]">
            <span className="text-white text-lg">Question</span>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
  
          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-white text-lg mb-4">
                {question.question}
              </h2>
              
              <div className="text-gray-400 mb-2">Options:</div>
              {'options' in question ? (
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                     <div key={index} className="p-3 bg-[#1A1A1A] rounded text-white">
                     {typeof option === "string" && option.startsWith("data:") ? (
                       <img
                         src={option}
                         alt={`Option ${index + 1}`}
                         className="w-[50px] h-[50px] rounded-lg"
                       />
                     ) : (
                       <div>{option}</div>
                     )}
                   </div>
                  ))}
                </div>
              ) : 'choices' in question ? (
                <div className="space-y-2">
                  {question.choices.map((choice, index) => (
                    <div key={index} className="p-3 bg-[#1A1A1A] rounded text-white">
                      {choice}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-[#1A1A1A] rounded text-white hover:bg-[#2A2A2A]">
                    True
                  </button>
                  <button className="px-4 py-2 bg-[#1A1A1A] rounded text-white hover:bg-[#2A2A2A]">
                    False
                  </button>
                </div>
              )}
            </div>
  
            <div className="flex justify-between items-center pt-4 border-t border-[#1A1A1A]">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    feedback === 'up' 
                      ? 'bg-[#21B6F8] text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </button>
  
                <button 
                  onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                    feedback === 'down' 
                      ? 'bg-[#21B6F8] text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
                  </svg>
                </button>
  
                <span className="text-gray-400">Provide Feedback</span>
              </div>
  
              <button 
                onClick={handleAddToQuiz}
                className={`px-4 py-2 rounded transition-colors ${
                  isSelected 
                    ? 'bg-gray-600 text-white cursor-not-allowed'
                    : 'bg-[#21B6F8] text-black hover:bg-[#1CA1E3]'
                }`}
                disabled={isSelected}
              >
                {isSelected ? 'Added to Quiz' : 'Add to Quiz'}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  };