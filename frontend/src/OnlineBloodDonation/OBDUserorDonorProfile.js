import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical, faCamera, faPenToSquare, faTrash, faCalendarDays, faCheck, faXmark, faSearch, faHospitalUser, faLocationDot, faEnvelope, faPhone, faUsers, faHashtag, faHome, faFileSignature, faRectangleList, faDroplet, faC } from '@fortawesome/free-solid-svg-icons';
import "./OBDUserorDonorProfile.css";

function OBDUserorDonorProfile() {
  const [alldonors, setAlldonors] = useState([]);
  const [alluser, setAlluser] = useState([]);
  const [image, setImage] = useState('')
  const [image_id, setImage_id] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate();

  // Get donor data based on the logged-in donor's email
  const getData = async () => {
    const email = localStorage.getItem('loggedDonor');
    if (email) {
      const response = await fetch('http://localhost:5000/getDonerByEmail/' + email);
      const data = await response.json();
      setAlldonors(data);
    }
  };

  // Get user data based on the logged-in user's email
  const getDataofuser = async () => {
    const email = localStorage.getItem('loggedUser');
    if (email) {
      const response = await fetch('http://localhost:5000/getUserByEmail/' + email);
      const data = await response.json();
      setAlluser(data);
    }
  };

  const editdonor = (id) => {
    navigate('/editDonor', { state: { 'id': id } });
  };

  const edituser = (id) => {
    navigate('/editUser', { state: { 'id': id } });
  };

  // Delete donor record
  const getDelete = async (id) => {
    if (window.confirm('Are you sure to delete this record?')) {
      const requestOptions = {
        method: 'Delete',
        headers: { 'Content-Type': 'application/json' },
      };

      const response = await fetch('http://localhost:5000/deletedonor/' + id, requestOptions);

      alert("Deleted Donor data Successfully");
      window.location.reload();
    }
  };

  // Delete user record
  const getDeletetwo = async (id) => {
    if (window.confirm('Are you sure to delete this record?')) {
      const requestOptions = {
        method: 'Delete',
        headers: { 'Content-Type': 'application/json' },
      };

      const response = await fetch('http://localhost:5000/deleteuser/' + id, requestOptions);

      alert("Deleted User data Successfully");
      window.location.reload();
    }
  };

  // Fetch data based on logged-in user or donor
  useEffect(() => {
    const loggedDoner = localStorage.getItem('loggedDonor');
    const loggedUser = localStorage.getItem('loggedUser');

    if (loggedDoner) {
      getData();  // Fetch donor data
    } else if (loggedUser) {
      getDataofuser();  // Fetch user data
    }
  }, []);


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
        window.location.href = "/OBDUserorDonorProfile"
      }

    } catch (error) {
      console.error('Error uploading image of donor: ', error);
    }
  };


  const handleImageUploaduser = async (e) => {
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

      const userid = alluser[0]._id;

      console.log(userid);

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

      const response = await fetch(`http://localhost:5000/updateuser/${userid}`, requestOptions);
      const data = await response.json();

      if (data._id != null) {
        window.location.href = "/OBDUserorDonorProfile"
      }


    } catch (error) {
      console.error('Error uploading image of user: ', error);
    }
  };

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
      window.location.href = "/OBDUserorDonorProfile"
    }

  };

  const deleteimageuser = async (e) => {
    const product = {
      "image": " ",
      "image_id": " "
    }

    console.log(product)

    const userid = alluser[0]._id;

    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }

    const response = await fetch(`http://localhost:5000/updateuser/${userid}`, requestOptions);
    const data = await response.json();

    if (data._id != null) {
      window.location.href = "/OBDUserorDonorProfile"
    }

  };

  const handleCameraIconClickdonor = () => {
    document.getElementById("fileInputdonor").click();
  };

  const handleCameraIconClickuser = () => {
    document.getElementById("fileInputuser").click();
  };

  return (
    <>
      <br></br>
      {localStorage.getItem('loggedDonor') && (
        <>
          {alldonors.map((data) => (
            <div className="" key={data._id}>
              <h1 className="donornametable">Donor <b className="profileheaddatamail"> "{data.email}" </b> Profile</h1>
              <br></br>
              <div className="fullbody">
                <div className="card2">

                  <label className="photouploadlabel">
                    {data.image == null || data.image === " "
                      ?
                      (
                        <img src="blankprofile.png" alt="Click to save" className="profileimage" />
                      )
                      :
                      (
                        <img src={data.image} alt="Click to save" className="profileimage" />
                      )
                    }

                  </label>

                  <p>
                    <input type="file" accept="image/*" onChange={handleImageUploaddonor} id="fileInputdonor" style={{ display: "none" }} />
                    <img src="cameraicon.png" alt="no icon" className="editbutton5" onClick={handleCameraIconClickdonor} />
                  </p>

                  <p onClick={deleteimagedonor}>
                    <img src="delete.png" alt="no icon" className="deletebutton5" />
                  </p>

                  <div className="card2-body">

                    <h5 className="card2-title name"><b>{data.name}</b></h5>
                    <p className="card2-text email"><b>Email:</b> {data.email}</p>
                    <p className="card2-text address"><b>Address:</b> {data.address}</p>
                    <p className="card2-text contact"><b>Contact:</b> {data.contact}</p>
                    <p className="card2-text bloodgroup"><b>Blood Group:</b> {data.bloodgroup}</p>

                    <div className="buttoncontainer">
                      <button onClick={() => editdonor(data._id)} className="editbutton3"><FontAwesomeIcon icon={faPenToSquare} /> Profile </button>
                      <button onClick={() => getDelete(data._id)} className="deletebutton3"><FontAwesomeIcon icon={faTrash} />  Profile </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {localStorage.getItem('loggedUser') && (
        <>
          {alluser.map((data) => (
            <div key={data._id}>
              <h1 className="donornametable">User <b className="profileheaddatamail">"{data.email}"</b> Profile</h1>
              <br></br>
              <div className="fullbody">
                <div className="card2">

                  {/* <label className="photouploadlabel">
                    {data.image == null || data.image === " "
                      ?
                      (
                        <img src="blankprofile.png" alt="Click to save" className="profileimage" />
                      )
                      :
                      (
                        <img src={data.image} alt="Click to save" className="profileimage" />
                      )
                    }
                    <input type="file" accept="image/*" onChange={handleImageUploaduser} style={{ display: "none" }} />

                    <img src="cameraicon.png" alt="no icon" className="editbutton5" />

                    <p onClick={deleteimageuser}>
                      <img src="delete.png" alt="no icon" className="deletebutton5" />
                    </p>
                  </label> */}

                  <label className="photouploadlabel">
                    {data.image == null || data.image === " "
                      ?
                      (
                        <img src="blankprofile.png" alt="Click to save" className="profileimage" />
                      )
                      :
                      (
                        <img src={data.image} alt="Click to save" className="profileimage" />
                      )
                    }

                  </label>

                  <p>
                    <input type="file" accept="image/*" onChange={handleImageUploaduser} id="fileInputuser" style={{ display: "none" }} />
                    <img src="cameraicon.png" alt="no icon" className="editbutton5" onClick={handleCameraIconClickuser} />
                  </p>

                  <p onClick={deleteimageuser}>
                    <img src="delete.png" alt="no icon" className="deletebutton5" />
                  </p>

                  <div className="card2-body">

                    <h5 className="card2-title name"><b>{data.name}</b></h5>
                    <p className="card2-text email"><b>Email:</b> {data.email}</p>
                    <p className="card2-text address"><b>Address:</b> {data.address}</p>
                    <p className="card2-text contact"><b>Contact:</b> {data.contact}</p>
                    <p className="card2-text bloodgroup"><b>Blood Group:</b> {data.bloodgroup}</p>

                    <div className="buttoncontainer">
                      <button onClick={() => edituser(data._id)} className="editbutton3"><FontAwesomeIcon icon={faPenToSquare} /> Profile </button>
                      <button onClick={() => getDeletetwo(data._id)} className="deletebutton3"><FontAwesomeIcon icon={faTrash} /> Profile </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default OBDUserorDonorProfile;
