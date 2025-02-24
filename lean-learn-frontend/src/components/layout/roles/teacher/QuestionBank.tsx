import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionBank: React.FC = () => {

  const navigate = useNavigate();
  const classes = [
    { id: 1, name: "Class 1", questionCount: 0 },

    { id: 2, name: "Class 2", questionCount: 0 },
    { id: 3, name: "Class 3", questionCount: 0 },

    { id: 4, name: "Class 4", questionCount: 0 },

    { id: 5, name: "Class 5", questionCount: 0 },

    { id: 6, name: "Class 6", questionCount: 0 },
    { id: 7, name: "Class 7", questionCount: 0 },

    { id: 8, name: "Class 8", questionCount: 0 },
    { id: 9, name: "Class 9", questionCount: 0 },
    { id: 10, name: "Class 10", questionCount: 0 },
    { id: 11, name: "Class 11", questionCount: 0 },
    { id: 12, name: "Class 12", questionCount: 0 },
  ];
  const handleClassSelect = (classId: number) => {
    localStorage.removeItem("imageUrls");
    navigate(`/teacher/question-bank/class/${classId}`);
  };

  return (
    <>
      
      <div className="flex min-h-screen bg-black">
        <div className="flex-1 p-8 page-content-quiz">
          <h1 className="text-white text-2xl font-normal mb-6 max-w-2xl mx-auto">
            Select Class
          </h1>

          <div className="space-y-2 max-w-2xl mx-auto">
            {
              classes.map((classData) => (
                <div
                  key={classData.id}
                  onClick={() => handleClassSelect(classData.id)}
                  className="bg-[#111111] rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-opacity-70 group"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 4h16M2 10h16M2 16h16"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-white">Class {classData.id}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">
                      {0}{" "}
                      questions
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="text-gray-400 group-hover:text-[#21B6F8] transition-colors"
                    >
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionBank;
