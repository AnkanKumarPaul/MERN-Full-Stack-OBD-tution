import { useState } from "react";

import "./OBDUserforgetpassword.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import {
//     // BrowserRouter as Router,
//     // Routes,
//     // Route,
//     Link,
// } from "react-router-dom";

// import OBDUserregistraion from "./OBDUserregistraion";

function OBDUserforgetpassword() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const [flag, setFlag] = useState(0)
    const [flagtwo, setFlagtwo] = useState(0)


    const validateEmail = async () => {
        const new_user = {
            "email": email
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };

        const response = await fetch('http://localhost:5000/checkmail', requestOptions);
        const data = await response.json();

        if (data.length > 0) {
            setEmail(data[0].email)
            setFlag(1)

        }

        // if (data.length > 0) {
        //     setEmail(data[0].email)
        //     setFlag(1)

        // }
        else {
            setMessage("Sorry Your Email is Not Registered, Try Again")
        }
    }

    const updatePassword = async () => {
        alert("update")
        const new_user = {
            "password": newpassword
        }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };

        const response = await fetch('http://localhost:5000/updateUserByEmail/' + email, requestOptions);
        const data = await response.json();

        // console.log(52, data)
        if (data._id != null) {
            setMessage("Password Updated Successfully")
            window.location.href = "./OBDUserlogin"
        }
        else {
            setMessage("Password Not Updated, Try Again")
        }
    }

 
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
            {/* <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon> */}
            {
                flag == 0 ?
                    <>
                        <h1 className="h1forget">Online Blood Donation</h1>
                        <table className="tableforget">
                            <tr>
                                <th className="tableheadforget ">User Forget Password</th>
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

                        </table>
                    </>
                    :
                    <>
                        <h1 className="h1forget">Online Blood Donation</h1>
                        <table className="tableforget">
                            <tr>
                                <th className="tableheadforget ">User New Password</th>
                            </tr>
                            <br></br>

                            <tr><td>Enter Password :

                                {/* <FontAwesomeIcon className="showHideuser" onClick={showHide} icon={faEye} /> */}
                                {
                                    flagtwo == 0 ?
                                        <input className="my-input" type="password" name="" placeholder="Enter Password" onChange={(e) => setNewpassword(e.target.value)} />

                                        :

                                        <input className="my-input" type="text" name="" placeholder="Enter Password" onChange={(e) => setNewpassword(e.target.value)} />
                                }

                                <a onClick={showHide} className="userforgetshowhide">

                                    {flagtwo == 0 ? <FaEyeSlash /> : <FaEye />}

                                </a>

                                {/* <button onClick={showHide}>Show/Hide</button> */}
                            </td></tr>

                            {/* <tr>
                                <td>Enter new password :
                                    <input type="password" name="" placeholder="Enter new password" onChange={(e) => setNewpassword(e.target.value)} />
                                </td>
                            </tr> */}
                            <br></br>
                            <tr>
                                <td><input type="Submit" value="Set now" onClick={updatePassword} /></td>
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

export default OBDUserforgetpassword