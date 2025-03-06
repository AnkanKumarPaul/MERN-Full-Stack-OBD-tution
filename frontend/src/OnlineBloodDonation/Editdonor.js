import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./Editdonor.css"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Editdonor() {
    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [bloodgroup, setBloodGroup] = useState('')
    const [message, setMessage] = useState('')
    const [alluser, setAlluser] = useState([]);
    const [image, setImage] = useState('')
    const [image_id, setImage_id] = useState('')
    const [flagtwo, setFlagtwo] = useState(0)
    const [alldonors, setAlldonors] = useState([]);

    const location = useLocation()

    const registerDonor = async () => {
        const new_donor = {
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
            body: JSON.stringify(new_donor)
        };

        const response = await fetch(`http://localhost:5000/updatedonor/${id}`, requestOptions);
        const data = await response.json();

        if (data._id != null) {
            setMessage("Donor Registration Edit Successfully")
            window.location.href = "./OBDUserorDonorProfile"
        }
        else {
            setMessage("Donor Registration Edit Failed")
        }
    }

    const getDatabyId = async (id) => {
        const response = await fetch('http://localhost:5000/getAlldonor/' + id)
        const data = await response.json();
        setName(data.name)
        setPassword(data.password)
        setAddress(data.address)
        setPhoneno(data.contact)
        setEmail(data.email)
        setBloodGroup(data.bloodgroup)
    }



    const showHide = (id) => {
        if (flagtwo == 0) {
            setFlagtwo(1)
        }
        else {
            setFlagtwo(0)
        }
    }


    const getData = async () => {
        const email = localStorage.getItem('loggedDonor');
        if (email) {
            const response = await fetch('http://localhost:5000/getDonerByEmail/' + email);
            const data = await response.json();
            setAlldonors(data);
        }
    };


    const handleImageUploaddonor = async (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'lpxfs9mx'); // Replace 'your_upload_preset' with your actual upload preset
        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/dquj09uou/image/upload`,
                formData
            );

            console.log("response: ", res.data)

            setImage(res.data.secure_url);
            setImage_id(res.data.public_id);

            const donorid = alldonors[0]._id;

            console.log(donorid);

            const product = {
                "image": res.data.secure_url,
                "image_id": res.data.public_id
            }

            console.log(product)


            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            };

            const response = await fetch(`http://localhost:5000/updatedonor/${donorid}`, requestOptions);
            const data = await response.json();

            if (data._id != null) {
                window.location.href = "/Editdonor"
            }


        } catch (error) {
            console.error('Error uploading image of donor: ', error);
        }
    };


    useEffect(() => {

        if (location.state !== null) {
            const id = location.state.id;
            setId(id)
            getDatabyId(id)
        }
        else {
            getData();  // Fetch donor data
        }

    }, [])

    const deleteimagedonor = async (e) => {
        const product = {
            "image": " ",
            "image_id": " "
        }

        console.log(product)

        const donorid = alldonors[0]._id;

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }

        const response = await fetch(`http://localhost:5000/updateDonor/${donorid}`, requestOptions);
        const data = await response.json();

        if (data._id != null) {
            window.location.href = "/Editdonor"
        }

    };

    return (
        <>

            <table className="edittable">

                <tr>
                    <th className="tableheadedit">Donor Registration Page Edit</th>
                </tr>

                {/* {alldonors.map((data) =>
                    <label className="photouploadlabel" >
                        <img src={data.image} alt="Click to edit" className="profileimage" />
                        <input type="file" onChange={handleImageUploaddonor} accept="image/*" style={{ display: "none" }} />
                        <div className="imageediticon">
                            <img src="cameraicon.png" alt="no icon"></img>
                        </div>
                        <button onClick={deleteimagedonor} className="deletebutton3"><FontAwesomeIcon icon={faTrash} /></button>
                    </label>

                ) 
                }
                <br></br> */}
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

                        <a onClick={showHide} className="editdonorshowhide">

                            {flagtwo == 0 ? <FaEyeSlash /> : <FaEye />}

                        </a>

                    </td></tr>
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

                    <td>Select Blood Group:
                        {/* <input type="" name="" placeholder="Enter Phone No" onChange={(e) => setBloodGroup(e.target.value)} value={bloodgroup} /> */}

                        <select className="bloodgroupsearch3" name="" id="" title="Blood Group" onChange={(e) => setBloodGroup(e.target.value)} value={bloodgroup}>

                            <option>Select</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>O+</option>
                            <option>O-</option>

                        </select>
                    </td>

                </tr>
                <br></br>
                <tr >
                    <td className="registrationSwitch"><input className="editsavedonor" type="Submit" value="Save" onClick={registerDonor} /></td>
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
export default Editdonor