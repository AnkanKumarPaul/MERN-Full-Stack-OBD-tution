import { useState } from "react";

import { Navigate, useNavigate } from 'react-router-dom';

import "./OBDUserlogin.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

import {
    // BrowserRouter as Router,
    // Routes,
    // Route, 
    Link,
} from "react-router-dom";
import Footer from "./Footer";

// import OBDUserregistraion from "./OBDUserregistraion";

function OBDUserlogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [message, setMessage] = useState('')

    const [flag, setFlag] = useState(0)

    const loginUser = async () => {
        const new_user = {
            "email": email,
            "password": password,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };

        const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/loginuser', requestOptions);
        const data = await response.json();

        if (data.message === true) {
            localStorage.setItem("loggedUser", email)
            setMessage("User Login Successfull")
            alert("User login successfull, please wait...")
            window.location.href = "/"
            //navigate to dashboard or home page
        }
        else {
            setMessage("User Login Failed")
            alert("User Login failed, check mail or password and try again")
            window.location.href = "/OBDUserlogin"
        }
    }

    const showHide = (id) => {
        if (flag === 0) {
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


            <table className="tableuserlogin">

                <br></br>

                <tr>

                    <th className="tableheadlogindonor">Welcome User!</th>

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

                        <Link to="/OBDUserforgetpassword" className="anchor anchorforget donorregisterforget">Forget Password</Link>

                        <input onClick={loginUser} className="submit" type="Submit" value="Login" />

                        <Link to="/OBDUserregistraion" className="anchor anchorregister donorregisterlogin">User Register</Link>

                    </td>
                </tr>

                <br></br> 

                {message}

                <br></br>

            </table>

            {/* <div>
                    <tr>

                        <th className="tableheadlogin ">Welcome User!</th>

                    </tr>
                    <hr></hr>

                    <br></br>

                    <tr>
                        <td><b>Email :</b> <input className="my-input inputbox2" type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} /></td>
                    </tr>

                    <br></br>
                    <tr><td><b>Enter Password :</b>

                        {
                            flag === 0 ?
                                <input className="my-input inputbox2" type="password" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />

                                :

                                <input className="my-input inputbox2" type="text" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                        }

                        <a onClick={showHide} className="userloginshowhide">

                            {flag === 0 ? <FaEyeSlash /> : <FaEye />}

                        </a>

                    </td></tr>


                    <br></br>


                    <tr >
                        <td className="registrationSwitchlogin" ><input onClick={loginUser} className="submit2" type="Submit" value="Login" /></td>
                    </tr>
                    <tr>
                        <td>{message}</td>
                    </tr>

                    <br></br>

                    <tr>
                        <td>
                            <b>New User?</b> <Link to="/OBDUserregistraion" className="anchor anchorregister userregisterlogin">Register here</Link>
                        </td>
                    </tr>
                    <br></br>
                    <tr>
                        <td>
                            <b>Forget Password?</b> <Link to="/OBDUserforgetpassword" className="anchor anchorforget userregisterforget">Click here</Link>

                        </td>
                    </tr>

                    <br></br>
                </div> */}

            <Footer></Footer>

        </>
    )
}

export default OBDUserlogin
