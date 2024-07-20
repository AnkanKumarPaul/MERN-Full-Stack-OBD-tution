import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faEnvelope, faPhone , faCircleDollarToSlot} from '@fortawesome/free-solid-svg-icons'
import { FaClock, FaFile } from 'react-icons/fa';

import {
    BrowserRouter as
        Router, Routes,
    Route,
    Link,
} from "react-router-dom";

import "./Footer.css"

function Footer() {

    return (
        <>

            <footer>

                <div class="footer ">
                    <div class="footer-first">

                        <h3>

                            <b> Blood Donation</b>

                        </h3>

                        <div class="footer-rights">
                            Copyright &#169; onlineblooddonation.com | All rights reserved
                        </div>

                    </div>

                    <div class="footer-third">

                        <ul>

                            <li> <Link to="/" className="hometwo"> <FontAwesomeIcon icon={faHome} />  Home </Link> </li> <br></br>

                            <li > <Link to="/Termsandcondi" className="tc">  <FaFile /> Terms & Conditions </Link> </li> <br></br>

                            <li > <Link to="" className="time">  <FaClock /> Timings :- <marquee behavior="alternate" className="marqueee"> 24/7 </marquee> </Link> </li> <br></br>
                        </ul>

                    </div>

                    <div class="footer-fourth">

                        <ul>

                            <li > <Link to="mailto:ankanpaul7897@gmail.com?subject = Feedback&body = Message" className="email"> <FontAwesomeIcon icon={faEnvelope} /> Email </Link> </li> <br></br>

                            <li > <Link to="/Contact" className="Contacttwo">  <FontAwesomeIcon icon={faPhone} /> Contact </Link>  </li> <br></br>

                            <li>

                                <Link to="/PaymentGateway" className="PaymentGatewayDonatefooter"> <FontAwesomeIcon icon={faCircleDollarToSlot} />  Donate </Link>

                            </li>

                        </ul>

                    </div>

                </div>

            </footer>

        </>
    )
}

export default Footer