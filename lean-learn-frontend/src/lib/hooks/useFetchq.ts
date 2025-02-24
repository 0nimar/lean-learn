useEffect(() => {
    if (!selectedClass) {
      navigate("/");
      return;
    }

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const [mcqData, fillData, tfData, formulaData] = await Promise.all([
          mcqQuestionApi.getAll(),
          fillQuestionApi.getAll(),
          tfQuestionApi.getAll(),
          formulaQuestionApi.getAll(),
        ]);
        const transformedSelectedTopic = selectedTopic
        .replace(/\s+/g, "")
        .replace(/,/g, "") 
        .toLowerCase();    

        const combinedQuestions:(MCQQuestion|FillQuestion|TFQuestion|FormulaQuestion)[] = [
          ...mcqData,
          ...fillData,
          ...tfData,
          ...formulaData,
        ].filter((q) => {
          if (!q || !q.class_ || !q.topic) return false;
          const classMatch =
            String(q.class_).trim() === String(selectedClass).trim();
          const topicMatch =
            String(q.topic).toLowerCase().trim() === transformedSelectedTopic;
          return classMatch && topicMatch;
        });

        if (combinedQuestions.length > 0) {
          const shuffledQuestions = combinedQuestions.sort(
            () => Math.random() - 0.5
          );
          setQuestions(shuffledQuestions);
        } else {
          setError(
            `No questions available for Class ${selectedClass} topic ${topicId}`
          );
        }
      } catch (err) {
        console.error("Error in fetchQuestions:", err);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topicId, selectedClass, navigate]);
  const fetchQuantities = async () => {
    try {
      const [quantiti] =
        await Promise.all([
          quantitiesApi.getAll()
        ]);

      setCommonq(quantiti);
    } catch (error) {
      console.error("Error fetching quantity:", error);
    }
   //   finally {
   //    setLoading(false);
   //  }
  };


  useEffect(() => {
     
 
    fetchQuantities();
}, []);
useEffect(() => {
 localStorage.setItem(
   "currentQuestionIndex",
   currentQuestionIndex.toString()
 );
 
 setCompanionMessage("");
 const question = questions[currentQuestionIndex];
 if (question) {
   console.log(question);
   setFinalquestion(question.question);
 }

}, [questions,currentQuestionIndex]);
