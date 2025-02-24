import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateQuiz: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState("Class 6");
  const [selectedTopic, setSelectedTopic] = useState("Topic 1");
  const navigate = useNavigate();
  return (
    <>
      <div className="flex min-h-screen bg-black">
     
        <div className="flex-1 p-5 page-content-quiz  md:p-16">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16">
              <h1 className="text-white text-2xl mb-2">Hello There!</h1>
              <p className="text-[#8C8C8C]">
                Let's Create an Engaging Quiz for Your Students!
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <label className="block text-white mb-4">
                  Choose the class you're creating this quiz for.
                </label>
                <div className="relative">
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full bg-[#111111] text-white px-4 py-3 rounded-lg focus:outline-none appearance-none border border-[#1A1A1A]"
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1}>Class {i + 1}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path
                        d="M1 1L6 6L11 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white mb-4">
                  Select the topic you'd like to create questions for.
                </label>
                <div className="relative">
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full bg-[#111111] text-white px-4 py-3 rounded-lg focus:outline-none appearance-none border border-[#1A1A1A]"
                  >
                    <option>Topic 1</option>
                    <option>Topic 2</option>
                    <option>Topic 3</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path
                        d="M1 1L6 6L11 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => navigate("/create-quiz/questions")}
                  className="flex items-center gap-2 bg-[#21B6F8] hover:bg-[#1CA1E3] text-black px-6 py-2 rounded-lg transition-colors"
                >
                  Continue
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M3 8h10M13 8L9 4M13 8L9 12"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateQuiz;
