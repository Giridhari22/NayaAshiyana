import React from 'react'
import "./Intro.css"

function Step2() {
  return (
    <div>
         <section id="get-started" class="padd-section text-center background-radial-gradient1 " style={{}}>

<div class="container">
    <h1 style={{color: "#71c55d"}}>How It Works?</h1>
    <br />
    <h6 style={{color: "#fff"}}>Selling/renting property is no more a challenge with Square Yards. Renting / Selling a house has become easy with the internet and easier with us! We will handle the process of selling your property from start to finish. Follow these steps to begin your home selling journey.</h6>
    <br />
    <br />

    <div class="row">

        <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="100">
            <div class="feature-block" style={{borderRadius:"20px"}}>
                <img src="assets/img/svg/Subscription.png" alt="img" />
                <h5 style={{color: "#71c55d"}}>choose your Subscription</h5>
                <p  style={{fontSize:"16px", textTransform:"capitalize"}} class=" opacity-10  ls-tight"> you have to select the Subscription , and there is various Subscription which allows you to  get maximum no of customer </p>
            </div>
        </div>

        <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="200">
            <div class="feature-block" style={{borderRadius:"20px"}}>

                <img src="assets/img/svg/money.jpg" alt="img" />
                <h5 style={{color: "#71c55d"}}> See All Clients Information</h5>
                <p style={{fontSize:"16px", textTransform:"capitalize"}} class=" opacity-10  ls-tight">Go To Dashboard and Fetch all the information related to the customer Side , no of customer , no of property on rent , Your reach</p>
               

            </div>
        </div>

        <div class="col-md-6 col-lg-4" data-aos="zoom-in" data-aos-delay="300" >
            <div class="feature-block" style={{borderRadius:"20px"}}>

                <img src="assets/img/svg/negotiation.svg" alt="img" />
                <h5 style={{color: "#71c55d"}}>Earn Benifits</h5>
                <p style={{fontSize:"16px" , textTransform:"capitalize"}} class=" opacity-10  ls-tight">by posting your property on NayaAshiyana , Generate the revenue 2x time from any other website and there is no any middleman b/w you</p>
               

            </div>
        </div>

    </div>
</div>

</section>
    </div>
  )
}

export default Step2