import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet, faUserDoctor, faHome, faSearch, faUser, faHospitalUser, faTable, faArrowLeft, faArrowRight, faEnvelope, faPhone, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {  } from '@fortawesome/free-solid-svg-icons'
import { FaInstagram, FaFacebook, FaFile } from 'react-icons/fa';

import OBDHome from "./OBDHome";
import OBDUserlogin from "./OBDUserlogin";
import OBDDonorlogin from "./OBDDonorlogin";
import OBDSearch from "./OBDSearch";

import "./Mainpage.css"
import Showdataintable from "./Showdataintable";
import Editdonor from "./Editdonor";
import OBDDonorregistraion from "./OBDDonorregistraion";
import OBDUserregistraion from "./OBDUserregistraion";

import logoutpic from "./logout.png"
import OBDUserforgetpassword from "./OBDUserforgetpassword";
import OBDDonorforgetpassword from "./OBDDonorforgetpassword";
import Edituser from "./Edituser";
import Contact from "./Contact";
import Footer from "./Footer";
import Termsandcondi from "./Termsandcondi";
import PaymentGateway from "./PaymentGateway";
// import Mainpagetwo from "./Mainpagetwo";

function Mainpage() {

    const [flag, setFlag] = useState(0)
    //const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('loggedUser')) {
            setFlag(1)
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem('loggedDonor')) {
            setFlag(1)
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('loggedUser')
        localStorage.removeItem('loggedDonor')
        window.location.href = "/"
        //navigate to again login page
    }


    return (
        <> 
            <Router>
                <nav className="nav">

                    <h5 className="h5">   <FontAwesomeIcon icon={faUserDoctor} className="doctoricon" /> Blood Donation  <FontAwesomeIcon icon={faDroplet} /> </h5>

                    <ul>

                        {
                            flag === 1 ? //if part
                                <>
                                    <li>

                                        <Link to="/" className="Home"> <FontAwesomeIcon icon={faHome} />  Home </Link>

                                    </li>

                                    <li>

                                        <Link to="/OBDSearch" className="Search"> <FontAwesomeIcon icon={faSearch} />  Search </Link>

                                    </li>

                                    <li>

                                        <Link to="/Showdataintable" className="DataTable"> <FontAwesomeIcon icon={faTable} /> DataTable </Link>

                                    </li>

                                    <li>

                                        <Link to="/PaymentGateway" className="PaymentGatewayDonate"> <FontAwesomeIcon icon={faCircleDollarToSlot} />  Donate </Link>

                                    </li>

                                    <li >
                                        <img src={logoutpic} className="pngs" alt="..." /> <Link className="logout" onClick={logout}>Logout</Link>
                                    </li>
                                </>
                                : //else part
                                <>

                                    <li>

                                        <Link to="/" className="Home"> <FontAwesomeIcon icon={faHome} />  Home </Link>

                                    </li>

                                    <li>

                                        <Link to="/OBDUserlogin" className="User"> <FontAwesomeIcon icon={faUser} /> Login as User </Link>

                                    </li>

                                    <li>

                                        <Link to="/OBDDonorlogin" className="Donor"> <FontAwesomeIcon icon={faHospitalUser} /> Login as  Donor </Link>

                                    </li>

                                    <li>

                                        <Link to="/PaymentGateway" className="PaymentGatewayDonate"> <FontAwesomeIcon icon={faCircleDollarToSlot} />  Donate </Link>

                                    </li>

                                </>
                        }

                    </ul>

                    <tr >
                        <td >

                            <input type="search" className="searchinputbox" placeholder=" Search Querries" />

                            <button className="searchbuttone" > Search </button>

                        </td>
                    </tr>

                </nav>

                <Routes>

                    <Route exact path="/" element={<OBDHome />}></Route>

                </Routes>

                <br></br>

                <Routes>

                    <Route exact path="/" element={<Footer></Footer>}></Route>

                </Routes>

                {/* <br></br> */}

                <Routes>

                    {/* <Route exact path="/" element={<OBDUserlogin></OBDUserlogin>}></Route> */}
                    {/* <Route exact path="/" element={<OBDHome />}></Route> */}

                    <Route exact path="/home" element={<OBDHome />}></Route>

                    <Route exact path="/OBDUserlogin" element={<OBDUserlogin />}></Route>

                    <Route exact path="/OBDDonorlogin" element={<OBDDonorlogin />}></Route>

                    <Route exact path="/OBDSearch" element={<OBDSearch />}></Route>

                    <Route exact path="/Showdataintable" element={<Showdataintable />}></Route>

                    <Route exact path="/editDonor" element={<Editdonor></Editdonor>}></Route>

                    <Route exact path="/editUser" element={<Edituser></Edituser>}></Route>

                    <Route exact path="/OBDDonorregistraion" element={<OBDDonorregistraion></OBDDonorregistraion>}></Route>

                    <Route exact path="/OBDUserregistraion" element={<OBDUserregistraion></OBDUserregistraion>}></Route>

                    <Route exact path="/OBDHome" element={<OBDHome></OBDHome>}></Route>
                    {/* OBDUserforgetpassword */}

                    <Route exact path="/OBDUserforgetpassword" element={<OBDUserforgetpassword></OBDUserforgetpassword>}></Route>

                    <Route exact path="/OBDDonorforgetpassword" element={<OBDDonorforgetpassword></OBDDonorforgetpassword>}></Route>

                    <Route exact path="/Contact" element={<Contact></Contact>}></Route>

                    <Route exact path="/Termsandcondi" element={<Termsandcondi></Termsandcondi>}></Route>

                    <Route exact path="/PaymentGateway" element={<PaymentGateway></PaymentGateway>}></Route>

                    {/* element er pase auto tanche but path er ota ami nije theke dichi */}
                </Routes>

            </Router>

        </>
    )
}

export default Mainpage;