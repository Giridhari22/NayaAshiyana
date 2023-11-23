
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import AOS from 'aos';

import { useNavigate } from 'react-router-dom';
import "./Features.css"

function CityFeatures() {
  const [data, setData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState('');

  const [nearbyCity, setNearbyCity] = useState(localStorage.getItem("Nearby"))
  const [filterData, setFilterData] = useState(JSON.parse(localStorage.getItem("filterData")));
 
  AOS.init();


  const navigate = useNavigate();

  const handleAddToFavourites = async(id) => {
    const response = await axios.post(`http://localhost:4500/updateFavPg/${id}`);
      console.log("response", response)
    if (response.data.success) {
      setIsFavorite(!isFavorite);
    }
    const messageText = isFavorite ? 'Removed from favorites' : 'Added to favorites';
    setMessage(messageText);

    setTimeout(() => {
      setMessage('');
    }, 1000);
  };

  const handleNearbySearch = () => {
    let nearbyCit = localStorage.getItem("Nearby")
    let filter_data = JSON.parse(localStorage.getItem("filterData"))
    if (nearbyCit !== null && filter_data !==null) {
      axios
        .post(`http://localhost:4500/searchPg?city=${nearbyCit}` , {
          area:filter_data.area , category:filter_data.category , priceMax:filterData.priceRange.max, priceMin:filterData.priceRange.min, type:filter_data.type
        })
        .then((response) => {
          console.log("handleNearbySearch=>", response.data);
          let store = JSON.stringify(response.data)
          localStorage.setItem("nearbyCityData",store)
          setData(response.data);
          
        })
        .catch((err) => console.log(err));
    } else {
      // alert('Please enter a city name');
    }
  }
  useEffect(() => {
    handleNearbySearchfirst();
  }, []);


  const handleNearbySearchfirst = () => {
    let nearbyCit = localStorage.getItem("Nearby")
    let filter_data = JSON.parse(localStorage.getItem("filterData"))
    if (nearbyCit !== null && filter_data !==null) {
      axios
        .post(`http://localhost:4500/searchPg?city=${nearbyCit}`,)
        .then((response) => {
          console.log("handleNearbySearch=>", response.data);
          let store = JSON.stringify(response.data)
          localStorage.setItem("nearbyCityData",store)
          setData(response.data);
          
        })
        .catch((err) => console.log(err));
    } else {
      alert('Please enter a city name');
    }
  }


  const handleDetails = (id) => {
    // console.log("id de do" , id)
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      localStorage.setItem("DetailsId", id)
      navigate("/PropertyListing")
    } else {
      localStorage.setItem("DetailsId", id)
      navigate("/SendOtp?type=someType")
    }
  }



  return (
    <section id="features" className="padd-section text-center ">
          <h3 style={{ color: "#71c55d" }}>Amazing Features in {nearbyCity}.</h3>
      <div className="container" data-aos="fade-up">


        <div class="row" data-aos="fade-up" data-aos-delay="100">
          {/* 0 */}

          {data?.length > 0 && data.map((dt, i) => (

            <div class="col-md-8 col-lg-6">
              <div class="feature-block">

                <Card >
                  <Carousel>
                    {dt.images.map((dataImage) => (
                      <Carousel.Item>
                        <img
                          style={{ height: "250px" }}
                          className="d-block  w-100"
                          src={`http://localhost:4500${dataImage}`}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  {message && <div style={{ textAlign: 'center', color: 'green' }}>{message}</div>}
                  <div className='' style={{marginLeft:"86%"}}>
                    
                  <i class="fa fa-star-o " style={{fontSize:"25px",color: isFavorite ? "red" : "black"  }}  onClick={() => {handleAddToFavourites(dt?._id)}}></i>
                  </div>
                  <Card.Body className='m-0 p-0'>
                    <Card.Title style={{ color: "#71c55d" }}>{dt?.name}</Card.Title>
                    <Card.Text>
                      {dt?.area[0]?.name}
                    </Card.Text>
                  </Card.Body>


                  <Row>
                    <Col xs={6}>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>{dt?.category}||{dt?.type} </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col xs={6}>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>{dt?.city}</ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                  <Card.Body>
                    <Card.Link style={{ textDecoration: "none" }}><button style={{ borderRadius: "20px", backgroundColor: "#71c55d", color: "white" }} className='btn ' onClick={() => { handleDetails(dt?._id) }}>DEATILS</button></Card.Link>
                    <Card.Link href="#" style={{ textDecoration: "none" }}><button style={{ borderRadius: "20px", backgroundColor: "#71c55d", color: "white" }} className='btn '>₹{dt?.Price}</button></Card.Link>
                  </Card.Body>
            </Card>

                

              </div>
            </div>
          ))}


        </div>
      </div>
    </section>
  )
}

export default CityFeatures