import React from 'react'
import Navbar from './Navbar'
import IntroPage from './IntroPage'
import SearchBar from './SearchBar'
import Features from './Features'
import Team from './Team'
import Price from './Price'
import Contact from './Contact'
import Footer from './Footer'
import Amenities from './Amenities'

function Home() {
  return (
    <div>
      <Navbar />
      <IntroPage />
      <SearchBar />
      <Features />
      <Amenities />
      <Team />
      <Price />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home