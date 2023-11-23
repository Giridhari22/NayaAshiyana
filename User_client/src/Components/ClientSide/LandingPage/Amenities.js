import React from 'react'
// import CountrySelect from './searchBox'
import SearchMain from '../search/SearchMain'



function Amenities() {
    return (
        <section id="get-started" class="padd-section text-center">

            <div class="container">
                <h3 style={{ color: "#71c55d" }}>Amenities List</h3>
                <br />
                <h6>We provide all the amenities, some amenities are surely available for all our service places. Some of the items only you may get by request, Because that type of amenities are not mandatory.</h6>
                <br />
                <br />

                <div class="row">
                    <div class="col-md-8 col-lg-4" data-aos="zoom-in" data-aos-delay="100">
                        <div class="feature-block" style={{margin:"5px" , borderRadius:"15px", boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                            <div className="row">
                                <div class="col-md-2">
                                    <img src="assets/img/air condition.png" alt="img" />
                                </div>
                                <div class="col-md-10">
                                    <h3 style={{ color: "#71c55d" }}>Air Condition</h3>
                                    <p style={{ color: "#000", fontSize: "13px", fontWeight: "700" }}>On Your Demand</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-lg-4" data-aos="zoom-in" data-aos-delay="100">
                        <div class="feature-block" style={{margin:"5px" , borderRadius:"15px", boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                            <div className="row">
                                <div class="col-md-2">
                                    <img src="assets/img/balcony.jpeg" alt="img" />
                                </div>
                                <div class="col-md-10">
                                    <h3 style={{ color: "#71c55d" }}>Balcony</h3>
                                    <p style={{ color: "#000", fontSize: "13px", fontWeight: "700" }}>Surely Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-lg-4" data-aos="zoom-in" data-aos-delay="100">
                        <div class="feature-block" style={{margin:"5px" , borderRadius:"15px", boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}} >
                            <div className="row">
                                <div class="col-md-2">
                                    <img src="assets/img/Extra Bed.jpeg" alt="img" />
                                </div>
                                <div class="col-md-10">
                                    <h3 style={{ color: "#71c55d" }}>Extra Bed</h3>
                                    <p style={{ color: "#000", fontSize: "13px", fontWeight: "700" }}>On Your Demand</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-lg-4" data-aos="zoom-in" data-aos-delay="100">
                        <div class="feature-block" style={{margin:"5px" , borderRadius:"15px", boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                            <div className="row">
                                <div class="col-md-2">
                                    <img src="assets/img/TV.jpeg" alt="img" />
                                </div>
                                <div class="col-md-10">
                                    <h3 style={{ color: "#71c55d" }}>Flat TV</h3>
                                    <p style={{ color: "#000", fontSize: "13px", fontWeight: "700" }}>Surely Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 col-lg-4" data-aos="zoom-in" data-aos-delay="100">
                        <div class="feature-block" style={{margin:"5px" , borderRadius:"15px", boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                            <div className="row">
                                <div class="col-md-2">
                                    <img src="assets/img/hot and cold.png" alt="img" />
                                </div>
                                <div class="col-md-10">
                                    <h3 style={{ color: "#71c55d" }}>Hot & Cold Water</h3>
                                    <p style={{ color: "#000", fontSize: "13px", fontWeight: "700" }}>Surely Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8  col-lg-4" data-aos="zoom-in" data-aos-delay="100">
                        <div class="feature-block" style={{hover:"", margin:"5px" , borderRadius:"15px", boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
                            <div className="row">
                                <div class="col-md-2">
                                    <img src="assets/img/WiFi.png" alt="img" />
                                </div>
                                <div class="col-md-10">
                                    <h3 style={{ color: "#71c55d" }}>WiFi</h3>
                                    <p style={{ color: "#000", fontSize: "13px", fontWeight: "700" }}>Surely Available.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Amenities