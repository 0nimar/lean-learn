import React from 'react'
import { isFormulaQuestion, isMCQQuestion, isValidOption, isFillQuestion, isTFQuestion } from '../../../../lib/function/bool';
import FormulaInterface from './FormulaInterface';
import OptionButton from './OptionButton';

const QuestionOption = () => {
        const currentQuestion = questions[currentQuestionIndex];
        // console.log("questions",questions,"index",currentQuestionIndex);
        if (!currentQuestion) return null;
    
        if (isFormulaQuestion(currentQuestion)) {
          return <FormulaInterface question={currentQuestion} quantities={[]} formula={[]} options={[]} answers={[]} resource={[]} id={""} class_={""} subject={""} topic={""} used={false}/>
        }
    
    
    
        if (isMCQQuestion(currentQuestion)) {
          const validOptions = currentQuestion.options.filter(isValidOption);
          return (
            <div className="grid grid-cols-2 gap-6">
              {validOptions.map((option) =>
              <OptionButton/>
              )}
            </div>
          );
        }
    
        if (isFillQuestion(currentQuestion)) {
          const validChoices = currentQuestion.choices.filter(isValidOption);
          console.log(validChoices)
          return (
            <div className="grid grid-cols-2 gap-6">
              {validChoices.map((choice) =>
                // renderButton(choice, currentQuestion.answers.includes(choice))
                <OptionButton/>
              )}
            </div>
          );
        }
    
        if (isTFQuestion(currentQuestion)) {
          return (
            <div className="grid grid-cols-2 gap-6">
              {["True", "False"].map((choice) =>
                // renderButton(choice, currentQuestion.answer === choice)
                <OptionButton/>
              )}
            </div>
          );}
          if (isFormulaQuestion(currentQuestion)){
            return(
              <div className="flex flex-1 gap-2">{["p", "m","v"].map((choice) =>
                // renderButton(choice, true)
                <OptionButton/>
              )}</div>
            )
          }
}

export default QuestionOption
// ##################################################reference##############################

// const renderQuestionOptions = () => {
//     const currentQuestion = questions[currentQuestionIndex];
//     // console.log("questions",questions,"index",currentQuestionIndex);
//     if (!currentQuestion) return null;

//     if (isFormulaQuestion(currentQuestion)) {
//       return <FormulaInterface question={currentQuestion} quantities={[]} formula={[]} options={[]} answers={[]} resource={[]} id={""} class_={""} subject={""} topic={""} used={false}/>
//     }



//     if (isMCQQuestion(currentQuestion)) {
//       const validOptions = currentQuestion.options.filter(isValidOption);
//       return (
//         <div className="grid grid-cols-2 gap-6">
//           {validOptions.map((option) =>
//           <OptionButton/>
//           )}
//         </div>
//       );
//     }

//     if (isFillQuestion(currentQuestion)) {
//       const validChoices = currentQuestion.choices.filter(isValidOption);
//       console.log(validChoices)
//       return (
//         <div className="grid grid-cols-2 gap-6">
//           {validChoices.map((choice) =>
//             // renderButton(choice, currentQuestion.answers.includes(choice))
//             <OptionButton/>
//           )}
//         </div>
//       );
//     }

//     if (isTFQuestion(currentQuestion)) {
//       return (
//         <div className="grid grid-cols-2 gap-6">
//           {["True", "False"].map((choice) =>
//             // renderButton(choice, currentQuestion.answer === choice)
//             <OptionButton/>
//           )}
//         </div>
//       );}
//       if (isFormulaQuestion(currentQuestion)){
//         return(
//           <div className="flex flex-1 gap-2">{["p", "m","v"].map((choice) =>
//             // renderButton(choice, true)
//             <OptionButton/>
//           )}</div>
//         )
//       }
    

//     return null;
//   };
