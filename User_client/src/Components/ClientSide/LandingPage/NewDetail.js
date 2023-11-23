import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Carousel, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./NewDetails.css"
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';



const NewDetail = () => {
  const [data, setData] = useState([])
  const [detail, setDetail] = useState(localStorage.getItem("DetailsId"));
  const navigate = useNavigate()
  console.log("detailsId", detail)

  const getPg = () => {
    axios
      .get(`http://localhost:4500/getPg/${detail}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        },
      })
      .then((response) => {
        console.log("or", response.data.pg);
        setData(response.data.pg);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPg();
  }, []);


  const handleCallOwner = () => {
    // Use the propertyData.ownerPhone to initiate a phone call
    window.location.href = `tel:${data.ownerPhone}`;
  };
  

 const handleBookPg = () =>{
  navigate("/private/PaytmForm")
 }

  return (
<>
<Navbar />
    <div className="container  mt-5 p-5" >
      {data.map((propertyData, index) => (
        <div key={index}>
          <div className="row">
            <div className="col-md-6">
              <Col md={12}>
                <Carousel interval={null}>
                  {propertyData.images.length > 0 && propertyData.images.map((dataImage, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        className="d-block   pg-detail-image"
                        src={`http://localhost:4500${dataImage}`}
                        alt={`Slide ${index + 1}`}
                        style={{ borderRadius: "30px", width: "100%" , height:"330px" }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <div className="col-md-12 shadow p-3 mb-4 bg-white rounded mt-3"
                style={{ borderRadius: "20px" }}
              >
                {/* Owner's Information */}
                <h3 style={{ color: "#71c55d" }}>Owner Information</h3 >
                <p>
                  <strong>Name:</strong> {propertyData.ownerName}
                </p>
                <p>
                  <strong>Email:</strong> {propertyData.ownerEmail}
                </p>
                <p>
                  <strong>Phone:</strong> {propertyData.ownerPhone}
                </p>

                <Button variant="danger" size="md" style={{ borderRadius: "20px", marginLeft: "75%" }}
                onClick={handleCallOwner}
                >call Owner</Button>
              </div>
            </div>
            <div className="col-md-6 shadow p-3 mb-5 bg-white rounded">
              <h3 style={{ color: "#71c55d" }}> Property Information</h3>
              <h4>{propertyData.name}</h4>
              <p>
                <strong>Category:</strong> {propertyData.category}
              </p>
              <p>
                <strong>Furnished:</strong> {propertyData.furnished}
              </p>
              <p>
                <strong>Price:</strong> ₹{propertyData.Price}
              </p>
              <p>
                <strong>Number of Rooms:</strong> {propertyData.numberOfRooms}
              </p>
              <p>
                <strong>Available Rooms:</strong> {propertyData.availableRooms}
              </p>
              <p>
                <strong>Type:</strong> {propertyData.type}
              </p>
              <p>
                <strong>City:</strong> {propertyData.city}
              </p>
              <p>
                <strong>Parking:</strong> {propertyData.parking ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Number of Bathrooms:</strong> {propertyData.numberOfBathrooms}
              </p>
              <p>
                <strong>Number of Balconies:</strong> {propertyData.numberOfBalconies}
              </p>
              <Button className='col-md-4' variant="danger" size="md" style={{ borderRadius: "20px", marginLeft: "65%" }}  onClick={handleBookPg}>Book Pg</Button>
            </div>
          </div>
          <div className="row mt-2 col-md-12">

            <div className="col-md-6 shadow p-2 mb-2   bg-white rounded">
              {/* Property Description */}
              <h2 style={{ color: "#71c55d" }}>Description</h2>
              <p>{propertyData.description}</p>
            </div>
            <div className="col-md-6 shadow p-2  mb-2  bg-white rounded" style={{ marginLeft: "0px" }}>
              {/* Facilities and Rules */}
              <h2 style={{ color: "#71c55d" }}>Facilities</h2>
              <ul>
                {propertyData.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
              <h2 style={{ color: "#71c55d" }}>Rules</h2>
              <ul>
                {propertyData.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 shadow p-3 mb-5 bg-white rounded">
              {/* Nearby Landmarks */}
              <h2 style={{ color: "#71c55d" }}>Nearby Landmarks</h2>
              <ul>
                {propertyData.nearbyLandmarks.map((landmark, index) => (
                  <li key={index}>{landmark}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
</>

  );
};

export default NewDetail;
