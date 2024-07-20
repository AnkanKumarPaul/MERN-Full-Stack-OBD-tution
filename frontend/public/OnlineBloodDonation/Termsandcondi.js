// import { useState } from "react"
// import {
//     BrowserRouter as Link,
// } from "react-router-dom";

import "./Termsandcondi.css"

import TermsCondipicone from "./TermsCondipicone.png"

import TermsCondipictwo from "./TermsCondipictwo.png"

import TermsCondipicthree from "./TermsCondipicthree.png"

function Termsandcondi() {

    return (

        <>

            <marquee behavior="alternate" className="tcmarquee">Give Blood, Save Lifes :) </marquee>

            <img src={TermsCondipicone} className="image" alt="Not found" />

            <img src={TermsCondipictwo} className="image" alt="Not found" />

            <img src={TermsCondipicthree} className="image" alt="Not found" />

        </>
    )
}

export default Termsandcondi