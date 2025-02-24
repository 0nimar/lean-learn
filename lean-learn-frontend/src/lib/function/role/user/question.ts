const handleFormulaSelect = (type: "word" | "operator", value: string) => {
  setFormulaSequence((prev) => [...prev, { type, value }]);
  setDisabledSymbols((prev) => new Set([...prev, value]));
};

// When undoing
const handleFormulaUndo = () => {
  setFormulaSequence((prev) => {
    if (prev.length === 0) return prev;
    const lastSymbol = prev[prev.length - 1].value;
    // Remove only the last symbol from disabled set
    setDisabledSymbols((prevDisabled) => {
      const newDisabled = new Set(prevDisabled);
      newDisabled.delete(lastSymbol);
      return newDisabled;
    });
    return prev.slice(0, -1);
  });
};

// When clearing all
const handleFormulaClear = () => {
  setFormulaSequence([]);
  setDisabledSymbols(new Set());
};

const handleOptionSelect = (answer: string) => {
  setSelectedAnswers((prev) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (isTFQuestion(currentQuestion)) {
      return [answer];
    }
    if (isFillQuestion(currentQuestion)) {
      console.log("question", currentQuestion.question);
      // setFinalquestion(currentQuestion.question)
    }
    if (prev.includes(answer)) {
      return prev.filter((a) => a !== answer);
    } else if (prev.length < 3) {
      return [...prev, answer];
    }
    return prev;
  });
};

const handleAnswerSubmit = async () => {
  const currentQuestion = questions[currentQuestionIndex];
  let correct = false;
  let submittedAnswer = "";
  let filteredform = "";
  if (isFormulaQuestion(currentQuestion)) {
    submittedAnswer = formulaSequence.map((item) => item.value).join(" ");
    filteredform = currentQuestion.formula
      .map((f) =>
        currentQuestion.formula.indexOf(f) % 2 == 0 ? f.name : f.symbol
      )
      .join(" ");
    correct = submittedAnswer === filteredform;
  } else if (
    isMCQQuestion(currentQuestion) ||
    isFillQuestion(currentQuestion)
  ) {
    if (selectedAnswers.length === 0) return;
    const correctAnswers = currentQuestion.answers;
    correct =
      selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.every((answer) => correctAnswers.includes(answer)) &&
      correctAnswers.every((answer) => selectedAnswers.includes(answer));
    submittedAnswer = selectedAnswers.join(", ");
  } else if (isTFQuestion(currentQuestion)) {
    if (selectedAnswers.length === 0) return;
    correct = selectedAnswers[0] === currentQuestion.answer;
    submittedAnswer = selectedAnswers[0];
  }
  if (isFillQuestion(currentQuestion)) {
    setFinalquestion(
      currentQuestion.question.replace(
        "_____",
        selectedAnswers.map((q) => q).join(",")
      )
    );
  }
  if (correct) {
    correctAudio();
    setCorrectAnswersCount((prevCount) => prevCount + 1);
  } else {
    incorrectAudio();
    setIncorrectAnswersCount((prevCount) => prevCount + 1);
  }

  setIsCorrect(correct);
  setShowFeedback(true);
  setLoadingCompanionMessage(true);
  setAttemptedQuestionsCount((prevCount) => prevCount + 1);
  const isBase64Image = (answer: string): boolean => {
    return (
      answer.startsWith("data:image/png;base64") ||
      answer.startsWith("data:image/jpeg;base64")
    );
  };
  try {
    const requestData = {
      question: currentQuestion.question,
      topic: currentQuestion.topic,
      subject: currentQuestion.subject,
      answer: isFormulaQuestion(currentQuestion)
        ? filteredform
        : isTFQuestion(currentQuestion)
        ? currentQuestion.answer
        : currentQuestion.answers.join(", "),
      chosen_answer: submittedAnswer,
    };

    const explanation = await aiApi.explainAnswer(requestData);
    setCompanionMessage(
      formatExplanation(
        explanation,
        correct,
        isFormulaQuestion(currentQuestion)
          ? filteredform
          : isTFQuestion(currentQuestion)
          ? currentQuestion.answer
          : currentQuestion.answers.join(", ")
      )
    );
  } catch (error) {
    console.error("Failed to get AI explanation:", error);
    setCompanionMessage(
      correct
        ? "Well done! You got it right."
        : `Not quite right. The correct answer was: ${
            isFormulaQuestion(currentQuestion)
              ? filteredform
              : isTFQuestion(currentQuestion)
              ? currentQuestion.answer
              : isMCQQuestion(currentQuestion) ||
                isFillQuestion(currentQuestion)
              ? isBase64Image(currentQuestion.answers.join(", "))
                ? "[Image]"
                : currentQuestion.answers.join(", ")
              : currentQuestion.answers.join(", ")
          }`
    );
  } finally {
    setLoadingCompanionMessage(false);
  }

  try {
    if (isFormulaQuestion(currentQuestion)) {
      await formulaQuestionApi.update(currentQuestion.id, {
        ...currentQuestion,
        used: true,
      });
      setFormulaSequence([]);
    } else if (isMCQQuestion(currentQuestion)) {
      await mcqQuestionApi.update(currentQuestion.id, {
        ...currentQuestion,
        used: true,
      });
    } else if (isFillQuestion(currentQuestion)) {
      await fillQuestionApi.update(currentQuestion.id, {
        ...currentQuestion,
        used: true,
      });
    } else if (isTFQuestion(currentQuestion)) {
      await tfQuestionApi.update(currentQuestion.id, {
        ...currentQuestion,
        used: true,
      });
    }
  } catch (error) {
    console.error("Failed to update question status:", error);
  }
};

const handleSkip = () => {
  if (currentQuestionIndex + 1 < questions.length) {
    setCurrentQuestionIndex((prev) => prev + 1);
    // setFinalquestion(questions[currentQuestionIndex].question)
    setSelectedAnswers([]);
    setShowFeedback(false);
    setCompanionMessage("");
    setDisabledSymbols(new Set());
    setFormulaSequence([]);
  }
};


const handleNext = () => {
  if (currentQuestionIndex + 1 < questions.length) {
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswers([]);
    setShowFeedback(false);
    setFormulaSequence([]);
    setDisabledSymbols(new Set());
  } else {
    summaryAudio();
    const totalQuestions = questions.length;
    navigate("/summary", {
      state: {
        topicId,
        selectedCompanion,
        totalQuestions,
        correctAnswersCount,
        attemptedQuestionsCount,
        incorrectAnswersCount,
      },
    });
  }
};

export {
  handleFormulaClear,
  handleFormulaUndo,
  handleOptionSelect,
  handleFormulaSelect,
  handleAnswerSubmit,
  handleNext,
  handleSkip,
};
