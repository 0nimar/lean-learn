import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mcqQuestionApi, fillQuestionApi, tfQuestionApi } from '../../lib/api/questions';
import { MCQQuestion, FillQuestion, TFQuestion } from '../../types/quizInterface';
import SideBar from '../ui/SideBar';
import { QuestionCard } from './QuestionCard';
import { PreviewModal } from './PreviewModal';
import { handleAddQuestions, toggleQuestion, handlePreview, handleSaveDraft, handleFinalize } from '../../../../lib/function/role/teacher/function';




const QuestionSelection: React.FC = () => {
  const [allQuestions, setAllQuestions] = useState<(MCQQuestion | FillQuestion | TFQuestion)[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [previewQuestion, setPreviewQuestion] = useState<MCQQuestion | FillQuestion | TFQuestion | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPreviewOpen) {
        setIsPreviewOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isPreviewOpen]);


  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading questions...</div>
      </div>
    );
  }

  return (
    <>   
    <div className="flex min-h-screen bg-black">
      <div className="flex-1 page-content-quiz">
        <div className="bg-[#111111] p-4 flex items-center gap-2 text-white">
          <span>Create Quiz</span>
          <span>›</span>
          <span className="text-[#21B6F8]">Select Questions</span>
        </div>

        <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <button onClick={handleAddQuestions}>
          <div className='text-white w-full h-full border-4 p-4 flex justify-center place-items-center rounded-lg border-dashed'>Add Questions</div></button>
          {allQuestions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              isSelected={selectedQuestions.has(question.id)}
              onSelect={() => toggleQuestion(question.id)}
              onPreview={() => handlePreview(question)}
              number={index + 1}
            />
          ))}
        </div>
      </div>

        <div className="fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-[#1A1A1A] p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="text-white">
              {selectedQuestions.size} / {allQuestions.length} Questions
            </span>
            <div className="flex gap-4">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-2 rounded-lg border border-[#21B6F8] text-[#21B6F8] hover:bg-[#21B6F8] hover:text-black transition-colors"
              >
                Save as Draft
              </button>
              <button
                onClick={handleFinalize}
                className="px-6 py-2 rounded-lg bg-[#21B6F8] text-black hover:bg-[#1CA1E3] transition-colors"
              >
                Finalize Quiz
              </button>
            </div>
          </div>
        </div>

        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          question={previewQuestion}
          onSelect={toggleQuestion}
          isSelected={previewQuestion ? selectedQuestions.has(previewQuestion.id) : false}
        />
      </div>
    </div>
    </>
  );
};

export default QuestionSelection;