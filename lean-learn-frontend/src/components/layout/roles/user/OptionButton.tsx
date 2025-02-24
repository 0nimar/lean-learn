const OptionButton = (choice: string, isCorrect: boolean) => (
    <button
      key={choice}
      onClick={() => handleOptionSelect(choice)}
      className={`
        p-3 lg:p-6 rounded-lg border-2 transition-all
        ${
          selectedAnswers.includes(choice)
            ? showFeedback 
              ? isCorrect
                ? "border-green-400 bg-green-600/20"
                : "border-red-400 bg-red-600/20"
              : "border-[#00A3FF] bg-[#00A3FF]/20"
            : "border-[#3A3B3D] bg-[#101113] hover:bg-[#1A1A1A]"
        }
      `}
    >
      {isImageUrl(choice) ? (
        <img
          src={choice} // Use the Base64 URL directly as the src
          alt="Option"
          className="w-[100px] h-[100px] rounded-lg"
        />
      ) : (
        <span className="text-white text-sm lg:text-lg">{choice}</span>
      )}
    </button>
  );

  export default OptionButton