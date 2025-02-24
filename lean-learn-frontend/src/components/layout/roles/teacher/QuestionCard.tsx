
interface QuestionCardProps {
  question: {question:string,topic:string};
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  number: number;
}
export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isSelected,
  onSelect,
  onPreview,
  number
}) => {
  return (
    <div className={`w-full rounded-lg p-4 transition-all duration-200 ${
      isSelected ? 'bg-[#21B6F8] bg-opacity-10 border border-[#21B6F8]' : 'bg-[#111111] hover:bg-opacity-80'
    }`}>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-base text-white mb-1">
              {number}. {question.question}
            </h3>
            <p className="text-sm text-[#8C8C8C]">{question.topic}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onPreview();
              }}
              className="p-1 text-[#8C8C8C] hover:text-[#21B6F8] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 10C3.875 6.25 6.8125 3.75 10 3.75C13.1875 3.75 16.125 6.25 17.5 10C16.125 13.75 13.1875 16.25 10 16.25C6.8125 16.25 3.875 13.75 2.5 10Z" stroke="currentColor"/>
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor"/>
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                isSelected 
                  ? 'bg-[#21B6F8] text-white' 
                  : 'border border-[#8C8C8C] hover:border-[#21B6F8]'
              }`}
            >
              {isSelected && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};