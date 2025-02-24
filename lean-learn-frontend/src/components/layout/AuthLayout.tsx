import Footer from "./Footer";
import Navbar from "./Navbar";
import React from 'react'


const AuthLayout = ({ children }: { children: React.ReactNode }) => (
    <>
        <Navbar />
        <div className="min-h-[calc(100vh-64px)]">{children}</div>
        <Footer />
    </>
);

export default AuthLayout
