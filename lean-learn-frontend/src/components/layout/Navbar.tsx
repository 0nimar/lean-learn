import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import Button from "./Button";
// import { handleRegister, handleSignin } from "../../lib/function/auth";
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuth = () => {
    navigate("/auth");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-12 py-4 bg-black">
        <div className="w-full flex justify-between items-center sm:w-auto">
          <button
            className="sm:hidden p-2 text-white absolute left-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div
            onClick={handleLogoClick}
            className="flex items-center mx-auto sm:mx-0 cursor-pointer"
          >
            <img
              src={Logo}
              alt="LeanLearn Logo"
              className="h-8 sm:h-10 md:h-12"
            />
          </div>

          <div className="w-6 sm:hidden"></div>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex flex-col items-center justify-center gap-6">
            <button
              className="absolute top-4 left-4 p-2 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img src={Logo} alt="LeanLearn Logo" className="h-8 mb-8" />

            <div className="flex flex-col items-center gap-4">
              <Button variant="secondary" handleClick={handleAuth} loading={false} className="w-[218px] h-[51px]">Sign in</Button>
              <Button variant="secondary" handleClick={handleAuth} loading={false} className="w-[218px] h-[51px]">Sign in</Button>
            </div>
          </div>
        )}

        <div className="sm:flex items-center gap-4">
        <Button variant="primary" handleClick={handleAuth} loading={false} className="w-[218px] h-[51px]">Sign in</Button>
        <Button variant="secondary" handleClick={handleAuth} loading={false} className="w-[218px] h-[51px]">Register</Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
