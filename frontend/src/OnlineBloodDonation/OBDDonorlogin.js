import { useState } from "react";

import {
    BrowserRouter as
        Router, Routes,
    Route,
    Link,
} from "react-router-dom";

import "./OBDDonorlogin.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Footer from "./Footer";
// import OBDDonorregistraion from "./OBDDonorregistraion";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function OBDDonorlogin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [message, setMessage] = useState('')

    const [flag, setFlag] = useState(0)

    const loginDonor = async () => {
        const new_Donor = {
            "email": email,
            "password": password,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_Donor)
        };

        const response = await fetch('http://localhost:5000/logindonor', requestOptions);
        const data = await response.json();

        if (data.message == true) {
            localStorage.setItem("loggedDonor", email)
            setMessage("Donor Login Successfull")
            alert("Donor login successfull, please wait...")
            window.location.href = "/"
            //navigate to dashboard or home page
        }
        else {
            setMessage("Donor Login Failed")
            alert("Donor Login failed, check mail or password and try again")
            window.location.href = "/OBDDonorlogin"
        }
    }

    const showHide = (id) => {
        if (flag == 0) {
            setFlag(1)
        }
        else {
            setFlag(0)
        }
    }

    return (
        <>
            <marquee behavior="alternate" width="100%">
                <h5 className="forusertablemessagetwo">Login and Registration will take some time for first time,
                    request you to please wait... :) </h5>
            </marquee>

            <h1 className="h1donorlogin"> Blood Donation </h1>

            <br></br>

            <table className="tabledonorlogin">

                <br></br>

                <tr>

                    <th className="tableheadlogindonor">Welcome Donor!</th>

                </tr>

                <hr></hr>

                <br></br>

                <tr>
                    <td><b>Email :</b> <input className="my-input inputbox2" type="email" name="" placeholder="Registered Email" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>

                <br></br>

                <tr>
                    <td>

                        <b>Password :</b>
                        {
                            flag == 0 ?
                                <input className="my-input inputbox2" type="password" name="" placeholder="******************" onChange={(e) => setPassword(e.target.value)} />

                                :

                                <input className="my-input inputbox2" type="text" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                        }

                        <a onClick={showHide} className="donorloginshowhide">

                            {flag == 0 ? <FaEyeSlash /> : <FaEye />}

                        </a>

                    </td>
                </tr>

                <br></br>

                <tr>
                    <td className="registrationSwitchlogin">

                        <Link to="/OBDDonorforgetpassword" className="anchor anchorforget donorregisterforget">Forget Password</Link>

                        <input onClick={loginDonor} className="submit" type="Submit" value="Login" />

                        <Link to="/OBDDonorregistraion" className="anchor anchorregister donorregisterlogin">Donor Register</Link>

                    </td>
                </tr>

                <br></br>

                {message}

                <br></br>

                {/* <div>
                    <tr>
                        <td>
                            <Link to="/OBDDonorforgetpassword" className="anchor anchorforget donorregisterforget">Forget Password</Link>
                        </td>
                    </tr>
                    <br></br>
                    <tr >
                        <td className="registrationSwitchlogin"><input onClick={loginDonor} className="submit" type="Submit" value="Login" /></td>
                    </tr>


                    <br></br>
                    <br></br>
                    <tr>
                        <td>
                            <Link to="/OBDDonorregistraion" className="anchor anchorregister donorregisterlogin">Donor Registration</Link>
                        </td>
                    </tr>
                    <br></br>
                    <br></br>
                </div> */}

            </table>

            <Footer></Footer>

        </>
    )
}

export default OBDDonorlogin