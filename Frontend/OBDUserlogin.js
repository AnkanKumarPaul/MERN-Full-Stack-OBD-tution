import { useState } from "react";

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

// import OBDUserregistraion from "./OBDUserregistraion";

function OBDUserlogin() {

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

        const response = await fetch('http://localhost:5000/loginuser', requestOptions);
        const data = await response.json();

        if (data.message === true) {
            localStorage.setItem("loggedUser",email)
            setMessage("User Login Successfully")
            window.location.href = "/"
            //navigate to dashboard or home page
        }
        else {
            setMessage("User Login Failed")
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

            <h1 className="h1login">Online Blood Donation</h1>
            <table className="tablelogin">
                <tr>

                    <th className="tableheadlogin ">User Login</th>

                </tr>

                <br></br>

                <tr>
                    <td >Enter Email Id <input className="my-input" type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr><td>Enter Password :

                    {/* <FontAwesomeIcon className="showHideuser" onClick={showHide} icon={faEye} /> */}
                    {
                        flag === 0 ?
                            <input className="my-input" type="password" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />

                            :

                            <input className="my-input" type="text" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                    }

                    <a onClick={showHide}  className="userloginshowhide">

                        {flag === 0 ? <FaEyeSlash /> : <FaEye />}

                    </a>

                    {/* <FontAwesomeIcon className="showHideuser" onClick={showHide} icon={faEyeSlash} /> */}

                    {/* <button onClick={showHide}>Show/Hide</button> */}
                </td></tr>




                {/* onchange er kaj likhle sathe sathe niche dekhabe */}

                <tr >
                    <td className="registrationSwitchlogin" ><input onClick={loginUser} className="registrationSwitchin" type="Submit" value="Login" /></td>
                </tr>
                <tr>
                    <td>{message}</td>
                </tr>

                <br></br>

                <tr>
                    <td>
                        New User? <Link to="/OBDUserregistraion" className="userregisterlogin">Register here</Link>
                    </td>
                </tr>
                <br></br>
                <tr>
                    <td>
                        Forget Password? <Link to="/OBDUserforgetpassword" className="userregisterforget">Click here</Link>

                    </td>
                </tr>

                <br></br>
                {/* {email} <br></br>
                {password} <br></br> */}

            </table >

        </>
    )
}

export default OBDUserlogin