import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NearbySearch() {
  const [city, setCity] = useState(null);
  const navigate =   useNavigate()

  useEffect(() => {
    // Step 1: Get user coordinates
    function getCoordinates() {
      var options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    }

    // Step 2: Get city name
    function getCity(coordinates) {
      var xhr = new XMLHttpRequest();
      var lat = coordinates[0];
      var lng = coordinates[1];

      // Paste your LocationIQ token below.
      xhr.open(
        'GET',
        `https://us1.locationiq.com/v1/reverse.php?key=pk.6be4a21cb0fb2aa0000b8fc25f1b0e78&lat=${lat}&lon=${lng}&format=json`,
        true
      );
      xhr.send();
      xhr.onreadystatechange = processRequest;

      function processRequest(e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          var city = response.address.city;
          console.log("city",city);
          localStorage.setItem("Nearby" , city)
          setCity(city); // Set the city in the component's state
        }
      }
    }

    getCoordinates();
  }, []);

  navigate("/ProductFilter")

  // return (
  //   <div>
  //     <h1>Geolocation - City</h1>
  //     {city && <p>City: {city}</p>}
  //   </div>
  // );
}

export default NearbySearch;
