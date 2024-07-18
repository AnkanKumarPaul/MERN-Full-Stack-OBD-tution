// import { useState } from "react"
import {
    BrowserRouter as Link,
} from "react-router-dom";

import "./OBDHome.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FaInstagram, FaFacebook, FaFile } from 'react-icons/fa';

import bloodpic1 from "./bloodpic1.jpg"
import bloodpic2 from "./bloodpic2.jpg"
import bloodpic3 from "./bloodpic3.jpg"

import sliderpic1 from "./slidepic1.jpg"
import sliderpic2 from "./slidepic2.jpg"
import sliderpic3 from "./slidepic3.jpg"
import sliderpic4 from "./slidepic4.jpg"

function OBDHome() {



    return (

        <>

            <div>


                {/* <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel"> */}

                <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">

                    <div class="carousel-indicators">

                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>

                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>

                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>

                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>

                    </div>


                    <div className="carousel-inner">

                        <div className="carousel-item active">

                            <img src={sliderpic1} className="d-block w-100  sliderpic1" alt="Not found" />

                        </div>

                        <div className="carousel-item">

                            <img src={sliderpic2} className="d-block w-100 sliderpic1" alt="..." />

                        </div>

                        <div className="carousel-item">

                            <img src={sliderpic3} className="d-block w-100 sliderpic1" alt="..." />

                        </div>

                        <div className="carousel-item">

                            <img src={sliderpic4} className="d-block w-100 sliderpic1" alt="..." />

                        </div>

                    </div>

                    <button className="carousel-control-prev Previous" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">

                        <span className="button" aria-hidden="true" />  <FontAwesomeIcon icon={faArrowLeft} />

                        <span className="visually-hidden"></span>

                    </button>

                    <button className="carousel-control-next  gonext" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">

                        <span className="button" aria-hidden="true" />  <FontAwesomeIcon icon={faArrowRight} />

                        <span className="visually-hidden"></span>

                    </button>

                </div>


                {/* -------------------------------- slide show part end*/}


                <div class="card-group" style={{ height: '250px' }}>

                    <div class="card">

                        <img src={bloodpic1} class="card-img-top" alt="..." />

                        {/* style={{ width: '50%', height: '200px' }} */}

                        <div class="card-body">

                            <h5 class="card-title">There are 7 types of blood </h5>

                            <p class="card-textone">
                                O positive: 35% ,
                                O negative: 13%  ,
                                A positive: 30% ,
                                A negative: 8% ,
                                B positive: 8% ,
                                B negative: 2% ,
                                AB positive: 2% ,
                                AB negative: 1%
                            </p>

                        </div>

                        <div class="card-footer">

                            <small class="text-muted message"> <b> Safe Blood Save Lifes </b> </small>

                        </div>

                    </div>


                    <div class="card">

                        <img src={bloodpic2} class="card-img-top" alt="..." />

                        <div class="card-body">

                            <h5 class="card-title">Importance of Blood</h5>

                            <p class="card-texttwo"> <b>Blood brings oxygen and nutrients to all the parts of the body so
                                they can keep working. Blood carries carbon dioxide and other waste materials to
                                the lungs, kidneys, and digestive system to be removed from the body.
                                Blood also fights infections, and carries hormones around the body.</b></p>

                        </div>

                        <div class="card-footer">
 
                            <small class="text-muted message"> <b> Donate Blood </b> </small>

                        </div>

                    </div>


                    <div class="card">

                        <img src={bloodpic3} class="card-img-top" alt="..." />

                        <div class="card-body">

                            <h5 class="card-title">Benifits of Blood Donation</h5>

                            <p class="card-textthree"> Blood donors had lower risks of liver, lung, colon,
                                stomach, and throat cancer. Every two seconds, someone in the U.S. needs blood.
                                Blood is essential to help patients survive surgeries, cancer treatment,
                                chronic illnesses, and traumatic injuries.</p>

                        </div>

                        <div class="card-footer">

                            <small class="text-muted message"><b> Get Blessings </b></small>

                        </div>

                    </div>
                </div>
                {/* </div>

            </div> */}

                <br></br>

                {/* <footer>

                    <div class="footer ">
                        <div class="footer-first">

                            <h3>

                                <b>Online Blood Donation</b>

                            </h3>

                            <div class="footer-rights">
                                Copyright &#169; onlineblooddonation.com | All rights reserved
                            </div>

                        </div>

                        <div class="footer-third">

                            <ul>

                                <li> <Link to=" /Contact" className="hometwo"> <FontAwesomeIcon icon={faHome} />  Home </Link> </li> <br></br>

                                <li className="tc"> <Link to=" ">  <FaFile /> Terms & Conditions </Link> </li> <br></br>

                            </ul>

                        </div>

                        <div class="footer-fourth">

                            <ul>

                                <li className="facebook"> <Link to=" "> <FaFacebook />   Facebook </Link> </li> <br></br>

                                <li className="instagram"> <Link to=" "> <FaInstagram /> Instagram </Link> </li> <br></br>

                                <li className="email"> <Link to=" "> <FontAwesomeIcon icon={faEnvelope} /> Email </Link> </li> <br></br>

                                <li className="Contacttwo"> <Link to=" ">  <FontAwesomeIcon icon={faPhone} /> Contact </Link>  </li> <br></br>

                            </ul>

                        </div>

                    </div>

                </footer> */}

            </div>

        </>
    )
}

export default OBDHome