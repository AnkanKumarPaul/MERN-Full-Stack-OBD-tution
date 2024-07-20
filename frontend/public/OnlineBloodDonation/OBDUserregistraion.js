import { useState } from "react"

import "./OBDUserregistraion.css"

function OBDUserregistraion() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [bloodgroup, setBloodgroup] = useState('')
    const [message, setMessage] = useState('')

    // odik a API Creation file(server file_backend) a jeigulo name dewa ache setar name gulo ekhane tanche

    const registerUser = async () => {
        const new_user = {
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
            body: JSON.stringify(new_user)
        };

        const response = await fetch('http://localhost:5000/registeruser', requestOptions);
        const data = await response.json();

        if (data._id != null) {
            setMessage("User Registration Successfully")
        }
        else {
            setMessage("Registraion Failed")
        }
    }


    return (
        <>

            <h1 className="h1userregistration">Online Blood Donation</h1>

            <table className="tableuserregistration">

                <tr>
                    <th className="tableheaduserregistration">User Registration</th>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Your Name <input type="text" name="" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Email Id <input type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Password <input className="my-input" type="password" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Your Address <input type="text" name="" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Your Phone No <input type="number" name="" placeholder="Enter Phone No" onChange={(e) => setPhoneno(e.target.value)} /></td>
                </tr>
                <br></br>
                <tr>

                    <td>Select Blood Group  <select name="" id="" title="Blood Group" onChange={(e) => setBloodgroup(e.target.value)}>

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

            </table>

        </>
    )
}

export default OBDUserregistraion