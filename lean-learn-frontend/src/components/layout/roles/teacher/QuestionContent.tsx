import React from 'react'

const QuestionContent = () => {
  return (
    <div>QuestionContent</div>
  )
}

export default QuestionContent


// ############# reference code  ######
//   const renderQuestionContent = () => {
//     if (questionType === "True/False") {
//       return (
//         <div className="space-y-4 ml-6">
//           <div className="flex items-center gap-3">
//             <input
//               type="radio"
//               name="answer"
//               checked={selectedAnswer === 1}
//               onChange={() => setSelectedAnswer(1)}
//               className="w-4 h-4 text-[#21B6F8] bg-transparent border-gray-600 focus:ring-[#21B6F8]"
//             />
//             <div className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700">
//               True
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <input
//               type="radio"
//               name="answer"
//               checked={selectedAnswer === 2}
//               onChange={() => setSelectedAnswer(2)}
//               className="w-4 h-4 text-[#21B6F8] bg-transparent border-gray-600 focus:ring-[#21B6F8]"
//             />
//             <div className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700">
//               False
//             </div>
//           </div>
//         </div>
//       );
//     }

//     if (questionType === "Create Formula") {
//       return (
//         <div className="space-y-6 ml-6">
//           <div className="space-y-4 bg-[#1A1A1A] p-4 rounded-lg border border-gray-700">
//             <h3 className="text-white text-lg mb-4">Formula Builder</h3>

//             {quantities.map((quantity, index) => (
//               <div key={index} className="flex items-center gap-4">
//                 <select
//                   value={quantity.name}
//                   onChange={(e) => handleQuantitySelect(index, e.target.value)}
//                   className="bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
//                 >
//                   <option value="">Select Quantity</option>
//                   {
//                   commonQuantities.map((name) => (
//                     <option key={name.id} value={name.qty_name}>
//                       {name.qty_name}
//                     </option>
//                   ))
//                   }
//                   <option value="add new">Add New</option>
//                 </select>
//                 <div className="flex items-center gap-2 text-white">
//                   <span>Symbol: {quantity.symbol}</span>
//                 </div>

//                 <label className="flex items-center gap-2 text-white">
//                   <input
//                     type="checkbox"
//                     checked={quantity.isUnknown}
//                     onChange={(e) => {
//                       const newQuantities = [...quantities];
//                       newQuantities[index] = {
//                         ...newQuantities[index],
//                         isUnknown: e.target.checked,
//                       };
//                       setQuantities(newQuantities);
//                     }}
//                     className="rounded border-gray-700"
//                   />
//                   Unknown
//                 </label>

//                 <button
//                   onClick={() => removeQuantity(index)}
//                   className="text-red-500 hover:text-red-400"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             {operators.map((op, index) => (
//               <div key={index} className="flex items-center gap-4">
//                 <select
//                   value={op.name}
//                   onChange={(e) => handleOperatorSelect(index, e.target.value)}
//                   className="bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
//                 >
//                   <option value="">Select Operator</option>
//                   {Object.keys(commonOperators).map((name) => (
//                     <option key={name} value={name}>
//                       {name}
//                     </option>
//                   ))}
//                 </select>

//                 <div className="flex items-center gap-2 text-white">
//                   <span>Symbol: {op.symbol}</span>
//                 </div>
//                 <button
//                   onClick={() => removeOperator(index)}
//                   className="text-red-500 hover:text-red-400"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
            
//   <div className="flex gap-2 mt-4">
//   {/* {Object.keys(commonOperators).map((name) => (
//                 <button
//                   key={name}
//                   onClick={() => setSelectedOperator(op)}
//                   className={`px-3 py-1 rounded ${
//                     selectedOperator === op
//                       ? "bg-[#21B6F8] text-white"
//                       : "bg-[#111111] text-white hover:bg-opacity-90"
//                   }`}
//                 >
//                   {op}
//                 </button>
//               ))} */}
//             </div>
//             <button
//               onClick={addQuantity}
//               className="px-4 py-2 mr-2 bg-[#21B6F8] text-white rounded hover:bg-opacity-90"
//             >
//               Add Quantity
//             </button>
//             <button
//               onClick={()=>{addOperator()}}
//               className="px-4 py-2 bg-[#21B6F8] text-white rounded hover:bg-opacity-90"
//             >
//               Add operator
//             </button>
          

//             <div className="mt-4 p-3 bg-[#111111] rounded">
//               <p className="text-gray-300">Formula Preview:</p>
//               <div className="mt-2 font-mono text-white">
//                 {formula.map((q)=>{
//                   return(" "+q.symbol+" ")
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     if (questionType === "MCQs") {
//       return (
//         <div className="space-y-4 ml-6">
//           <span className="text-white mr-1">
//             Which Type Of Ans You Want to Upload ?
//           </span>
//           <select
//             value={choiceType}
//             onChange={handleSelectionChange}
//             className="bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
//           >
//             <option value="text">Text Based</option>
//             <option value="image">Image Based</option>
//           </select>
//           {choices.map((choice) => (
//             <div key={choice.id} className="flex  gap-3">
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox" // Changed from radio to checkbox
//                   name="answer"
//                   checked={selectedAnswers.includes(choice.id)}
//                   onChange={() => handleImageAnswerSelect(choice.id)}
//                   className="w-4 h-4 text-[#21B6F8] bg-transparent border-gray-600 focus:ring-[#21B6F8]"
//                 />
//               </div>
//               {choiceType === "text" ? (
//                 <input
//                   type="text"
//                   value={choice.text}
//                   onChange={(e) =>
//                     handleChoiceChange(choice.id, e.target.value)
//                   }
//                   placeholder="Your Choice here"
//                   className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
//                 />
//               ) :(
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleChoiceImageUpload(e, choice.id)}
//                   style={{ display: "none" }}
//                   id={`image-upload-${choice.id}`}
//                 />
//               )}
//               {choiceType === "image" && (
//                 <label
//                   htmlFor={`image-upload-${choice.id}`}
//                   className="text-[#21B6F8] text-sm hover:underline cursor-pointer"
//                 >
//                   Add Image
//                 </label>
//               )}
//               {choice.imageUrl && (
//                 <div className="relative">
//                   <img
//                     src={choice.imageUrl}
//                     alt={`Choice ${choice.id}`}
//                     className="max-w-full h-20 w-20 object-cover"
//                   />
//                   <button
//                     onClick={() => {
//                       const updatedChoices = choices.map((c) =>
//                         c.id === choice.id ? { ...c, imageUrl: "" } : c
//                       );
//                       setChoices(updatedChoices);
//                       const updatedImageUrls = updatedChoices.map(
//                         (c) => c.imageUrl || ""
//                       );
//                       setImageUrls(updatedImageUrls);
//                       setQuestionData({
//                         ...questionData,
//                         resource: updatedImageUrls,
//                       });
//                     }}
//                     className="absolute -top-3 right-0 text-red-500 rounded-full p-1"
//                     title="Remove Image"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//           {/* {choiceType} */}
//           {choices.length < 4 && (
//             <button
//               onClick={addChoice}
//               className="text-[#21B6F8] text-sm hover:underline"
//             >
//               Add Choice
//             </button>
//           )}
//         </div>
//       );
//     }

//     if (questionType === "Fill in the blank") {
//       return (
//         <div className="space-y-4">
//       <div className="flex items-start gap-2">
//         <span className="text-white">1.</span>
//         <div className="flex-1 space-y-4">
//           <div className="relative">
//             <textarea
//               placeholder="Start your question here"
//               value={questionData.question}
//               onChange={(e) =>
//                 setQuestionData({
//                   ...questionData,
//                   question: e.target.value,
//                 })
//               }
//               className="w-full bg-transparent text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-[#21B6F8] min-h-[100px] resize-none"
//             />
//             <button
//               onClick={() => {
//                 const textarea = document.querySelector("textarea");
//                 const cursorPosition = textarea?.selectionStart || 0;
//                 const currentText = questionData.question;
//                 const newText = `${currentText.slice(
//                   0,
//                   cursorPosition
//                 )} _____ ${currentText.slice(cursorPosition)}`;
//                 setQuestionData({ ...questionData, question: newText });
//               }}
//               className="absolute bottom-2 right-2 text-[#21B6F8] text-sm hover:underline"
//               type="button"
//             >
//               Add Blank
//             </button>
//           </div>
//           <div className="space-y-3">
//             {choices.map((choice) => (
//               <div key={choice.id} className="flex items-center gap-3">
//                 <input
//                   type="checkbox" // Changed from radio to checkbox
//                   name="answer"
//                   checked={selectedAnswers.includes(choice.id)}
//                   onChange={() => {
//                     setSelectedAnswers((prev) =>
//                       prev.includes(choice.id)
//                         ? prev.filter((id) => id !== choice.id)
//                         : [...prev, choice.id]
//                     );
//                   }}
//                   className="w-4 h-4 text-[#21B6F8] bg-transparent border-gray-600 focus:ring-[#21B6F8]"
//                 />
//                 <input
//                   type="text"
//                   value={choice.text}
//                   onChange={(e) =>
//                     handleChoiceChange(choice.id, e.target.value)
//                   }
//                   placeholder="Your Option here"
//                   className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
//                 />
//               </div>
//             ))}
//             {choices.length < 4 && (
//               <button
//                 onClick={addChoice}
//                 className="text-[#21B6F8] text-sm hover:underline"
//               >
//                 Add Option
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//       );
//     }

//     return null;
//   };