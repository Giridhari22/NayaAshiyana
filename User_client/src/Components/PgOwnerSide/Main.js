import React from 'react'
import Intro from './Intro'
import Step1 from './Step1'
import Step2 from './Step2'
import Footer from '../ClientSide/LandingPage/Footer'

function Main() {
  return (
    <div>
        <Intro />
        <Step1 />
        <Step2 />
        <Footer />
    </div>
  )
}

export default Main