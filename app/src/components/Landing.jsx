import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import FeatureSection from './FeaturesSection'
function Landing() {
  return (
    <div className="min-h-screen">
        <HeroSection />
        <FeatureSection />
      </div>
  )
}

export default Landing