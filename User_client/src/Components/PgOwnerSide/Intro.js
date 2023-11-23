import React, { useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Intro.css"
import { useNavigate } from 'react-router-dom';

import OwnerLogin from './OwnerLogin';
import RegisterOwner from './RegisterOwner';


function Intro() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('login');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    AOS.init();

    // const handleShowPg = ()=>{
    // navigate("/ProductFilter")
    // }


    return (
    

        <section class="background-radial-gradient  maindiv overflow-hidden" style={{}} >

            <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5" data-aos="fade-in">
                <div class="row gx-lg-5 align-items-center mb-5">
                    <div class="col-lg-6 bg-glass1 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                        <h1 class="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                            Post Your  Property <br />
                            <span style={{ color: "hsl(218, 81%, 75%)" }}>  Or Mess</span>
                        </h1>
                        <p class="mb-4 opacity-10 fw-bold ls-tight" style={{ color: "white" }}>
                            Owning a home is a keystone of wealth… both financial affluence and emotional security.” “The house you looked at today and wanted to think about until tomorrow may be the same house someone looked at yesterday and will buy today
                        </p>
                                <a onClick={()=>{navigate("/Form1")}}>form</a>


                    </div>

                    <div class="col-md-6 mb-2 mb-lg-0 position-relative">
                        <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong" style={{ marginLeft: "200px" }}>  </div>
                        <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>


                        <div className="card bg-glass " data-aos="fade-in" style={{ maxWidth: "500px", marginLeft: "200px" }}>
                            <div className="card-body px-4 py-5 px-md-6" >

                                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className={`nav-link ${activeTab === 'login' ? 'active' : ''} btn btn-success`}
                                            onClick={() => handleTabChange('login')}
                                            
                                        >
                                            Login
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className={`nav-link ${activeTab === 'register' ? 'active' : ''} btn btn-danger`}
                                            onClick={() => handleTabChange('register')}
                                        >
                                            Register
                                        </a>
                                    </li>
                                </ul>


                                <div className="tab-content">
                                    <div
                                        className={`tab-pane fade show ${activeTab === 'login' ? 'active' : ''}`}
                                        id="pills-login"
                                        role="tabpanel"
                                    >

                                       <OwnerLogin />
                                    </div>
                                    <div
                                        className={`tab-pane fade show ${activeTab === 'register' ? 'active' : ''}`}
                                        id="pills-register"
                                        role="tabpanel"
                                    >
                                            <RegisterOwner />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Intro