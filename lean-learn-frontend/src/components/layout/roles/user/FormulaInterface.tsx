import React from "react"
import { FormulaQuestion } from "../../../../lib/interfaces/quizInterface";

const FormulaInterface = ({question}:
{question: FormulaQuestion}) => {
    // const filteredQuantities = commonq.filter(qty => 
    //   !question.quantities.some(questionQty => 
    //     questionQty.name === qty.qty_name
    //   )
    // );
    
    // Then get random quantities from the filtered array
    // const getRandomQuantities = (arr:Array<CommonQty>, min:number, max:number) => {
    //   const numItems = Math.floor(Math.random() * (max - min + 1)) + min;
    //   return [...arr]
    //     .sort(() => Math.random() - 0.5)
    //     .slice(0, numItems);
    // };
    
    // Get 2-3 random quantities from filtered array
    // const randomQuantities = getRandomQuantities(filteredQuantities, 2, 3);
    
    return(
      <div className="space-y-6">
        <div className="bg-[#111111] p-6 rounded-lg">
          <div className="mb-6 p-4 bg-[#1A1A1A] rounded-lg min-h-[60px] flex items-center">
            {/* <div className="flex flex-wrap gap-2">
              {formulaSequence.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded bg-[#00A3FF] text-white"
                >
                  {item.value}
                </span>
              ))}
            </div> */}
          </div>

          <div className="mb-6">
            <h3 className="text-white text-sm mb-3">Available Terms</h3>
            {/* <div className="flex flex-wrap gap-2">
              {question.quantities.map((word, index) => (
               <button
               key={index}
               disabled={disabledSymbols.has(word.name)}
               onClick={() => {
                 handleFormulaSelect("word", word.name);
               }}
               className={`px-4 py-2 rounded ${
                 disabledSymbols.has(word.name) 
                   ? 'hidden' 
                   : 'bg-[#1A1A1A] hover:bg-[#00A3FF]'
               } text-white transition-colors`}
             >
               {word.name}
             </button>
              ))}
              {randomQuantities.map((word, index) => (
               <button
               key={index}
               disabled={disabledSymbols.has(word.qty_name)}
               onClick={() => {
                 handleFormulaSelect("word", word.qty_name);
               }}
               className={`px-4 py-2 rounded ${
                 disabledSymbols.has(word.qty_name) 
                   ? 'hidden' 
                   : 'bg-[#1A1A1A] hover:bg-[#00A3FF]'
               } text-white transition-colors`}
             >
               {word.qty_name}
             </button>
              ))}
            </div> */}
          </div>

          <div className="mb-6">
            <h3 className="text-white text-sm mb-3">Operators</h3>
            <div className="flex flex-wrap gap-2">
              {/* {operators.map((op) => (
                <button
                  key={op}
                  onClick={() => handleFormulaSelect("operator", op)}
                  className="px-4 py-2 rounded bg-[#1A1A1A] text-white hover:bg-[#00A3FF] transition-colors"
                >
                  {op}
                </button>
              ))}
            </div> */}
          </div>

          <div className="flex gap-3">
            <button
            //   onClick={handleFormulaUndo}
            //   disabled={formulaSequence.length === 0}
              className="px-4 py-2 rounded bg-[#101113] text-white hover:bg-[#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Undo Last
            </button>
            {/* <button
              onClick={handleFormulaClear}
              disabled={formulaSequence.length === 0}
              className="px-4 py-2 rounded bg-[#101113] text-white hover:bg-[#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear All
            </button> */}
          </div>
        </div>
      </div>
      </div>
    );
  };

  export default FormulaInterface;