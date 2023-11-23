
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'font-awesome/css/font-awesome.css'; // Import Font Awesome CSS
import React, { useEffect, useState } from 'react';
import "./Filter.css"

// import CityFeatures from './CityFeatures';
import Navbar from './Navbar';


// new

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import AOS from 'aos';

import { useNavigate } from 'react-router-dom';
import "./Features.css"

function ProductFilter() {
    const [selectedSortOption, setSelectedSortOption] = useState('Latest items');
    const [isTypeFilterOpen, setTypeFilterOpen] = useState(true);
    const [isCollapse1Open, setCollapse1Open] = useState(true);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(true);
    const [isMoreFilterOpen, setMoreFilterOpen] = useState(false);
    const [data, setData] = useState([])
    const [areaFilters, setAreaFilters] = useState([]);
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [priceRangeFilters, setPriceRangeFilters] = useState({
        min: 0,
        max: 10000
    });
    const [typeFilter, setTypeFilters] = useState([]);
    const [filterType, setFilterType] = useState([])
    const [margin, setMargin] = useState('0');
    // new

    const [isFavorite, setIsFavorite] = useState(false);
    const [message, setMessage] = useState('');

    const [nearbyCity, setNearbyCity] = useState(localStorage.getItem("Nearby"))
    const [filterData, setFilterData] = useState(JSON.parse(localStorage.getItem("filterData")));

    AOS.init();


    const navigate = useNavigate();


    // new
    const handleAddToFavourites = async (id) => {
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

 
   


    const handleNearbySearchfirst = () => {
        let nearbyCit = localStorage.getItem("Nearby")
        let filter_data = JSON.parse(localStorage.getItem("filterData"))
        if (nearbyCit !== null ) {
            axios
                .post(`http://localhost:4500/searchPg?city=${nearbyCit}`,)
                .then((response) => {
                    console.log("handleNearbySearch=>", response.data);
                    // let store = JSON.stringify(response.data)
                    // localStorage.setItem("nearbyCityData", store)
                    setData(response.data);

                })
                .catch((err) => console.log(err));
        } else {
            alert('Please enter a city name');
        }
    }
    useEffect(() => {
        handleNearbySearchfirst();
    }, []);

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
    // new end



    console.log("nearbycitydata", data)

    const handleAreaFilterChange = (selectedAreas) => {
        setAreaFilters(selectedAreas);
    };

    const handleCategoryFilterChange = (selectedCategories) => {
        setCategoryFilters(selectedCategories);
    };

    const handlePriceRangeChange = (min, max) => {
        setPriceRangeFilters({
            min: parseInt(min, 10) || 0,
            max: parseInt(max, 10) || 10000
        });
    };

    const handleTypeFilterChange = (selectedTypes) => {
        setFilterType(selectedTypes);
    };


    const handleApplyFilter = (e) => {
        e.preventDefault()
        console.log("Button clicked!");
      
            let nearbyCit = localStorage.getItem("Nearby")
            let filter_data = JSON.parse(localStorage.getItem("filterData"))
            if (nearbyCit !== null) {
                axios
                    .post(`http://localhost:4500/searchPg?city=${nearbyCit}`,{
                        // sortOption: selectedSortOption,
                        area: areaFilters,
                        category: categoryFilters,
                        priceMin: priceRangeFilters.min,
                        priceMax:priceRangeFilters.max,
                        type: filterType
            
                    } )
                    .then((response) => {
                        console.log("handleNearbySearch=>", response.data);
                        let store = JSON.stringify(response.data)
                        localStorage.setItem("nearbyCityData", store)
                        setData(response.data);
    
                    })
                    .catch((err) => console.log(err));
            } else {
                alert('Please enter a city name');
            }
        

    };




    // useEffect(() => {
    //     let store = JSON.parse(localStorage.getItem("nearbyCityData"))
    //     setData(store)
    //     console.log("stored data", data)
    // }, [])


    const togglePriceRange = () => {
        setIsPriceRangeOpen(!isPriceRangeOpen);
    };

    const toggleCategory = () => {
        setIsCategoryOpen(!isCategoryOpen);
    };
    const toggleCollapse1 = () => {
        setCollapse1Open(!isCollapse1Open);
    };

    const toggleTypeFilter = () => {
        setTypeFilterOpen(!isTypeFilterOpen);
    };

    const handleSortChange = (event) => {
        setSelectedSortOption(event.target.value);

    };




    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1440) {
                setMargin('10%');
            }
            if (window.innerWidth <= 1326) {
                setMargin('10%');
            }
            if (window.innerWidth <= 1024) {
                setMargin('11%');
            }
            if (window.innerWidth <= 768) {
                setMargin('19%');
            }
            if (window.innerWidth <= 425) {
                setMargin('25%');
            }
            if (window.innerWidth <= 375) {
                setMargin('25%');
            } if (window.innerWidth <= 325) {
                setMargin('29%');
            }
            // else {
            //     setMargin('8%');
            // }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (

        <>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Navbar />
            </div>
            <div className='h-100'>
                <div className="container custom-margin" style={{ marginTop: "8%" }} >
                    <div className="row">
                        <div className="col-lg-3 col-md-4 ">
                            <div className="card">


                                <form >
                                    <article className="filter-group">
                                        <header className="card-header">
                                            <a href="#" onClick={toggleCollapse1}>
                                                <i className={`icon-control fa ${isCollapse1Open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                            </a>
                                            <h6 className="title">Area</h6>
                                        </header>
                                        {isCollapse1Open && (
                                            <div className="filter-content collapse show" style={{ maxHeight:"100px" , overflowY:"auto"}}>
                                                <div className="card-body" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                                    <div className="filter-content collapse show">
                                                        {data?.map((item, index) => (
                                                            <div className="card-body" key={index}>
                                                                {item.area.map((item2, index2) => (
                                                                    <label className="custom-control custom-checkbox" key={index2}>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={areaFilters.includes(item2.name)}
                                                                            onChange={() => handleAreaFilterChange(item2.name)}
                                                                            className="custom-control-input"
                                                                        />
                                                                        <div className="custom-control-label">
                                                                            {item2.name}
                                                                            <b className="badge badge-pill badge-light float-right" style={{ color: "Black" }}>
                                                                                {item2?.length}
                                                                            </b>
                                                                        </div>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </article>


                                    <article className="filter-group">
                                        <header className="card-header">
                                            <a href="#" onClick={toggleCategory}>
                                                <i className={`icon-control fa ${isCategoryOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                                <h6 className="title">Category</h6>
                                            </a>
                                        </header>
                                        {isCategoryOpen && (
                                            <div className="filter-content collapse show" style={{}} id="collapse_2">
                                                <div className="card-body">
                                                    <label className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            checked={categoryFilters === 'Girls'}
                                                            className="custom-control-input"
                                                            onChange={() => handleCategoryFilterChange('Girls')}
                                                        />
                                                        <div className="custom-control-label">
                                                            Girls
                                                            <b className="badge badge-pill badge-light float-right" style={{ color: "Black" }}>120</b>
                                                        </div>
                                                    </label>
                                                    <label className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            checked={categoryFilters === 'Boys'}
                                                            className="custom-control-input"
                                                            onChange={() => handleCategoryFilterChange('Boys')}
                                                        />
                                                        <div className="custom-control-label">
                                                            Boys
                                                            <b className="badge badge-pill badge-light float-right" style={{ color: "Black" }}>120</b>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </article>

                                    {/* // the Price Range filter section as follows: */}

                                    <article className="filter-group">
                                        <header className="card-header">
                                            <a href="#" onClick={togglePriceRange}>
                                                <i className={`icon-control fa ${isPriceRangeOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                                <h6 className="title">Price range</h6>
                                            </a>
                                        </header>
                                        {isPriceRangeOpen && (
                                            <div className="filter-content collapse show">
                                                <div className="card-body">
                                                    <input
                                                        type="range"
                                                        className="custom-range"
                                                        min="1000"
                                                        max="10000"
                                                        value={priceRangeFilters.max} // You may need to adjust this value based on your requirements
                                                        onChange={(e) => handlePriceRangeChange(priceRangeFilters.min, e.target.value)}
                                                        name=""
                                                    />
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label>Min</label>
                                                            <input
                                                                className="form-control"
                                                                placeholder="$0"
                                                                type="number"
                                                                value={priceRangeFilters.min}
                                                                onChange={(e) => handlePriceRangeChange(e.target.value, priceRangeFilters.max)}
                                                            />
                                                        </div>
                                                        <div className="form-group text-right col-md-6">
                                                            <label>Max</label>
                                                            <input
                                                                className="form-control"
                                                                placeholder="$10,000"
                                                                type="number"
                                                                value={priceRangeFilters.max}
                                                                onChange={(e) => handlePriceRangeChange(priceRangeFilters.min, e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )}
                                    </article>


                                    {/* update the Type filter section as follows: */}

                                    <article className="filter-group">
                                        <header className="card-header">
                                            <a href="#" onClick={toggleTypeFilter} className={isTypeFilterOpen ? "active" : ""}>
                                                <i className={`icon-control fa ${isTypeFilterOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                                <h6 className="title">Type</h6>
                                            </a>
                                        </header>
                                        {isTypeFilterOpen && (
                                            <div className="filter-content collapse show">
                                                <div className="card-body">
                                                    <label className="checkbox-btn">
                                                        <input
                                                            type="checkbox"
                                                            checked={filterType === 'pg'}
                                                            onChange={() => handleTypeFilterChange('pg')}
                                                        />
                                                        <span className="btn btn-light">Pg</span>
                                                    </label>
                                                    <label className="checkbox-btn">
                                                        <input
                                                            type="checkbox"
                                                            checked={filterType === 'hostel'}
                                                            onChange={() => handleTypeFilterChange('hostel')}
                                                        />
                                                        <span className="btn btn-light">Hostel</span>
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </article>

                                    {/* apply filter button */}
                                    <article className="filter-group">



                                        <div className="card-body">

                                            <button className="btn btn-block btn-success"  type="button" onClick={handleApplyFilter}>Apply filter</button>
                                        </div>

                                    </article>


                                </form>
                            </div>
                        </div>
                        <main className="col-lg-9 col-md-8">
                            <header className="border-bottom pb-3">
                                <div className="form-inline">
                                    <span className="mr-md-auto">{data?.length} Property found</span>
                                    <select
                                        className="mr-2 form-control"
                                        value={selectedSortOption}
                                        onChange={handleSortChange}
                                    >
                                        <option>Latest items</option>
                                        <option>Trending</option>
                                        <option>Most Popular</option>
                                        <option>Cheapest</option>
                                    </select>
                                    <div className="btn-group">
                                        <a href="#" className="btn btn-outline-secondary" data-toggle="tooltip" title="" data-original-title="List view">
                                            <i className="fa fa-bars"></i>
                                        </a>
                                        <a href="#" className="btn btn-outline-secondary active" data-toggle="tooltip" title="" data-original-title="Grid view">
                                            <i className="fa fa-th"></i>
                                        </a>
                                    </div>
                                </div>
                            </header>
                            <div className="row">
                                {/* <CityFeatures /> */}
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
                                                            <div className='' style={{ marginLeft: "86%" }}>

                                                                <i class="fa fa-star-o " style={{ fontSize: "25px", color: isFavorite ? "red" : "black" }} onClick={() => { handleAddToFavourites(dt?._id) }}></i>
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
                            </div>
                        </main>
                    </div>
                </div>
            </div>


        </>
    );
}

export default ProductFilter;

