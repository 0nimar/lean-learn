// ######################################


const handleSelectionChange = (e: any) => {
  setChoiceType(e.target.value);
  localStorage.removeItem("choices");
};


// ######################################


const addChoice = () => {
  if (choices.length < 4) {
    const newId = Math.max(...choices.map((c) => c.id)) + 1;
    setChoices([...choices, { id: newId, text: "" }]);
  }
};

// ######################################

const addQuantity = () => {
  setQuantities([...quantities, { name: "", symbol: "", isUnknown: false }]);
};

// ######################################

const removeQuantity = (index: number) => {
  const newQuantities = quantities.filter((_, i) => i !== index);
  setQuantities(newQuantities);
};

// ######################################

const addOperator = () => {
  setOperators([...operators, { name: "", symbol: "" }]);
};

// ######################################

const removeOperator = (index: number) => {
  const newOperators = operators.filter((_, i) => i !== index);
  setOperators(newOperators);
};

// ######################################

const handleQuantitySelect = (index: number, quantityName: string) => {
    
    if (quantityName=="add new"){
      setAddNew(true);
      
    }
    else{const symbol = commonQuantities.find(qty => qty.qty_name === quantityName)?.qty_symbol||" ";
    console.log("symbol:",symbol)
    console.log("commonq:",commonQuantities)
    // Update quantities
    const newQuantities = [...quantities];
    newQuantities[index] = {
      ...newQuantities[index],
      name: quantityName,
      symbol: symbol,
    };
  
    // Update formula at the correct position (even index)
    const newFormula = [...formula];
    const formulaIndex = index * 2; // Ensuring quantities go to even indices
    newFormula[formulaIndex] = {
      name: quantityName,
      symbol: symbol,
    };
  
    setQuantities(newQuantities);
    setFormula(newFormula);
  }};

 // ###################################### 

 const handleOperatorSelect = (index: number, operatorName: string) => {
    const symbol = commonOperators[operatorName as keyof typeof commonOperators];
  
    // Update operators
    const newOperators = [...operators];
    newOperators[index] = {
      ...newOperators[index],
      name: operatorName,
      symbol: symbol,
    };}

// ######################################

const handleChoiceImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
        choiceId: number
      ) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const updatedChoices = choices.map((choice) =>
              choice.id === choiceId
                ? { ...choice, imageUrl: reader.result as string, text: "" }
                : choice
            );
            setChoices(updatedChoices);
    
            // Update the imageUrls state
            const updatedImageUrls = updatedChoices.map((c) => c.imageUrl || "");
            setImageUrls(updatedImageUrls);
    
            // Update the question data with the new image URLs
            setQuestionData({
              ...questionData,
              resource: updatedImageUrls,
            });
          };
          reader.readAsDataURL(file);
        }
      };

// ######################################

const handleImageAnswerSelect = (choiceId: number) => {
        if (questionType === "MCQs") {
          // Toggle selection for MCQs
          setSelectedAnswers((prev) =>
            prev.includes(choiceId)
              ? prev.filter((id) => id !== choiceId)
              : [...prev, choiceId]
          );
        } else {
          // Single selection for other question types
          setSelectedAnswer(choiceId);
        }
      };
      const handleChoiceChange = (id: number, text: string) => {
        setChoices(
          choices.map((choice) =>
            choice.id === id ? { ...choice, text, imageUrl: "" } : choice
          )
        );
        setQuestionData({
          ...questionData,
          options: choices.map((c) => c.text),
        });
        console.log(choices,questionData)
      };
// ######################################################################

async function addNew(qtyname:string,qtysymbol:string){
    const res =await quantitiesApi.create({qty_name:qtyname,qty_symbol:qtysymbol});
    console.log("res1",res);
    return res
  }

// ######################################################################

const handleSubmit = async () => {
    if (addnew){
      setIsLoading(true);
      if(!qname||!qsymbol){
        setIsLoading(false);
        alert("Please fill all fields")
        return;
      }
      // if(commonQuantities.hasOwnProperty(qname)&&commonQuantities[qname]===qsymbol){
      //   alert("Quantity already exists");
      //   setIsLoading(false);
      //   setAddNew(false)
      //   return;
      // }
     
      await addNew(qname,qsymbol);
      await fetchQuantities();
      console.log(commonQuantities)
      setIsLoading(false);
      setAddNew(false)
    }else{
    try {
      setIsLoading(true);
      if (!questionData.question.trim()) {
        alert("Please enter a question");
        return;
      }

      if (questionType === "MCQs") {
        if (choiceType === "text" ) {
          if (choices.some((c) => !c.text.trim())) {
            alert("Please fill in all options");
            setIsLoading(false);
            return;
          }
        } else if (choiceType === "image") {
          if (choices.some((c) => !c.imageUrl)) {
            alert("Please upload all images");
            setIsLoading(false);
            return;
          }
        }
        if (selectedAnswers.length === 0) {
          alert("Please select at least one correct answer");
          setIsLoading(false);
          return;
        }

        const mcqData: MCQQuestionData = {
          id: String(Date.now()),
          class_: questionData.class_,
          subject: "Physics",
          topic: questionData.topic,
          question: questionData.question,
          options:
            choiceType === "text"
              ? choices.map((c) => c.text || "") // Ensure no undefined values
              : choices.map((c) => c.imageUrl || ""),
          answers: selectedAnswers.map((answerId) => {
            const choice = choices.find((c) => c.id === answerId);
            return choiceType === "text"
              ? choice?.text || ""
              : choice?.imageUrl || "";
          }),
          captions:[""],
          resource: choices.map((c) => c.imageUrl || ""),
          used: true,
        };
        console.log("mcqData:",mcqData);
        const response = await fetch(
          "https://lean-learn-backend-ai-ex3e.onrender.com/mcqquestion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mcqData),
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else if (questionType === "Fill in the blank") {
        if (!questionData.question.includes("_")) {
          alert("Please add at least one blank in your question");
          setIsLoading(false);
          return;
        }

        if (choices.some((c) => !c.text.trim())) {
          alert("Please fill in all options");
          setIsLoading(false);
          return;
        }

        if (selectedAnswers.length === 0) {
          alert("Please select at least one correct answer");
          setIsLoading(false);
          return;
        }
      

        const fillBlankData: FillBlankQuestionData = {
          id: String(Date.now()),
          class_: questionData.class_,
          subject: "Physics",
          topic: questionData.topic,
          question: questionData.question,
          choices: choices.map((c) => c.text),
          answers: selectedAnswers.map((answerId) => {
            const choice = choices.find((c) => c.id === answerId);
            return choice?.text || "";
          }),
          resource: [""],
          used: true,
        };
        const response = await fetch(
          "https://lean-learn-backend-ai-ex3e.onrender.com/fillquestion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fillBlankData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else if (questionType === "True/False") {
        const tfData: TrueFalseQuestionData = {
          id: String(Date.now()),
          class_: questionData.class_,
          subject: "Physics",
          topic: questionData.topic,
          question: questionData.question,
          answer: selectedAnswer === 1 ? "True" : "False",
          resource: "",
          used: true,
        };

        const response = await fetch(
          "https://lean-learn-backend-ai-ex3e.onrender.com/tfquestion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tfData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else if (questionType === "Create Formula") {
        if (quantities.length < 2) {
          alert("Please add at least two quantities");
          return;
        }

        if (!quantities.some((q) => q.isUnknown)) {
          alert("Please mark at least one quantity as unknown");
          return;
        }

        if (!questionData.question.trim()) {
          alert("Please enter a question");
          return;
        }

        try {
          const formulaData = {
            id: String(Date.now()),
            class_: questionData.class_,
            subject: "Physics",
            topic: questionData.topic,
            question: questionData.question,
            quantities: quantities.map((q) => ({
              name: q.name,
              symbol: q.symbol,
              isUnknown: Boolean(q.isUnknown),
            })),
            formula: formula,
            // Add the required fields that were missing
            options: [""], // Empty array as it's not used for formula questions
            answers: [""], // Empty array as it's not used for formula questions
            resource: [""], // Empty array as per the API requirement
            used: true,
          };

          console.log("Submitting formula data:", formulaData);

          const result = await formulaQuestionApi.create(formulaData);
          console.log("Creation successful:", result);

          // Clear the form after successful submission
          setQuestionData({
            question: "",
            topic: "gravitation",
            class_: "8",
            subject: "Physics",
            options: ["", ""],
            answers: [""],
            resource: [""],
            used: true,
          });
          setQuantities([]);
          navigate("/teacher/question-bank");
        } catch (error) {
          console.error("Error saving formula question:", error);
          alert(
            "Failed to save formula question: " +
              (error instanceof Error ? error.message : "Unknown error")
          );
        }
      }

      setIsLoading(false);
      localStorage.removeItem("choices");
      navigate("/teacher/question-bank");
    } 
    catch (error) {
      setIsLoading(false);
      console.error("Error saving question:", error);
      if (error instanceof Error) {
        alert(`Failed to save question: ${error.message}`);
      } else {
        alert("Failed to save question");
      }
    }}
  };
  
// ######################################################################
const handleAddQuestions=()=>{
  
}
// ######################################################################

  const toggleQuestion = (questionId: string) => {
    // const newSelected = new Set(selectedQuestions);
    // if (newSelected.has(questionId)) {
    //   newSelected.delete(questionId);
    // } else if (newSelected.size < 20) {
    //   newSelected.add(questionId);
    // }
    // setSelectedQuestions(newSelected);
  };
// ######################################################################

  const handlePreview = (question: MCQQuestion | FillQuestion | TFQuestion) => {
    // setPreviewQuestion(question);
    // setIsPreviewOpen(true);
  };
// ######################################################################

  const handleSaveDraft = async () => {
    // try {
    //   navigate('/teacher/dashboard');
    // } catch (error) {
    //   console.error('Error saving draft:', error);
    // }
  };
// ######################################################################

  const handleFinalize = async () => {
    // try {
    // } catch (error) {
    //   console.error('Error finalizing quiz:', error);
    // }
  };
  
// ######################################################################
// ######################################################################
// ######################################################################
// ######################################################################
// ######################################################################
// ######################################################################
export {
  handleFinalize,
  handlePreview,
  handleSaveDraft,
  toggleQuestion,
  handleSelectionChange,
  handleAddQuestions,
  removeOperator,
  removeQuantity,
  addChoice,
  addOperator,
  addQuantity,
  handleOperatorSelect,
  handleQuantitySelect,
  handleChoiceChange,
  handleImageAnswerSelect,
  handleChoiceImageUpload
};
