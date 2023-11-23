
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Navbar from "./Navbar"

import { useNavigate } from 'react-router-dom';
import "./Features.css"

function Features() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 3; // Number of items to display per page
    const [isFavorite, setIsFavorite] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleAddToFavourites = async (id) => {
        const response = await axios.post(`http://localhost:4500/updateFavPg/${id}`);
        console.log("response", response)
        if (response.data.success) {
            setIsFavorite(!isFavorite);
            getFavPg()
        }
        const messageText = isFavorite ? 'Removed from favorites' : 'Added to favorites';
        setMessage(messageText);

        setTimeout(() => {
            setMessage('');
        }, 1000);
    };



    const getFavPg = () => {
        axios
            .get(`http://localhost:4500/getPgByFavourite?page=${page}`)
            .then((response) => {
                console.log("or", response.data.favoritePGs);
                setData(response.data.favoritePGs);
               
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getFavPg();
       
    }, [page]);




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
    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (

        <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Navbar />
            </div>
            <div style={{ marginTop: "7%" }}>
                <section id="features" className="padd-section text-center">
                    <div className="container" data-aos="fade-up">
                        <div className="section-title text-center">
                            <h1 style={{ color: "#71c55d" }}>ShortListed Features.</h1>
                            <h6 className="separator">Here You Can See your Selected Best Pg.</h6>
                        </div>

                        <div class="row" data-aos="fade-up" data-aos-delay="100">
                            {/* 0 */}

                            {data?.length > 0 && data.map((dt, i) => (

                                <div class="col-md-6 col-lg-4">
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
                                            <div className='' style={{ marginLeft: "86%" }}>

                                            <i class="fa fa-star-o " style={{fontSize:"25px",color: isFavorite ? "red" : "black"  }}  onClick={() => {handleAddToFavourites(dt?._id)}}></i>

                                            </div>

                                            <Card.Body className='m-0 p-0'>
                                                <Card.Title style={{ color: "#71c55d" }}><i class="fa fa-home "></i> {dt?.name}</Card.Title>
                                                <Card.Text>
                                                    <i className="fa fa-area-chart mr-2" aria-hidden="true" ></i>
                                                    {dt?.area[0]?.name}
                                                </Card.Text>
                                            </Card.Body>


                                            <Row>
                                                <Col xs={6}>
                                                    <ListGroup className="list-group-flush">

                                                        <ListGroup.Item> <i className="fas fa-restroom mr-2" aria-hidden="true" ></i>{dt?.category}||{dt?.type} </ListGroup.Item>
                                                    </ListGroup>
                                                </Col>
                                                <Col xs={6}>
                                                    <ListGroup className="list-group-flush">
                                                        <ListGroup.Item> <i class='fas fa-city mr-2'></i>{dt?.city}</ListGroup.Item>
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

                            <div className="pagination" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button className="btn btn-danger " style={{ borderRadius: "20px" }} onClick={handlePrevPage}>Previous</button>
                                <button className="btn btn-danger" style={{ borderRadius: "20px" }} onClick={handleNextPage}>Next</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Features






