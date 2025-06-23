import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical, faCalendarDays, faCheck, faXmark, faSearch, faHospitalUser, faLocationDot, faEnvelope, faPhone, faUsers, faHashtag, faHome, faFileSignature, faRectangleList, faDroplet } from '@fortawesome/free-solid-svg-icons';
import "./OBDDonorBloodReqAccDec.css";

function OBDDonorBloodReqAccDec() {
    const [alldonors, setAlldonors] = useState([]);
    const [alldonorstwo, setAlldonorstwo] = useState([]);
    const [alldonorsupdate, setAlldonorsupdate] = useState([]);


    const getData = async () => {
        const donorid = localStorage.getItem('loggedDonor');
        console.log(20, donorid);
        const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/getAllrequestbydonoremailid/' + donorid);
        const data = await response.json();
        console.log(22, data);
        setAlldonors(data);
    };


    // Get donor data based on the logged-in donor's email
    const getDatatwo = async () => {
        const email = localStorage.getItem('loggedDonor');
        if (email) {
            const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/getDonerByEmail/' + email);
            const datatwo = await response.json();
            setAlldonorstwo(datatwo);
        }
    };



    const acceptstatus = async (reqid) => {

        const newdata = { "status": "Accepted" }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newdata)
        };

        const response = await fetch(`https://mern-full-stack-obd-tution-backend.onrender.com/updateStatusofuserblood/${reqid}`, requestOptions)
        const data = await response.json();
        window.location.href = ""
    }

    const rejectstatus = async (reqid) => {

        const newdata = { "status": "Rejected" }

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newdata)
        };

        const response = await fetch(`https://mern-full-stack-obd-tution-backend.onrender.com/updateStatusofuserblood/${reqid}`, requestOptions)
        //const data = await response.json();
        window.location.href = ""
    }


    useEffect(() => {
        getData()
        getDatatwo()
    }, [])
    return (

        <>

            <br />

            <h1 className="h1search"> <b>Blood Donating Requested Recipient List</b> </h1>
            <br></br>

            <table className="table table-sm table-bordered border-primary">
                <thead className="searchdatatablehead">
                    <tr>
                        <th scope="col"><FontAwesomeIcon icon={faHashtag} /> <b>Sl. No</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faFileSignature} /> <b>Recipient Name</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faEnvelope} /> <b>Recipient Email</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faHome} /> <b>Recipient Address</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faPhone} /> <b>Recipient Contact</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faCalendarDays} /> <b>Donate Date</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faDroplet} /> <b>Required Bloodgroup</b></th>
                        <th scope="col"><FontAwesomeIcon icon={faCheck} /> <b>Accept OR <FontAwesomeIcon icon={faXmark} /> Decline</b></th>
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
                            <td className="table-warning">{data.donatedate} </td>

                            {alldonorstwo.map((datatwo) => (
                                <td className="table-primary blood">{datatwo.bloodgroup}</td>
                            ))}

                            <td className="table-bordered2">
                                {data.status === "Pending" ? (
                                    <>
                                        <div class="buttons-containeraccrej">
                                            <button onClick={(e) => rejectstatus(data.reqid)} class="reject-btn buttonaccrej"><FontAwesomeIcon icon={faXmark} /> </button>
                                            <button onClick={(e) => acceptstatus(data.reqid)} class="accept-btn buttonaccrej"><FontAwesomeIcon icon={faCheck} /> </button>
                                        </div>
                                    </>
                                ) : (
                                    data.status
                                )}

                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default OBDDonorBloodReqAccDec;
