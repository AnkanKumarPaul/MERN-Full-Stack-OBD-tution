import { useState } from "react";

import "./OBDDonorforgetpassword.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
// import {
//     // BrowserRouter as Router,
//     // Routes,
//     // Route,
//     Link,
// } from "react-router-dom";

// import OBDUserregistraion from "./OBDUserregistraion";

function OBDDonorforgetpassword() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [messagetwo, setMessagetwo] = useState('')
    const [newpassword, setNewpassword] = useState('')
    // const [password, setPassword] = useState('')
    const [flag, setFlag] = useState(0)
    const [flagtwo, setFlagtwo] = useState(0)


    const validateEmail = async () => {
        const new_donor = {
            "email": email,

        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_donor)
        };

        const response = await fetch('http://localhost:5000/donorcheckmail', requestOptions);
        const data = await response.json();

        if (data.length > 0) {
            setEmail(data[0].email)
            setFlag(1)

        }

        else {
            setMessage("Sorry Your Email is Not Registered, Try Again")
        }
    }

    const updatePassword = async () => {
        alert("update")
        const new_donor = {
            "password": newpassword
        }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_donor)
        };

        const response = await fetch('http://localhost:5000/updateDonorByEmail/' + email, requestOptions);
        const data = await response.json();

        console.log(52, data)
        if (data._id != null) {
            setMessage("Password Updated Successfully")
            window.location.href = "./OBDDonorlogin"
        }
        else {
            setMessage("Password Not Updated, Try Again")
        }
    }

    //for otp
    const sentpass = async () => {
        const pass = {
            "email": email
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pass)
        };

        const response = await fetch('http://localhost:5000/send-email', requestOptions);
        const data = await response.json();


        if (data.length > 0) {
            setEmail(data[0].email)
            setFlag(1)
        }

        else {
            setMessagetwo("Sorry Your Email is Not Registered, Try Again")
        }
    }
    //for otp

    const showHide = (id) => {
        if (flagtwo == 0) {
            setFlagtwo(1)
        }
        else {
            setFlagtwo(0)
        }
    }

    return (
        <>

            {
                flag == 0 ?
                    <>
                        <h1 className="h1forget">Online Blood Donation</h1>
                        <table className="tableforgetdonor">
                            <tr>
                                <th className="tableheadforget ">Donor Forget Password</th>
                            </tr>
                            <br></br>
                            <tr>
                                <td>Enter Email Id :
                                    <input type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td><input type="Submit" value="Submit" onClick={validateEmail} /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td >{message}</td>
                            </tr>

                            <br></br>

                            <tr>
                                <td><input type="Submit" value="Send OTP" onClick={sentpass} /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td >{setMessagetwo}</td>
                            </tr>
                        </table>
                    </>
                    :
                    <>
                        <h1 className="h1forget">Online Blood Donation</h1>
                        <table className="tableforgetdonor">
                            <tr>
                                <th className="tableheadforget ">Donor New Password</th>
                            </tr>
                            <br></br>
                            {/* showHideforforgetdonor */}
                            <tr>
                                <td> New Password :
                                    {
                                        flagtwo == 0 ?
                                            <input className="my-input" type="password" value={newpassword} name="" placeholder="Enter Password" onChange={(e) => setNewpassword(e.target.value)} />

                                            :

                                            <input className="my-input" type="text" value={newpassword} name="" placeholder="Enter Password" onChange={(e) => setNewpassword(e.target.value)} />
                                    }

                                    <a onClick={showHide} className="donorforgetshowhide">

                                        {flagtwo == 0 ? <FaEyeSlash /> : <FaEye />}

                                    </a>

                                    {/* <FontAwesomeIcon className="showHidedonor" onClick={showHide} icon={faEyeSlash} /> */}
                                    {/* <input type="password" name="" placeholder="Enter new password" onChange={(e) => setNewpassword(e.target.value)} /></td> */}
                                </td></tr>
                            <br></br>
                            <tr>
                                <td><input type="Submit" value="Change now" onClick={updatePassword} /></td>
                            </tr>


                            <br></br>


                            <tr>
                                <td >{message}</td>
                            </tr>
                            <br></br>
                        </table>

                    </>
            }

        </>
    )
}

export default OBDDonorforgetpassword