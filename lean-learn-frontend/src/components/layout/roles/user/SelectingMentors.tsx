import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/images/Logo.png';
import einstein from '../../../../assets/animations/Einstein.gif';
import newton from '../../../../assets/animations/Newton.gif';
import galileo from '../../../../assets/animations/Galileo.gif';
import raman from '../../../../assets/animations/CV Raman.gif';
import { playCommonSound } from '../../../../lib/function/sound';
import ProfileIcon from '../../ProfilePage';
// import ProfileIcon from '../auth/ProfilePage';

const SelectingMentors: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location?.state?.user || null; 


  const companions = [
    { id: 1, name: 'Prof Einstein', gif: einstein },
    { id: 2, name: 'Prof Newton', gif: newton },
    { id: 3, name: 'Prof Galileo', gif: galileo },
    { id: 4, name: 'Prof Raman', gif: raman }
  ];

  const handleCompanionSelect = (companionId: number): void => {
    playCommonSound();
    localStorage.setItem('selectedCompanion', companionId.toString());
    navigate('/quiz-page');
  };
  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:flex lg:flex-col relative lg:w-[280px] bg-[#101010] p-5 lg:min-h-full ">
        <img
          src={logo}
          alt="LeanLearn Logo"
          className="w-[120px] cursor-pointer"
          onClick={() => navigate('/')}
        />
          {user && ( 
        <div className="absolute top-8 right-8 lg:bottom-8 lg:right-0 ">
          <ProfileIcon />
        </div>
      )}
      </div>

    
      <div className="flex-1 bg-black p-4 lg:p-8">
        <div className="pt-8 lg:pt-24 pb-8 lg:pb-16 px-4 lg:pl-12">
          <h1 className="text-white font-nunito text-[28px] lg:text-[32px] font-bold leading-[36px] lg:leading-[40px] mb-1">
            Hello There!
          </h1> 
          <p className="text-white font-nunito text-[20px] lg:text-[28px] font-normal leading-[28px] lg:leading-[36px]">
            Let's make learning fun! Are you ready to ace this?
          </p>        
        </div>

        <div className="mt-4 mb-6 px-4 lg:pl-12">
          <p className="text-white font-nunito text-[20px] lg:text-[24px] font-normal">
            Choose your learning companion!
          </p>
        </div>

        <div className="px-4 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 w-full max-w-[1200px]">
            {companions.map((companion) => (
              <div
                key={companion.id}
                onClick={() => handleCompanionSelect(companion.id)}
                className="bg-[#101010] rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center h-[100px] lg:h-[120px] mb-3">
                <img
                    src={companion.gif}
                    alt={companion.name}
                    className="h-full object-contain"
                  />
                </div>
                <p className="text-white text-center text-sm">{companion.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectingMentors;