import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formulaQuestionApi } from "../../lib/api/questions";
import SideBar from "../ui/SideBar";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { convertToLatex } from "./LatexConverter";
import { CommonQty } from '../../../../lib/interfaces/utilsInteface'
import { Choice } from "../../../../lib/interfaces/addquestion";
import { quantitiesApi } from "@/lib/api/utils";


const AddQuestion: React.FC = () => {
  const navigate = useNavigate();
  const [questionType, setQuestionType] = useState<
    "MCQs" | "Fill in the blank" | "True/False" | "Create Formula"
  >("MCQs");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [choiceType, setChoiceType] = useState("text");
  const [questionData, setQuestionData] = useState({
    question: "",
    topic: "gravitation",
    class_: "8",
    subject: "Physics",
    options: ["", ""],
    answers: [""],
    resource: [""],
    used: true,
  });
  const [choices, setChoices] = useState<Choice[]>(() => {
    const savedChoices = localStorage.getItem("choices");
    console.log(savedChoices)
    return savedChoices
      ? JSON.parse(savedChoices)
      : [
          { id: 1, text: "", imageUrl: "" },
          { id: 2, text: "", imageUrl: "" },
        ];
  });

 
  useEffect(() => {
    localStorage.setItem("choices", JSON.stringify(choices));
  }, [choices]);
  const [isRandomized, setIsRandomized] = useState(false);
  const [quantities, setQuantities] = useState<
    {
      name: string;
      symbol: string|"";
      value?: number;
      isUnknown?: boolean;
    }[]
  >([]);
  const [operators,setOperators] = useState<
  {
    name: string;
    symbol: string;
  }[]
>([])
const [formula, setFormula]=useState<{
  name: string;
  symbol: string;
}[]>([])
  const [addnew, setAddNew] = useState(false);
  const [qname,setQname]=useState("");
  const [qsymbol,setQsymbol]=useState("");
  const [commonQuantities,setCommonq] = useState<CommonQty[]>([]);

  const commonOperators = {Addition:"+",Subtraction: "-",Multiplication: "X",Division: "/",Equals: "=",
    "Left Paranthesis":"(","Right Paranthesis": ")"};

  const classes = [
    { value: "8", label: "Class 8" },
    { value: "9", label: "Class 9" },
    { value: "10", label: "Class 10" },
    { value: "11", label: "Class 11" },
    { value: "12", label: "Class 12" },
  ];

  const topics = [
    { value: "gravitation", label: "Gravitation" },
    { value: "motion", label: "Motion" },
    {
      value: "forceandnewton'slawsofmotion",
      label: "Force and Newton's laws of motion",
    },
    { value: "Workenergyandpower", label: "Work, Energy and Power" },
    // { value: "topic5", label: "Topic 5" },
  ];

  useEffect(() => {
    localStorage.removeItem("choices");
  }, [questionType]);
  


   useEffect(() => {
     
 
       fetchQuantities();
   }, []);
  
    // Update formula at the correct position (odd index)
    const newFormula = [...formula];
    const formulaIndex = index * 2 + 1; // Ensuring operators go to odd indices
    newFormula[formulaIndex] = {
      name: operatorName,
      symbol: symbol,
    };
  
    setOperators(newOperators);
    setFormula(newFormula);}
  ;
  
  
  // console.log(formula)






  return (
    <>
    
    <div className={`${addnew?"z-10 absolute w-full h-full flex justify-center fade-in-5 items-center bg-black/50 text-white":"hidden"}`}>
    <div className="bg-[#111111] rounded-lg p-6 w-1/2 h-1/2 flex flex-col justify-evenly">
    <div className="flex justify-between items-center"><div><h3 className="text-xl ">Add a new quantity</h3></div><button onClick={()=>{setAddNew(false)}} className="bg-white text-black rounded-full  p-2 w-10 h-10">X</button></div>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
      <label className="text-white text-md ">Name of the Quantity
   <div><input
                  type="text"
                  // value={choice.text}
                  onChange={(e) =>{setQname(e.target.value)}
                    // handleChoiceChange(choice.id, e.target.value)
                  }
                  placeholder="Your Choice here"
                  className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
                /></div> </label></div>
               
      <div className="flex flex-col gap-4">
      <label className="text-white text-md ">Symbol of the Quantity
   <div><input
                  type="text"
                  // value={choice.text}
                  onChange={(e) =>{setQsymbol(e.target.value)}
                    // handleChoiceChange(choice.id, e.target.value)
                  }
                  placeholder="Your Choice here"
                  className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
                /></div> </label></div>
                </div>
                <div className="flex justify-end mt-6 sm:mb-10">
              <button
                onClick={handleSubmit}
                className="bg-[#21B6F8] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                disabled={isLoading} // Disable the submit button while the question is being saved
              >
                {isLoading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </div>
                ) : (
                  "Save Quantity"
                )}
              </button>
            </div>
    </div>
    </div>
      <div className="flex min-h-screen bg-black">
<SideBar/>
        <div className="flex-1 flex  main-content-wrap page-content-quiz">
          <div className="flex-1 p-2 md:p-6 pb-4">
            <div className="bg-[#111111] rounded-lg p-6">
              <div className="mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-white">1.</span>
                  <textarea
                    placeholder="Your question here"
                    value={questionData.question}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        question: e.target.value,
                      })
                    }
                    className="w-full bg-transparent text-white border-none focus:outline-none text-lg resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {renderQuestionContent()}
            </div>

            <div className="flex justify-end mt-6 sm:mb-10">
              <button
                onClick={handleSubmit}
                className="bg-[#21B6F8] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                disabled={isLoading} // Disable the submit button while the question is being saved
              >
                {isLoading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </div>
                ) : (
                  "Save Question"
                )}
              </button>
            </div>
          </div>

          <div className="w-full md:w-80 bg-black border-l border-gray-800 p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-white text-sm">Select Class</label>
              <select
                value={questionData.class_}
                onChange={(e) =>
                  setQuestionData({ ...questionData, class_: e.target.value })
                }
                className="w-full bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
              >
                {classes.map((classOption) => (
                  <option key={classOption.value} value={classOption.value}>
                    {classOption.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Select Topic</label>
              <select
                value={questionData.topic}
                onChange={(e) =>
                  setQuestionData({ ...questionData, topic: e.target.value })
                }
                className="w-full bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
              >
                {topics.map((topic) => (
                  <option key={topic.value} value={topic.value}>
                    {topic.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Question Type</label>
              <select
                value={questionType}
                onChange={(e) =>
                  setQuestionType(
                    e.target.value as
                      | "MCQs"
                      | "Fill in the blank"
                      | "True/False"
                      | "Create Formula"
                  )
                }
                className="w-full bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
              >
                <option value="MCQs">MCQs</option>
                <option value="Fill in the blank">Fill in the blank</option>
                <option value="True/False">True/False</option>
                <option value="Create Formula">Create Formula</option>
              </select>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Settings</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Randomize</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isRandomized}
                      onChange={(e) => setIsRandomized(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#21B6F8]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddQuestion;
