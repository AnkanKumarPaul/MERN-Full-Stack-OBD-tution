import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet, faRightFromBracket, faUserDoctor, faSearch, faUser, faHospitalUser, faAddressCard, faTable, faCircleInfo, faHandHoldingMedical, faArrowLeft, faArrowRight, faEnvelope, faPhone, faCircleDollarToSlot, faUserTie } from '@fortawesome/free-solid-svg-icons';
import logoutpic from "./logout.png";  // Your logout image

import OBDHome from "./OBDHome";
import OBDUserlogin from "./OBDUserlogin";
import OBDDonorlogin from "./OBDDonorlogin";
import OBDSearch from "./OBDSearch";
import Showdataintable from "./Showdataintable";
import Footer from "./Footer";
import PaymentGateway from "./PaymentGateway";
import "./Mainpage.css";
import Contact from "./Contact";
import Termsandcondi from "./Termsandcondi";
import OBDUserorDonorProfile from "./OBDUserorDonorProfile";
import Editdonor from "./Editdonor";
import Edituser from "./Edituser";
import OBDDonorforgetpassword from "./OBDDonorforgetpassword";
import OBDUserforgetpassword from "./OBDUserforgetpassword";
import OBDDonorregistraion from "./OBDDonorregistraion";
import OBDUserregistraion from "./OBDUserregistraion";
import OBDAfterLoginSearchBlood from "./OBDAfterLoginSearchBlood";
import OBDDonorBloodReqAccDec from "./OBDDonorBloodReqAccDec";

function Mainpage() {
    const [flag, setFlag] = useState(0);
    const [flagtwo, setFlagtwo] = useState(0);

    useEffect(() => {
        if (localStorage.getItem('loggedUser')) {
            setFlag(1);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('loggedDonor')) {
            setFlag(1);
        }
    }, []);


    useEffect(() => {
        if (localStorage.getItem('loggedUser')) {
            setFlagtwo(1);
        }
    }, []);

    // Logout function with SweetAlert2
    // const logout = () => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         // text: "Do you really want to logout?",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, logout!',
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             // Proceed with the logout
    //             localStorage.removeItem('loggedUser');
    //             localStorage.removeItem('loggedDonor');
    //             window.location.href = "/"; // Redirect to home page or login page
    //         }
    //     });
    // };



    const logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'Cancel',
            didOpen: () => {
                // Custom CSS to swap button order
                const cancelButton = Swal.getCancelButton();
                const confirmButton = Swal.getConfirmButton();

                // Swap buttons (Cancel goes to left and Confirm goes to right)
                confirmButton.style.order = '2';  // Move Yes to the right
                cancelButton.style.order = '1';   // Move Cancel to the left
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with the logout
                localStorage.removeItem('loggedUser');
                localStorage.removeItem('loggedDonor');
                window.location.href = "/"; // Redirect to home page or login page
            }
        });
    };



    return (
        <Router>
            <nav className="nav anchor">
                <h5 className="h5">
                    <FontAwesomeIcon icon={faUserDoctor} className="doctoricon" /> Blood <FontAwesomeIcon icon={faHandHoldingMedical} className="" /> Donation <img src="blooddrop.gif" alt="blooddropicon" className="blooddropicon"></img>
                    {/* <FontAwesomeIcon className="blooddropicon" icon={faDroplet} /> */}
                </h5>

                <ul>
                    {flag === 1 ? (
                        <>
                            <li>
                                <NavLink to="/" className="Home" activeClassName="active">
                                    <FontAwesomeIcon icon={faCircleInfo} /> About Us
                                </NavLink>
                            </li>

                            {
                                flagtwo === 1 ?
                                    <li>
                                        <NavLink to="/OBDAfterLoginSearchBlood" className="Donor" activeClassName="active">
                                            <FontAwesomeIcon icon={faHandHoldingMedical} /> Request Blood
                                        </NavLink>
                                    </li>
                                    :
                                    <li>
                                        <NavLink to="/OBDDonorBloodReqAccDec" className="Donor" activeClassName="active">
                                            <FontAwesomeIcon icon={faHandHoldingMedical} /> Donate Request
                                        </NavLink>
                                    </li>
                            }

                            {/* <li>
                                <NavLink to="/Showdataintable" className="DataTable" activeClassName="active">
                                    <FontAwesomeIcon icon={faTable} /> DataTable
                                </NavLink>
                            </li> */}
                            <li>
                                <NavLink to="/OBDUserorDonorProfile" className="Profile" activeClassName="active">
                                    <FontAwesomeIcon icon={faAddressCard} /> Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/PaymentGateway" className="PaymentGatewayDonate" activeClassName="active">
                                    <FontAwesomeIcon icon={faCircleDollarToSlot} /> Donation
                                </NavLink>
                            </li>
                            <li className="logoutbutton">
                                {/* <img src={logoutpic} className="pngs" alt="..." /> */}
                                <button className="logoutbutton" onClick={logout}>
                                    <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/" className="Search" activeClassName="active">
                                    <FontAwesomeIcon icon={faSearch} /> Need Blood
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/OBDUserlogin" className="User" activeClassName="active">
                                    <FontAwesomeIcon icon={faUser} /> User
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/OBDDonorlogin" className="Donor" activeClassName="active">
                                    <FontAwesomeIcon icon={faHospitalUser} /> Donor
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/OBDHome" className="Home" activeClassName="active">
                                    <FontAwesomeIcon icon={faCircleInfo} /> About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/PaymentGateway" className="PaymentGatewayDonate" activeClassName="active">
                                    <FontAwesomeIcon icon={faCircleDollarToSlot} /> Donation
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <Routes>
                <Route exact path="/" element={<>{flag === 1 ? <OBDHome /> : <OBDSearch />}</>} />
                <Route exact path="/OBDHome" element={<OBDHome />} />
                <Route exact path="/OBDUserlogin" element={<OBDUserlogin />} />
                <Route exact path="/OBDDonorlogin" element={<OBDDonorlogin />} />
                <Route exact path="/Showdataintable" element={<Showdataintable />} />
                <Route exact path="/PaymentGateway" element={<PaymentGateway />} />
                <Route exact path="/OBDAfterLoginSearchBlood" element={<>{flagtwo === 1 ? <OBDAfterLoginSearchBlood></OBDAfterLoginSearchBlood> : <OBDDonorBloodReqAccDec></OBDDonorBloodReqAccDec>}</>} />
                <Route exact path="/Termsandcondi" element={<Termsandcondi></Termsandcondi>}></Route>
                <Route exact path="/Contact" element={<Contact></Contact>}></Route>
                <Route exact path="/Editdonor" element={<Editdonor></Editdonor>}></Route>
                <Route exact path="/Edituser" element={<Edituser></Edituser>}></Route>
                <Route exact path="/OBDUserorDonorProfile" element={<OBDUserorDonorProfile></OBDUserorDonorProfile>}></Route>
                <Route exact path="/OBDDonorforgetpassword" element={<OBDDonorforgetpassword></OBDDonorforgetpassword>}></Route>
                <Route exact path="/OBDUserforgetpassword" element={<OBDUserforgetpassword></OBDUserforgetpassword>}></Route>
                <Route exact path="/OBDDonorregistraion" element={<OBDDonorregistraion></OBDDonorregistraion>}></Route>
                <Route exact path="/OBDUserregistraion" element={<OBDUserregistraion></OBDUserregistraion>}></Route>
                <Route exact path="/OBDDonorBloodReqAccDec" element={<OBDDonorBloodReqAccDec></OBDDonorBloodReqAccDec>} />

            </Routes>

            <Footer />
        </Router>
    );
}

export default Mainpage;
