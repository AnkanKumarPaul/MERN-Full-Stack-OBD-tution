
import Allcontact from './Allcontact';
import Edit from './Edit';
// import logo from './logo.svg';
import Contact from './Contact';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from "react-router-dom";



function App() {
  return (
    <>
      <h1>Contact Management System</h1>

      <Router>
        {/* <ul>
            <li><Link to="/">All Contacts</Link></li>
            <li><Link to="/addcontact">Add New Contact</Link></li>
          </ul> */}
        <Routes>

          {/* all contact is home page */}
          <Route exact path="/" element={<Allcontact></Allcontact>}></Route>

          {/* Name and mobile no add korar page */}
          <Route exact path="/addcontact" element={<Contact></Contact>}></Route>

          {/* Name and mobile no update korar page */}
          <Route exact path="/editcontact" element={<Edit></Edit>}></Route>
        </Routes>
      </Router>

      <h2>Design & Developed by Ankan</h2>
    </>
  )
}

export default App;