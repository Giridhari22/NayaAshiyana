import React from 'react'
// import CountrySelect from './searchBox'
import SearchMain from '../search/SearchMain'

function SearchBar() {
    return (
        <section id="get-started" class="padd-section text-center">

            <div class="container" data-aos="fade-up">
                <div class="section-title text-center ">
                    <h1 style={{color: "#71c55d"}}>Find Your Ashiyana </h1>
                    <SearchMain />
                </div>
            </div>

            <div class="container">
                <h1 style={{color: "#71c55d"}}>How it works</h1>
                <br />
                <h6>Our process is simple and very different from those of others in this industry. The search process is streamlined by the locality or landmark of your choice.<br /> This allows you to find the right hostel or room. You can choose the subscription plan that best suits your needs.</h6>
                <br />
                <br />

                <div class="row">

                    <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="100">
                        <div class="feature-block">
                            <img src="assets/img/svg/SEARCH _ICON.jpeg" alt="img" />
                            <h4>Search</h4>
                            <p>Fill the search fields like your locality,or city,boys pg or girls pg</p>
                            <a href="#">read more</a>

                        </div>
                    </div>

                    <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="200">
                        <div class="feature-block">

                            <img src="assets/img/svg/payment.png" alt="img" />
                            <h4>Make Payment</h4>
                            <p>Select your PG Rental Home,Sharing Type and make payment Online.</p>
                            <a href="#">read more</a>

                        </div>
                    </div>

                    <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="300">
                        <div class="feature-block">

                            <img src="assets/img/svg/booking.png" alt="img" />
                            <h4>Booking Confirmation</h4>
                            <p>Your subscription and booking date confirmed.</p>
                            <a href="#">read more</a>

                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default SearchBar