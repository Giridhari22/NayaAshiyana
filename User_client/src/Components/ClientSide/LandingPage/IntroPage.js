import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useNavigate } from 'react-router-dom';


function IntroPage() {
const navigate = useNavigate()
    AOS.init();
    
    // const handleShowPg = ()=>{
    // navigate("/ProductFilter")
    // }

    return (
        <section id="hero">
            <div class="hero-container" data-aos="fade-in">
                <br />
                <h1>Welcome to NayaAshiyana</h1>
                <br />              
                <h2>There is nothing more important than a good, safe, secure Ashiyana &amp; more...</h2>
                
                <h2>Home is any four walls that enclose the right person </h2>

                <img src="assets/img/Home.jpeg" alt="Hero Imgs" data-aos="zoom-out" data-aos-delay="100" style={{width:"30%"}}/>
                <a href="#get-started" class="btn-get-started scrollto">Get Started</a>
                <div class="btns">
                    <a href="#"><i class="fa fa-apple fa-3x"></i> Find Mess</a>
                    <a ><i class="fa fa-play fa-3x"></i> Find pg</a>
                    <a href="#"><i class="fa fa-windows fa-3x"></i> NayaAshiyana</a>
                </div>
            </div>
        </section>
    )
}

export default IntroPage