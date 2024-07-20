import { useState } from "react";

import "./OBDLogin.css"

function OBDLogin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

       

    return (
        <>

            <h1 className="h1login">Online Blood Donation</h1>
            <table className="tablelogin">
                <tr>

                    <th className="tableheadlogin">User Login</th>

                </tr>

                <br></br>

                <tr>
                    <td >Enter Email Id <input className="my-input" type="email" name="" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} /></td>
                </tr>

                <tr>
                    <td>Enter Password <input className="my-input" type="password" name="" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} /></td>
                </tr>

                {/* onchange er kaj likhle sathe sathe niche dekhabe */}

                <tr >
                    <td className="registrationSwitch"><input className="registrationSwitchin" type="Submit" value="Login" /></td>
                </tr>


                <tr>
                    <td>
                        New User? Register
                    </td>
                </tr>

                <tr>
                    <td>
                        Forget Password? Click here
                    </td>
                </tr>


                {email} <br></br>
                {password} <br></br>



            </table>

        </>
    )
}

export default OBDLogin