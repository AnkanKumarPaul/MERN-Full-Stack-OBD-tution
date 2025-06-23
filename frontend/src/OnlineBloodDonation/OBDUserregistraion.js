import { useState } from "react"

import "./OBDUserregistraion.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function OBDUserregistraion() {

    const [flag, setFlag] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [bloodgroup, setBloodgroup] = useState('')
    const [message, setMessage] = useState('')

    // odik a API Creation file(server file_backend) a jeigulo name dewa ache setar name gulo ekhane tanche

    // const registerUser = async () => {
    //     const new_user = {
    //         "name": name,
    //         "email": email,
    //         "password": password,
    //         "address": address,
    //         "contact": phoneno,
    //         "bloodgroup": bloodgroup
    //     }

    //     // odik a API Creation file(server file_backend) a jeigulo name dewa ache setar name gulo ekhane tanche

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(new_user)
    //     };

    //     const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/registeruser', requestOptions);
    //     const data = await response.json();

    //     if (data._id != null) {
    //         setMessage("User Registration Successful")
    //         alert("User Registration Successful")
    //         window.location.href = "/"
    //     }
    //     else {
    //         setMessage("User Registraion Failed")
    //         alert("User Registraion Failed")
    //         window.location.href = "/"

    //     }
    // }

    const checkuserEmailExistence = async (email) => {
        const response = await fetch(`https://mern-full-stack-obd-tution-backend.onrender.com/checkuserEmail/${email}`);
        const data = await response.json();

        if (data.exists) {
            setMessage("This email is already registered");
            alert("This email is already registered");
            return true; // Email exists
        } else {
            return false; // Email does not exist, proceed with registration
        }
    }

    const registerUser = async () => {
        // Check if email is already registered
        const emailExists = await checkuserEmailExistence(email);

        if (emailExists) {
            return; // Stop further execution if email is already registered
        }

        const new_user = {
            "name": name,
            "email": email,
            "password": password,
            "address": address,
            "contact": phoneno,
            "bloodgroup": bloodgroup
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };

        const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/registeruser', requestOptions);
        const data = await response.json();

        if (data._id != null) {
            setMessage("User Registration Successful")
            alert("User Registration Successful")
            window.location.href = "/"
        }
        else {
            setMessage("User Registration Failed")
            alert("User Registration Failed")
            window.location.href = "/"
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

            <h1 className="h1userregistration"> Blood Donation </h1>

            {/* <table className="tableuserregistration">

                <tr>
                    <th className="tableheaduserregistration">User Registration</th>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Your Name : <input type="text" name="" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Email Id : <input type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} /></td>
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


                </td></tr>

             
                <br></br>
                <tr>
                    <td>Enter Your Address : <input type="text" name="" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Your Phone No : <input type="number" name="" placeholder="Enter Phone No" onChange={(e) => setPhoneno(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr>

                    <td>Select Blood Group  : <select name="" id="" title="Blood Group" onChange={(e) => setBloodgroup(e.target.value)}>

                        <option >Select</option>
                        <option >A+</option>
                        <option >A-</option>
                        <option >B+</option>
                        <option >B-</option>
                        <option >o+</option>
                        <option >o-</option>

                    </select>
                    </td>

                </tr>
                <br></br>

                {message}


                <tr >
                    <td className="registrationSwitchin"><input className="registrationSwitchin" type="Submit" value="Save" onClick={registerUser} /></td>
                </tr>
                <br></br>

                <br></br>

            </table> */}


            <table className="tableuserregistration">
                <br></br>
                <tr>
                    <th className="tableheaduserregistration"><b>User Registration</b></th>
                </tr>
                <hr></hr>
                <br></br>
                <tr>
                    <td><b>Enter Your Name :</b> <input className="inputbox2" type="text" name="" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr>
                    <td><b>Enter Email Id :</b> <input className="inputbox2" type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>
                <br></br>

                <tr><td><b>Enter Password :</b>

                    {
                        flag == 0 ?

                            <input className="inputbox2" type="password" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />

                            :

                            <input className="inputbox2" type="text" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                    }

                    <a onClick={showHide} className="donorloginshowhide">

                        {flag == 0 ? <FaEyeSlash /> : <FaEye />}

                    </a>


                </td></tr>

                <br></br>
                <tr>
                    <td><b>Enter Your Address :</b> <input className="inputbox2" type="text" name="" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr>
                    <td><b>Enter Your Phone No :</b> <input className="inputbox2" type="number" name="" placeholder="Enter Phone No" onChange={(e) => setPhoneno(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr>

                    <td><b>Select Blood Group  :</b> <select className="bloodgroupsearch2" name="" id="" title="Blood Group" onChange={(e) => setBloodgroup(e.target.value)}>

                        <option >Select</option>
                        <option >A+</option>
                        <option >A-</option>
                        <option >B+</option>
                        <option >B-</option>
                        <option >O+</option>
                        <option >O-</option>

                    </select>
                    </td>

                </tr>
                <br></br>

                {message}


                <tr >
                    <td className=""><input className="submit" type="Submit" value="Register" onClick={registerUser} /></td>
                </tr>
                <br></br>

                <br></br>

            </table>


        </>
    )
}

export default OBDUserregistraion
