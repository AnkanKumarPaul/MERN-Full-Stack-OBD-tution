import React, { useEffect } from 'react'

import "./PaymentGateway.css"

const PaymentGateway = () => {

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");

    });

    const donate = () => {
        var options = {
            "key": "rzp_test_ND81BEh4gRO77Q", // Enter the Key ID generated from the Dashboard
            "amount": 100 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Blood Donation Camp", //your business name
            "description": "Donation for Charity",
            "image": "https://cdn2.vectorstock.com/i/1000x1000/92/41/donate-button-icon-vector-10629241.jpg",
            "handler": function (response) {
                alert("Payment Success, Your Transaction id: " + response.razorpay_payment_id);
            }
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    return (
        // <body className='donationbody'>
        <div>

            <h1 className='paygateh1'>Donate for Poor Fund's :)</h1>
            <br></br>
            <button onClick={donate} className='paygatedonatebutton'>Tap to Donate 100 Rs.</button>

        </div>
        // </body>
    )
}

export default PaymentGateway
