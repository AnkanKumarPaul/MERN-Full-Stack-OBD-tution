import { useState, useEffect } from "react"
// import Showdataintable from "./Showdataintable"
import { Navigate, useNavigate } from 'react-router-dom';
import "./OBDSearching.css"

function OBDSearch() {

    const [alldonors, setAlldonors] = useState([])
    const [alluser, setAlluser] = useState([])
    const [address, setAddress] = useState([])
    const [bloodgroup, setBloodgroup] = useState([])
    const [name, setName] = useState([])

    const navigate = useNavigate();

    const getData = async () => {
        const response = await fetch('http://localhost:5000/getAlldonor');
        const data = await response.json();
        setAlldonors(data)
    }

    const getDataofuser = async () => {
        const response = await fetch('http://localhost:5000/getAlluser');
        const data = await response.json();
        setAlluser(data)
    }
    //ei part ta korchilam


    const searchbyboth = async (value) => {
        setAddress(value)
        // setName(value)

        if (value == null || value === "") {
            getData()
        }

        else {

            const byaddressandblood = {
                "address": value,
                "bloodgroup": bloodgroup,
                // "name":value
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(byaddressandblood)
            };

            const response = await fetch('http://localhost:5000/searchbyboth', requestOptions)
            const data1 = await response.json();
            setAlldonors(data1)
        }
    }



    //ei part ta korchilam
    // for blood group
    const searchbybloodgroup = async (value) => {
        setBloodgroup(value)
        if (value == null || value === "") {
            getData()
        }

        else {

            const response = await fetch(`http://localhost:5000/searchbybloodgroup/${value}`)
            const data1 = await response.json();
            setAlldonors(data1)
            console.log(data1);
        }
        // 
    }


    const searchbyname = async (value) => {
        setName(value)
        if (value == null || value === "") {
            getData()
        }

        else {

            const response = await fetch(`http://localhost:5000/searchbyname/${value}`)
            const datathree = await response.json();
            setName(datathree)
            console.log(datathree);
        }
        // 
    }


    useEffect(() => {
        getData()
    }, [])


    useEffect(() => {
        getDataofuser()
    }, [])

    return (
        <>

            <h1 className="h1search">Online Blood Donation</h1>

            <table className="tablesearch">

                <tr>
                    <th className="tableheadsearch">Search Donor</th>
                </tr>
<br></br>
                <tr>
                    <td >Select Blood Group <select onChange={(e) => searchbybloodgroup(e.target.value)} name="" id="" title="Blood Group" className="bloodgroup">

                        <option >Select</option>
                        <option value="a+">a+</option>
                        <option >A-</option>
                        <option >B+</option>
                        <option >B-</option>
                        <option >o+</option>
                        <option >o-</option>

                    </select>

                    </td>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Your Location:  <input onChange={(e) => searchbyboth(e.target.value)} type="search" placeholder="Enter Location" />

                    </td>
                </tr>
                <br></br>
                <tr>
                    <td>Enter Your Name:  <input onChange={(e) => searchbyname(e.target.value)} type="search" placeholder="Enter Name" />

                    </td>
                </tr>
<br></br>
            </table>

            <br></br>

            <h1 className="donorslistname" >Donor's List</h1>


            <marquee behavior="alternate" width="100%">
                <h5 className="forusertablemessagetwo">Scroll down to see User's list</h5>
            </marquee>

            <table class="table table-sm table-bordered border-primary" >

                <thead className="searchdatatablehead">

                    <tr>

                        <th scope="col"><b>Sl. No</b></th>

                        <th scope="col"><b>Name</b></th>

                        <th scope="col"><b>Email</b></th>

                        <th scope="col"><b>Password</b></th>

                        <th scope="col"><b>Address</b></th>

                        <th scope="col"><b>Contact</b></th>

                        <th scope="col"><b>Bloodgroup</b></th>

                    </tr>

                </thead>


                <tbody >
                    {
                        alldonors.map((data, index) =>

                            <tr >

                                <th scope="row" class="table-secondary">{index + 1}</th>

                                <td class="table-primary" >{data.name}</td>

                                <td class="table-warning" >{data.email}</td>

                                <td class="table-success">{data.password}</td>

                                <td class="table-danger">{data.address}</td>

                                <td class="table-warning">{data.contact}</td>

                                <td class="table-info">{data.bloodgroup}</td>

                            </tr>

                        )
                    }

                </tbody>

            </table>





            <h1 className="donorslistname" >User's List</h1>

            <table className="datatable" class="table table-sm table-bordered border-primary" >

                <thead >



                    <tr className="searchdatatablehead" >

                        <th scope="col"><b>Sl. No</b></th>

                        <th scope="col"><b>Name</b></th>

                        <th scope="col"><b>Email</b></th>

                        <th scope="col"><b>Password</b></th>

                        <th scope="col"><b>Address</b></th>

                        <th scope="col"><b>Contact</b></th>

                        <th scope="col"><b>Bloodgroup</b></th>

                    </tr>

                </thead>


                <tbody>

                    {

                        //map for user 
                        alluser.map((data, index) =>

                            // todo list(working: jokon user kono input debe then system er kachhe message 
                            // jabe to-do the work add the data in database)

                            <tr >

                                <th scope="row" class="table-secondary">{index + 1}</th>

                                <td class="table-primary ">{data.name}</td>

                                <td class="table-warning" >{data.email}</td>

                                <td class="table-success">{data.password}</td>

                                <td class="table-danger">{data.address}</td>

                                <td class="table-warning">{data.contact}</td>

                                <td class="table-info">{data.bloodgroup}</td>

                            </tr>

                        )

                    }
                </tbody>
            </table>


        </>
    )
}

export default OBDSearch;