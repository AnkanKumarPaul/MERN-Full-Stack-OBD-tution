import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical, faBell, faCheck, faCalendarDays, faSearch, faHospitalUser, faLocationDot, faEnvelope, faPhone, faUsers, faHashtag, faHome, faFileSignature, faRectangleList, faDroplet } from '@fortawesome/free-solid-svg-icons';
import "./OBDAfterLoginSearchBlood.css";

function OBDAfterLoginSearchBlood() {
    const [alldonors, setAlldonors] = useState([]);
    const [flag, setFlag] = useState(0)
    const [bloodgroup, setBloodgroup] = useState([]);
    const [address, setAddress] = useState([]);
    const [bloodgroupreq, setBloodgroupreq] = useState([]);
    const [date, setDate] = useState([]);
    const [requestedDonors, setRequestedDonors] = useState(new Set());  // Track requested donors
    const [message, setMessage] = useState('')
    const [userid, setuserid] = useState('')
    const [donorid, setdonorid] = useState('')
    const [donatedate, setDonatedate] = useState('')
    const getData = async () => {
        const response = await fetch('http://localhost:5000/getAlldonor');
        const data = await response.json();
        setAlldonors(data);
    };

    // const searchbybloodgroup = async (value) => {
    //     setBloodgroup(value);
    //     if (value == null || value === "") {
    //         getData();
    //     } else {
    //         const response = await fetch(`http://localhost:5000/searchbybloodgroup/${value}`);
    //         const data1 = await response.json();
    //         setAlldonors(data1);
    //     }
    // };


    const searchbybloodgroup = async (value) => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        alert(`Today's date is: ${formattedDate}`);

        setBloodgroup(value);

        if (value == null || value === "") {
            getData();
        } else {
            const response = await fetch(`http://localhost:5000/searchbybloodgroup/${value}`);
            const data1 = await response.json();
            setAlldonors(data1);
        }
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
                body: JSON.stringify(byaddressandblooddonor),
            };

            const response = await fetch('http://localhost:5000/searchbybothdonor', requestOptions);
            const data1 = await response.json();
            setAlldonors(data1);
        }
    };

    // Handle Request Blood logic

    const handleRequestBlood = async (donor) => {
        const userid = localStorage.getItem('loggedUser');
        // Check if the user is logged in
        const loggedInUser = localStorage.getItem("loggedUser");
        if (loggedInUser) {
            const userid = localStorage.getItem('loggedUser')



            const request_blood = {
                "userid": userid,
                "donorid": donor.email,
                "donatedate": date
            }

            // odik a API Creation file(server file_backend) a jeigulo name dewa ache setar name gulo ekhane tanche

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request_blood)
            };

            const response = await fetch('http://localhost:5000/checkRequest', requestOptions);
            const data = await response.json();

            console.log(144, data.length);

            if (data.length === 0) {

                const response1 = await fetch('http://localhost:5000/requestbutton', requestOptions);
                const data1 = await response1.json();

                //ei if ta ki kaj korche? 
                if (data._id != null) {
                    setMessage(`Request Sent to Donor Successfull`)
                    alert(`Request Sent to Donor: ${donor.email} Successfull`)
                }

                else {
                    alert(`Sending Request From User: ${userid}\nSending Request To Donor: ${donor.email}\nBlood Group: ${bloodgroup}\nBlood Donating Date: ${date}`);
                    alert(`Request Sent Successfull`)
                }

            }

            else {
                setMessage(`Request Sent to Donor Failed`)
                alert(`Request sent from user: "${userid}" FAILED because previously already sent request to the same donor on the selected date: "${date}"`)
                //window.location.href = "/OBDAfterLoginSearchBlood"
            }
        }

        if (flag == 0) {
            setFlag(1)
        }
        else {
            setFlag(0)
        }
    };






    return (
        <>
            <h1 className="h1search">Search by Blood Group and Address</h1>

            <table className="tablesearch">
                <tr>
                    <th className="tableheadsearch">
                        <FontAwesomeIcon icon={faHospitalUser} /> Search Donor <FontAwesomeIcon icon={faHandHoldingMedical} />
                    </th>
                </tr>
                <hr />
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faSearch} /> <b>Blood Group</b> <select onChange={(e) => searchbybloodgroup(e.target.value)} className="bloodgroupsearch">
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
                        <FontAwesomeIcon icon={faLocationDot} /> <input required
                            onKeyUp={(e) => searchbybothdonor(e.target.value)}
                            type="search"
                            className="inputbox"
                            title=" Enter Location" placeholder="    Enter Location"
                        />
                    </td>
                </tr>
                <br />
            </table>

            <br />

            <h1 className="donorslistname">
                <FontAwesomeIcon icon={faRectangleList} /> Donor's List
            </h1>

            <table className="table table-sm table-bordered border-primary">
                <thead className="searchdatatablehead">
                    <tr>
                        <th scope="col"><FontAwesomeIcon icon={faHashtag} /> <b>Sl. No</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faFileSignature} /> <b>Donor Name</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faEnvelope} /> <b>Donor Email</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faHome} /> <b>Donor Address</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faPhone} /> <b>Donor Contact</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faUsers} /> <b>Donor Bloodgroup</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faCalendarDays} /> <b>Requesting Date</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faDroplet} /> <b>Request Blood</b></th>
                    </tr>
                </thead>

                <tbody className="tbodydata">
                    {alldonors.map((data, index) => (
                        <tr key={data.email}>
                            <th scope="row" className="table-bordered2">{index + 1}</th>
                            <td className="table-primary">{data.name}</td>
                            <td className="table-warning">{data.email}</td>
                            <td className="table-info">{data.address}</td>
                            <td className="table-info">{data.contact}</td>
                            <td className="table-warning blood">{data.bloodgroup}
                                {/* <input className="inputplaceblood" placeholder="Type This Bloodgroup To Send Request"
                                onChange={(e) => setBloodgroupreq(e.target.value)}/> */}
                            </td>

                            <td className="table-primary">
                                <input required
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]} // Setting the minimum date to today
                                />
                            </td>

                            {/* <td className="table-primary"> <input type="date" onChange={(e) => setDate(e.target.value)}></input></td> */}
                            <td className="table-bordered2">
                                <button
                                    className={`btn ${requestedDonors.has(data.email) ? 'btn-success' : 'btn-danger'}`}
                                    onClick={() => handleRequestBlood(data)}
                                    disabled={requestedDonors.has(data.email)}  // Disable button if the request is already sent
                                >

                                    <FontAwesomeIcon icon={faBell} />   {requestedDonors.has(data.email) ? 'Request Sent' : 'Blood'}
                                    {/* {flag == 0 ? <FontAwesomeIcon className="requesticon" icon={faBell} /> : <FontAwesomeIcon className="requesticon" icon={faCheck} />}  */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default OBDAfterLoginSearchBlood;
