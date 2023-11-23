

import { City, State } from "country-state-city"; // Remove Country import
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import Selector from "./Selector";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchMain = () => {
  const navigate = useNavigate();

  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [state, setState] = useState();
  const [city, setCity] = useState([]);
  console.log("search city >>>>>" , city)

  useEffect(() => {
    // Use ISO code for India (IN) to get states
    setStateData(State.getStatesOfCountry("IN"));
  }, []);

  useEffect(() => {
    if (state) {
      // Use ISO code for India (IN) and the selected state ISO code to get cities
      setCityData(City.getCitiesOfState("IN", state.isoCode));
    }
  }, [state]);

  const handleNearby = () => {
    navigate("/NearbySearch");
  }

  const handleSearch = () =>{
    if(city.name)
    {
      JSON.stringify(localStorage.setItem('Nearby',city.name));
    navigate("/ProductFilter");
    }
    return;
  }

  return (
    <>
      <div className="container">
        <section className="ml-5 vh-30 p-0 flex-column justify-content-center pb-5 selection:text-white">
          <div className="container">
            <h3 className="text-2xl fw-bold">
              select your state and city
            </h3>
            <br />

            <div style={{
              marginLeft: "17%",
              maxWidth: "750px", // Adjust the maximum width as needed
              maxHeight: "60px",
               // Add border styling
              padding: "9px", // Add padding
              borderRadius: "40px", // Add border radius
              display: "flex",
              justifyContent: "space-between", // To create space between the elements
              alignItems: "center", // Center items vertically
            }} className="gap-2 shadow" >
              
                <div className="d-flex flex-column " >
                 <Selector  data={stateData} selected={state} setSelected={setState}  />
                </div>
             
                <div className="d-flex flex-column "  >
                 <Selector data={cityData} selected={city} setSelected={setCity} />       

                </div>
            
              <div style={{ marginBottom: "0px" }}>
                <button type="button" style={{ borderRadius: "20px", backgroundColor: "#71c55d", color: "white" }} onClick={handleSearch} className=" btn">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <div style={{ marginTop: "15px" }}>
                <button id="search-button" type="button" style={{ borderRadius: "20px", backgroundColor: "#71c55d", color: "white", alignItems: 'end' }} className="mb-3 btn text-teal-800 fw-bold" onClick={handleNearby}>Nearby</button>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
};

export default SearchMain;
