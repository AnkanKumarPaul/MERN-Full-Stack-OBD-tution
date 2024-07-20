import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Edituser.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Edituser() {
    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [bloodgroup, setBloodGroup] = useState('')
    const [message, setMessage] = useState('')

    const [flagtwo, setFlagtwo] = useState(0)

    const location = useLocation()

    const registerUser = async () => {
        const new_user = {
            "name": name,
            "email": email,
            "password": password,
            "address": address,
            "contact": phoneno,
            "bloodgroup": bloodgroup
        }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };

        const response = await fetch(`http://localhost:5000/updateuser/${id}`, requestOptions);
        const data = await response.json();

        if (data._id != null) {
            setMessage("User Registration Edit Successfully")
            window.location.href = "./Showdataintable"
        }
        else {
            setMessage("User Registration Edit Failed")
        }
    }

    const getDatabyId = async (id) => {
        const response = await fetch('http://localhost:5000/getAlluser/' + id)
        const data = await response.json();
        setName(data.name)
        setPassword(data.password)
        setAddress(data.address)
        setPhoneno(data.contact)
        setEmail(data.email)
        setBloodGroup(data.bloodgroup)
    }

    useEffect(() => {
        const id = location.state.id;
        console.log(48, id)
        setId(id)
        getDatabyId(id)
    }, [])

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


            <table className="edittableuser">

                <tr>
                    <th className="tableheadedituser">User Registration Page Edit</th>
                </tr>
                <br></br>
                {/* value gulo sob jaigai debo sob kota anar jonno  nicher gulote*/}
                <tr>
                    <td>Enter Your Name <input type="text" name="" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name} /></td>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Email Id <input type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} value={email} /></td>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Password

                        {
                            flagtwo == 0 ?
                                <input className="my-input" type="password" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} />

                                :

                                <input className="my-input" type="text" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        }

                        <a onClick={showHide} className="editusershowhide">

                            {flagtwo == 0 ? <FaEyeSlash /> : <FaEye />}

                        </a>

                    </td>
                </tr>
                <br></br>

                {/* <tr>
                    <td>Enter Password <input className="my-input" type="password" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} /></td>
                </tr>  */}

                <tr>
                    <td>Enter Your Address <input type="text" name="" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} value={address} /></td>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Your Phone No <input type="number" name="" placeholder="Enter Phone No" onChange={(e) => setPhoneno(e.target.value)} value={phoneno} /></td>
                </tr>

                <br></br>
                <tr>

                    <td>Select Blood Group <input type="" name="" placeholder="Enter Phone No" onChange={(e) => setBloodGroup(e.target.value)} value={bloodgroup} />


                        {/* <select name="" id="" title="Blood Group" onChange={(e) => setBloodGroup(e.target.value)}  value={bloodgroup}>

                        <option>Select</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>o+</option>
                        <option>o-</option>

                    </select> */}
                    </td>

                </tr>
                <br></br>
                <tr >
                    <td className="registrationSwitch"><input className="editsaveuser" type="Submit" value="Save" onClick={registerUser} /></td>
                </tr>
                <br></br>
                <tr>
                    <td>{message}</td>
                </tr>
                <br></br>


            </table>
        </>
    )
}
export default Edituser