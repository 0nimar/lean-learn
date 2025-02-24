import React from 'react'
import HeroSection from '../components/ui/home/HeroSection'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import ComingSoon from '../components/ui/home/ComingSoon'
import WhySection from '../components/ui/home/WhySection'

function HomePage() {
  return (
    <div>
        <Navbar />
    <HeroSection />
    <WhySection />
    <ComingSoon />
    <Footer />
    </div>
  )
}

export default HomePage