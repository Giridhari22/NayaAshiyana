import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Form from './components/paytm/Form'
import Home from "./Components/ClientSide/LandingPage/Home"
import NearbySearch from "./Components/ClientSide/search/NearbySearch"
// import PropertyListing from "./Components/ClientSide/LandingPage/"

import SignupUser from "./Components/ClientSide/User/SignupUser"
import Login from "./Components/ClientSide/User/SigninUser"
import SendOtp from "./Components/ClientSide/User/SendOtp"
import ShortListed from "./Components/ClientSide/LandingPage/ShortListed"
import ProductFilter from "./Components/ClientSide/LandingPage/FilterPg"


import jwt_decode from "jwt-decode";
import PublicRoute from './Components/Layout/PublicRoute';
import NewDetail from './Components/ClientSide/LandingPage/NewDetail';
import OwnerLayout from './Components/Layout/OwnerLayout';
import Main from './Components/PgOwnerSide/Main';
import Form1 from './Components/PgOwnerSide/PgOwnerForm/Form1';
import OwnerLogin from './Components/PgOwnerSide/OwnerLogin';


function App() {
  const token = localStorage.getItem("token")
  if (token) {
    const decodeToken = jwt_decode(token);
    if (decodeToken.isUser) {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="PropertyListing" element={<NewDetail  />} />
          </Routes>
        </BrowserRouter>
      )
    }
  }else{
    
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicRoute />}>
              <Route index element={<Home />} />
              <Route path="NearbySearch" element={<NearbySearch  />} />
              <Route path="SignupUser" element={<SignupUser />} />
              <Route path="Login" element={<Login />} />
              <Route path="SendOtp" element={<SendOtp />} />
              {/* <Route path="Details" element={<Details />} /> */}
              <Route path="ShortListed" element={<ShortListed />} />            
              <Route path="ProductFilter" element={<ProductFilter />} />
              <Route path="PropertyListing" element={<NewDetail />} />
            </Route>

            <Route path="/" element={<OwnerLayout />}>
            <Route path="Main" element={<Main />} />
            <Route path="Form1" element={<Form1 />} />
           
            

              
            </Route>



          </Routes>
        </BrowserRouter>
      )

  }
}

export default App