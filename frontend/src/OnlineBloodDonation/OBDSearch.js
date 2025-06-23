import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical, faHandshake, faFaceSmile, faPaperPlane, faCircleXmark, faBell, faUser, faSearch, faHospitalUser, faLocationDot, faEnvelope, faPhone, faUsers, faHashtag, faHome, faFileSignature, faRectangleList, faDroplet } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import "./OBDSearch.css";

function OBDSearch() {
    const [alldonors, setAlldonors] = useState([]);
    const [bloodgroup, setBloodgroup] = useState([]);
    const [name, setName] = useState([])
    const [location, setLocation] = useState([])
    const [feedback, setFeedback] = useState([]);
    const [address, setAddress] = useState([])
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(true);  // **Modal will show automatically when the page loads**
    const [feedbackData, setFeedbackData] = useState([]);
    const navigate = useNavigate(); // Initialize navigate hook

    const getData = async () => {
        const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/getAlldonor');
        const data = await response.json();
        setAlldonors(data);
    };

    const searchbybothdonor = async (value) => {
        setAddress(value);

        if (value == null || value === "") {
            getData();
        } else {
            const byaddressandblooddonor = {
                "address": value,
                "bloodgroup": bloodgroup,
            };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(byaddressandblooddonor)
            };

            const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/searchbybothdonor', requestOptions);
            const data1 = await response.json();
            setAlldonors(data1);
        }
    };

    const searchbybloodgroup = async (value) => {
        setBloodgroup(value);
        if (value == null || value === "") {
            getData();
        } else {
            const response = await fetch(`https://mern-full-stack-obd-tution-backend.onrender.com/searchbybloodgroup/${value}`);
            const data1 = await response.json();
            setAlldonors(data1);
        }
    };

    const handleRequestBlood = (donor) => {
        const loggedInUser = localStorage.getItem("loggedInUser");

        if (loggedInUser) {
            alert(`Request sent to donor: ${donor.name}`);
        } else {
            alert("Please Register or Log in to request blood.");
            navigate("/OBDUserlogin");
        }
    };


    const closeModal = () => {
        setShowModal(false);
    };

    const registerpopupdata = async () => {

        if (!name || !location || !feedback) {
            setError('All fields are required!'); // Show error if any field is empty
            return;
        }

        const new_popupdata = {
            "name": name,
            "location": location,
            "feedback": feedback,
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_popupdata)
        };

        const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/registerpopupdata', requestOptions);
        const data = await response.json();

        if (data._id != null) {
            setFeedbackData("Sent Successfully")
            alert("Sent Successfully")
            // window.location.href = "/"
            setShowModal(false);
        }

        else {
            setFeedbackData("Sent Failed")
            alert("Sent Failed")
            // window.location.href = "/"
        }
    }

    return (
        <>
            <h1 className="h1search">Search Donor by Blood Group and Address</h1>

            <table className="tablesearch1">
                <tr>
                    <th className="tableheadsearch">
                        <FontAwesomeIcon icon={faHospitalUser} className="" /> Search Donor <FontAwesomeIcon icon={faHandHoldingMedical} className="" />
                    </th>
                </tr> 
                <hr />
                <br></br>
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faSearch} className="" /> <b> Blood Group </b>
                        <select onChange={(e) => searchbybloodgroup(e.target.value)} name="" id="" title="Select Blood Group" className="bloodgroupsearch2">
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
                <br />
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faLocationDot} className="" />  <input onKeyUp={(e) => searchbybothdonor(e.target.value)} type="search" className="inputbox2" title=" Enter Location" placeholder="    Enter Location" />
                    </td>
                </tr>
                <br />
            </table>

            <br />

            <h1 className="donorslistname2"> <FontAwesomeIcon icon={faRectangleList} className="" /> Donor's List</h1>

            <table className="table table-sm table-bordered border-primary">
                <thead className="searchdatatablehead">
                    <tr>
                        <th scope="col"><FontAwesomeIcon icon={faHashtag} /> <b>Sl. No</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faFileSignature} /> <b>Donor Name</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faEnvelope} /> <b>Donor Email</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faHome} /> <b>Donor Address</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faPhone} /> <b>Donor Contact</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faUsers} /> <b>Donor Bloodgroup</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faDroplet} /> <b>Request Blood</b></th>
                    </tr>
                </thead>

                <tbody className="tbodydata">
                    {
                        alldonors.map((data, index) =>
                            <tr key={data.email}>
                                <th scope="row" className="table-bordered2 ">{index + 1}</th>
                                <td className="table-primary">{data.name}</td>
                                <td className="table-warning">{data.email}</td>
                                <td className="table-danger">{data.address}</td>
                                <td className="table-warning">{data.contact}</td>
                                <td className="table-primary blood">{data.bloodgroup}</td>
                                <th scope="row" className="table-bordered2 ">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRequestBlood(data)}
                                    >
                                        <FontAwesomeIcon icon={faBell} /> Blood
                                    </button>
                                </th>
                            </tr>
                        )
                    }
                </tbody>
            </table>


            {/* popup part */}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}><FontAwesomeIcon icon={faCircleXmark} /></span>

                        <h2 className="popuphead"><FontAwesomeIcon icon={faHandshake} /> Collaborate with me!</h2>
                        <br></br>
                        <input className="inputbox3" type="text" name="" placeholder="Your good name?" onChange={(e) => setName(e.target.value)} />
                        <br></br>
                        <input className="inputbox3" type="text" name="" placeholder="Where are you from?" onChange={(e) => setLocation(e.target.value)} />
                        <br></br>
                        <textarea className="textareafeedback" name="" placeholder="Write about yourself and contact info" onChange={(e) => setFeedback(e.target.value)} />
                        <br></br>
                        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

                        <input className="buttonfeedback" type="Submit" value="COLLAB" onClick={registerpopupdata} />
                    </div>
                </div>
            )}
        </>
    );
}

export default OBDSearch;
