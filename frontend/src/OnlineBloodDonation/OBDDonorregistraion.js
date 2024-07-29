import { useState } from "react"

import "./OBDDonorregistraion.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function OBDDonorregistraion() {

    const [flag, setFlag] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [bloodgroup, setBloodgroup] = useState('')
    const [message, setMessage] = useState('')

    // odik a API Creation file(server file_backend) a jeigulo name dewa ache setar name gulo ekhane tanche

    const registerDonor = async () => {
        const new_donor = {
            "name": name,
            "email": email,
            "password": password,
            "address": address,
            "contact": phoneno,
            "bloodgroup": bloodgroup
        }



        // odik a API Creation file(server file_backend) a jeigulo name dewa ache setar name gulo ekhane tanche

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_donor)
        };

        const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/registerdonor', requestOptions);
        const data = await response.json();

       if (data._id != null) {
            setMessage("Donor Registration Successfull")
            alert("Donor Registration Successfull")
            window.location.href = "/"
        }
        else {
            setMessage("Registraion Failed")
            alert("Registraion Failed")
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

            <h1 className="h1donorregistration">Online Blood Donation</h1>

             <marquee width="100%">
                <h5 className="forusertablemessagetwo">Login and Registration will take some time for first time,
                    request you to please wait... :) </h5>
            </marquee>
        
            <table className="tabledonorregistration">

                <tr>
                    <th className="tableheadregistration">Donor Registration</th>
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
                {/* <tr>
                    <td>Enter Password <input className="my-input" type="password" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} /></td>
                </tr> */}
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

                    <td>Select Blood Group : <select name="" id="" title="Blood Group" onChange={(e) => setBloodgroup(e.target.value)}>

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
                    <td className="registrationSwitch"><input className="registrationSwitchin" type="Submit" value="Save" onClick={registerDonor} /></td>
                </tr>
                <br></br>

                <br></br>

            </table>

        </>
    )
}

export default OBDDonorregistraion
