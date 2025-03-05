import React from 'react';
import { BrowserRouter } from "react-router-dom";
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tech from './components/Tech';
import Works from './components/Works';

// import {About,Contact} from "./components";
function App() {
  return (
    <>
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar/>
          <Hero/>
        </div>
        <About />
       
        <Tech />
        <Works />
        
        <div className='relative z-0'>
          <Contact />
          
        </div>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App;
