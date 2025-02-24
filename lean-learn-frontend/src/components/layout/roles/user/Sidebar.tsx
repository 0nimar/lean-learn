import React from 'react'
import logo from '../../../assets/images/Logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar({ children }:{ children: React.ReactNode}) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location?.state?.user || null; 
  return (
    <div>
          <div className="w-full lg:w-[280px] bg-[#101010] p-5 lg:min-h-full ">
        <img
          src={logo}
          alt="LeanLearn Logo"
          className="w-[120px] cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      {user && ( 
        <div className="absolute top-8 right-8">
          {/* <ProfileIcon /> */}
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  )
}

export default Sidebar


// #############reference code#################3
{/* <div className="lg:w-[280px] w-full bg-[#101010] p-5 flex flex-col min-h-0 md:h-screen overflow-hidden">
<div className="flex items-center justify-start lg:justify-center gap-2 mb-4 md:mt-8">
  <button onClick={() => navigate("/")} className="flex items-start">
    <img src={logo} alt="LeanLearn Logo" className="w-[120px]" />
  </button>
</div>

{loadingCompanionMessage && (
  <p className="text-gray-300 leading-relaxed text-sm tracking-wide loading text-center mt-11">
    Loading Explanation...
  </p>
)}

<div
  className={`flex ${
    companionMessage && "flex-row-reverse"
  } lg:flex-col min-h-0 md:flex-grow overflow-hidden  md:justify-between`}
>
  {companionMessage ? (
    <>
      <div 
        className={`border-2 ${borderColor} relative rounded-lg p-2 lg:p-6 mb-4 max-h-[20vh] lg:max-h-[50vh] custom-scrollbar overflow-y-auto`}
        style={
          {
            "--scrollbar-width": "1px",
            "--scrollbar-thumb-color": "rgba(255, 255, 255, 0.2)",
            "--scrollbar-track-color": "rgba(0, 0, 0, 0.2)",
          } as React.CSSProperties
        }
      >
       {/* <div className={`absolute block md:hidden bottom-0 -left-[12px] top-[117px] w-6 h-6   ${borderColor}  bg-[#101113] border-l-2 border-b-2  rotate-45 transform translate-y-3`}></div> */}
      //   <div className="space-y-4 re">
      //     {companionMessage.split(".").map((sentence, index) => {
      //       const trimmedSentence = sentence.trim();
      //       if (trimmedSentence) {
      //         return (
      //           <p
      //             key={index}
      //             className="text-gray-300 leading-relaxed text-sm tracking-wide"
      //           >
      //             {trimmedSentence}.
      //           </p>
      //         );
      //       }
      //       return null;
      //     })}
      //   </div>
     
      // </div>

//       {selectedCompanion && (
//         <div className="mt-4 md:mt-0 flex-shrink-0 flex items-end lg:justify-center">
//           <img
//             src={
//               companionImages[
//                 selectedCompanion as keyof typeof companionImages
//               ]
//             }
//             alt="Selected Companion"
//             className="md:w-full h-[180px] lg:h-auto object-contain md:max-h-[300px]"
//           />
//         </div>
//       )}
//     </>
//   ) : (
//     selectedCompanion && (
//       <div className="flex-shrink-0 flex lg:justify-center md:mt-auto">
//         <img
//           src={
//             companionImages[
//               selectedCompanion as keyof typeof companionImages
//             ]
//           }
//           alt="Selected Companion"
//           className="md:w-full h-[180px] object-contain lg:h-auto md:max-h-[300px]"
//         />
//       </div>
//     )
//   )}
// </div>
// </div>