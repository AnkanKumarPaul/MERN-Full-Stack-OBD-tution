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
    // const [otpsentmessage, setotpsentmessage] = useState('')
    const [newpassword, setNewpassword] = useState('')
    // const [password, setPassword] = useState('')
    const [flag, setFlag] = useState(0)
    const [flagtwo, setFlagtwo] = useState(0)
    const [flago, setFlago] = useState(0);
    const [flagc, setFlagc] = useState(0);
    const [flaga, setFlaga] = useState(0);
    const [OTP, setOTP] = useState('')
    const [userOTP, setUserOTP] = useState('')
    const [attempts, setAttempts] = useState(0);
    const maxAttempts = 3;
    const [cpassword, setCpassword] = useState('')


    // const validateEmail = async () => {
    //     const new_donor = {
    //         "email": email,

    //     }

    const validateEmail = async () => {
        const x = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
        setOTP(x)
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

    const validateOTP = () => {
        console.log("OTP: " + OTP + " " + "User OTP: " + userOTP)
        if (userOTP == OTP) {
            alert("OTP Verified")
            setMessage("OTP Verified")
            setFlag(2)
        }
        else {
            setMessage("OTP Not Matched, Try Again...!!!")
            setAttempts(attempts + 1);
            if (attempts + 1 >= maxAttempts) {
                // window.location.href = "/doner";
                setFlag(0)
            }
        }
    }

    const updatePassword = async () => {
        alert("updating...")
        const new_donor = {
            "password": newpassword
        }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_donor)
        };


        if (newpassword == cpassword) {

            const response = await fetch('http://localhost:5000/updateDonorByEmail/' + email, requestOptions);
            const data = await response.json();

            console.log(52, data)
            if (data._id != null) {
                alert("Password Updated Successfully")
                // setMessage("Password Updated Successfully")
                window.location.href = "./OBDDonorlogin"
            }
            else {
                setMessage("Password Not Updated, Try Again")
            }
        }
        else {
            setMessage("Password and Confirm Password are not same")
        }
    }

    //for otp
    const sentpass = async () => {
        const x = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
        setOTP(x)
        alert("OTP Sent")
        const pass = {
            "email": email,
            "otp": x
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pass)
        };

        const response = await fetch('http://localhost:5000/donor-otp-send-email', requestOptions);
        const data = await response.json();


        if (data.length > 0) {
            setEmail(data[0].email)
            setFlag(1)
            // setotpsentmessage("otp sent")
        }

        else {
            setMessagetwo("Sorry Your Email is Not Registered, Try Again")
        }
    }
    //for otp

    const showHideo = (id) => {
        setFlago(flago === 0 ? 1 : 0);

    }

    // const showHidec = (id) => {
    //     setFlaga(flaga === 0 ? 1 : 0);
    // }

    const showHide = (id) => {
        if (flagtwo == 0) {
            setFlagtwo(1)
        }
        else {
            setFlagtwo(0)
        }
    }

    const showHidec = (id) => {
        setFlagc(flagc === 0 ? 1 : 0);
    }


    return (
        <>

            {
                flag == 0 ?
                    <>
                        <h1 className="h1forget">Online Blood Donation</h1>
                        <table className="tableforgetdonor">
                            <tr>
                                <th className="tableheadforget ">Donor Forget Password Email Verification</th>
                            </tr>
                            <br></br>
                            <tr>
                                <td> Enter Email Id :
                                    <input type="email" name="" placeholder="Enter Email Id" required onChange={(e) => setEmail(e.target.value)} /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td><input type="Submit" className="submit" value="Submit" onClick={validateEmail} /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td >{message}</td>
                            </tr>

                            <br></br>

                            {/* <tr>
                                <td><input type="Submit" value="Send OTP" onClick={sentpass} /></td>
                            </tr> */}
                            <br></br>
                            <tr>
                                <td >{setMessagetwo}</td>
                            </tr>
                            {/* <tr>
                                <td >{setotpsentmessage}</td>
                            </tr> */}
                        </table>
                    </>
                    : flag == 1 ?
                        <>
                            <h1 className="h1forget">Online Blood Donation</h1>

                            <table className="otpsection">

                                <th className="tableheadforget">Donor Forget Password OTP Verification</th>
                                <br></br>
                                <br></br>
                                <tr>
                                    {
                                        flagc === 0 ?
                                            <>

                                                <input type="Submit" className="submit" value="Send OTP" onClick={sentpass} />

                                                <input type="password" name="" className="inputbox2" placeholder="Enter OTP " onChange={(e) => setUserOTP(e.target.value)} />

                                                <input type="Submit" className="submit" value="Submit OTP" onClick={validateOTP} />


                                                {/* <td><button onClick={showHidec} ><FaEye /></button></td> */}
                                            </>
                                            :
                                            <>
                                                <td ><input type="text" name="" placeholder="Enter your OTP " onChange={(e) => setUserOTP(e.target.value)} /></td>
                                                {/* <td><button onClick={showHidec} ><FaEyeSlash /></button></td> */}

                                            </>

                                    }

                                    {/* <a onClick={showHidec} className="donorforgetotpshowhide">

                                        {flagc == 0 ? <FaEyeSlash /> : <FaEye />}

                                    </a> */}

                                </tr>

                                <br></br>
                                <tr>
                                    <td >{message}</td>
                                </tr>
                                <br></br>
                            </table>

                        </>
                        :
                        <>
                            <h1 className="h1forget">Online Blood Donation</h1>
                            <table className="tableforgetdonor">
                                <tr>
                                    <th className="tableheadforget ">Donor Set New Password</th>
                                </tr>
                                <br></br>
                                {/* showHideforforgetdonor */}

                                <tr>
                                    <td > Enter New Password :
                                        {
                                            flagtwo == 0 ?
                                                <input className="my-input" type="password" value={newpassword} name="" placeholder="Enter New Password" onChange={(e) => setNewpassword(e.target.value)} />

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
                                    <td > Confirm New Password :
                                        {
                                            flago == 0 ?
                                                <input className="my-input" type="password" value={cpassword} name="" placeholder="Re-enter new password" onChange={(e) => setCpassword(e.target.value)} />

                                                :

                                                <input className="my-input" type="text" value={cpassword} name="" placeholder="Re-enter new password" onChange={(e) => setCpassword(e.target.value)} />
                                        }

                                        <a onClick={showHideo} className="donorforgetshowhide">

                                            {flago == 0 ? <FaEyeSlash /> : <FaEye />}

                                        </a>

                                    </td></tr>
                                <br></br>

                                <tr>
                                    <td><input type="Submit" className="submit" value="Change now" onClick={updatePassword} /></td>
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