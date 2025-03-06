// import { useState } from "react"
// import {
//     BrowserRouter as Link,
// } from "react-router-dom";

import "./Contact.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faHospital } from '@fortawesome/free-solid-svg-icons'
import { FaWhatsapp, FaClock } from 'react-icons/fa';

function Contact() {

    return (

        <>
            <marquee behavior="alternate" className="cmarquee">Give Blood, Save Lifes :) </marquee>
            {/* <h1> contact</h1> */}
            <body className="contactbody">

 
                <div class="footer-fourth">

                    <ul>
                        <br></br> 
                        <li class="emailthree"> <FontAwesomeIcon icon={faEnvelope} /> Email : ankanpaul78970912@gmail.com  </li> <br></br>

                        <li class="phonethree"> <FontAwesomeIcon icon={faPhone} /> Phone No : 9836566304 / 033 1234 5678  </li> <br></br>

                        <li class="wappthree"> <FaWhatsapp></FaWhatsapp> Whatsapp : 9775883092   </li> <br></br>

                        <li class="homethree"> <FontAwesomeIcon icon={faHospital} /> Address : Jagadish Chandra Bose Road, Fulbagan, Kol-7000010  </li> <br></br>

                        <li class="clockthree"> <FaClock></FaClock> Timing :  24/7 </li> <br></br>
                    </ul>

                </div>

            </body >

        </>
    )
}

export default Contact