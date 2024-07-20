import { useState } from "react";

import {
    BrowserRouter as
        Router, Routes,
    Route,
    Link,
} from "react-router-dom";

import "./OBDDonorlogin.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
            setMessage("Donor Login Successfully")
            window.location.href = "/"
            //navigate to dashboard or home page
        }
        else {
            setMessage("Donor Login Failed")
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

            <h1 className="h1donorlogin">Online Blood Donation</h1>


            <table className="tabledonorlogin">
                <tr>

                    <th className="tableheadlogindonor">Donor Login</th>

                </tr>

                <br></br>

                <tr>
                    <td>Enter Email Id <input className="my-input" type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr><td>Enter Password :
                    {
                        flag == 0 ?
                            <input className="my-input" type="password" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />

                            :

                            <input className="my-input" type="text" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                    }

                    <a onClick={showHide} className="donorloginshowhide">

                        {flag == 0 ? <FaEyeSlash /> : <FaEye />}

                    </a>

                    {/* <FontAwesomeIcon className="showHidedonor" onClick={showHide} icon={faEyeSlash} /> */}
                    {/* <button onClick={showHide}>Show/Hide</button> */}
                </td></tr>

                {/* onchange er kaj likhle sathe sathe niche dekhabe */}

                <tr >
                    <td className="registrationSwitchlogin"><input onClick={loginDonor} className="registrationSwitchin" type="Submit" value="Login" /></td>
                </tr>
                <tr>
                    <td>{message}</td>
                </tr>
                <br></br>


                <tr>
                    <td>
                        New Donor? <Link to="/OBDDonorregistraion" className="donorregisterlogin">Register here</Link>
                    </td>
                </tr>
                <br></br>
                <tr>
                    <td>
                        Forget Password? <Link to="/OBDDonorforgetpassword" className="donorregisterforget">Click here</Link>
                    </td>
                </tr>

                <br></br>

                {/* {email} <br></br>
                {password} <br></br> */}

            </table>

            {/* <Routes>
                <Route exact path="/OBDDonorregistraion" element={<OBDDonorregistraion></OBDDonorregistraion>}></Route>
            </Routes> */}

        </>
    )
}

export default OBDDonorlogin