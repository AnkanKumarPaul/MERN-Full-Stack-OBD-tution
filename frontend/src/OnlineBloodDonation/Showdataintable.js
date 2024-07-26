import { useEffect, useState } from "react"

import { Navigate, useNavigate } from 'react-router-dom';


import "./Showdataintable.css"

function Showdataintable() {

    const [alldonors, setAlldonors] = useState([])
    const [alluser, setAlluser] = useState([])
    // const [donors, setDonors] = useState([])

    const navigate = useNavigate();

    // const Mylink  = require('./Mylink')

    // useEffect(() => { 
    //     if (localStorage.getItem('allContacts')) {
    //         var allContacts = JSON.parse(localStorage.getItem('allContacts'));
    //         setDonors(allContacts)
    //     }
    // }, [])

    // data variable use kore local host 5000 a j value gulo ache segulo k ei
    // table a useInsertionEffect(tanlo) korlo


    // //fetch donor
    // const getData = async () => {
    //     // const response = await fetch(Mylink.link+'/getAlldonor');
    //     const response = await fetch('http://localhost:5000/getAlldonor');
    //     const data = await response.json();
    //     setAlldonors(data)
    // }




    //Get all dono by emal( 1 ta mail diye 1 jon donorlogin kore tar details dekhar jonno)
    const getData = async () => {
        const email = localStorage.getItem('loggedDonor')
        const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/getDonerByEmail/' + email)
        const data = await response.json()
        console.log(data)
        setAlldonors(data)
    }
    //Get all dono by emal( 1 ta mail diye 1 jon donorlogin kore tar details dekhar jonno)



    // fetch user
    // const getDataofuser = async () => {
    //     // const response = await fetch(`${link}/getAlluser`);
    //     const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/getAlluser');
    //     const data = await response.json();
    //     setAlluser(data)
    // }


    //Get all user by emal( 1 ta mail diye 1 jon userlogin kore tar details dekhar jonno)


    const getDataofuser = async () => {
        const email = localStorage.getItem('loggedUser')
        const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/getUserByEmail/' + email)
        const data = await response.json()
        console.log(data)
        setAlluser(data)
    }


    //Get all user by emal( 1 ta mail diye 1 jon userlogin kore tar details dekhar jonno)


    const editdonor = (id) => {

        navigate('/editDonor', { state: { 'id': id } })
    }

    const edituser = (id) => {

        navigate('/editUser', { state: { 'id': id } })
    }
    // data variable use kore local host 5000 a j value gulo ache segulo k ei 
    // table a useInsertionEffect(tanlo) korlo

    const getDelete = async (id) => {
        if (window.confirm('Are u sure to delete this record? ')) {
            const requestOptions = {
                method: 'Delete',
                headers: { 'Content-Type': 'application/json' },
            };

            // const response = await fetch(`${link}/deletedonor/` + id, requestOptions);
            const response = await fetch('http://localhost:5000/deletedonor/' + id, requestOptions);


            alert("Deleted Donor data Successfully")

            window.location.reload()
        }

    }

    const getDeletetwo = async (id) => {
        if (window.confirm('Are u sure to delete this record? ')) {
            const requestOptions = {
                method: 'Delete',
                headers: { 'Content-Type': 'application/json' },
            };

            // const response = await fetch(`${link}/deletedonor/` + id, requestOptions);
            const response = await fetch('https://mern-full-stack-obd-tution-backend.onrender.com/deleteuser/' + id, requestOptions);


            alert("Deleted  User data Successfully")

            window.location.reload()
        }

    }
    //todo list?

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getDataofuser()
    }, [])
    //todo list?


    // const showHide = (id) => {
    //     if (flagtwo == 0) {
    //         setFlagtwo(1)
    //     }
    //     else {
    //         setFlagtwo(0)
    //     }
    // }


    return (
        <>

            {/* table for donor */}
            <br></br>
            <h1 className="donornametable">DONOR TABLE</h1>

            {/* <marquee behavior="alternate" width="100%">
                <h5 className="forusertablemessage">Scroll down to see user table</h5>
            </marquee> */}
            {/* <br></br> */}

            <table className="datatable" class="table table-sm table-bordered border-primary" >

                <thead >

                    <tr className="tablehead" >

                        <th scope="col"><b>Sl. No</b></th>

                        <th scope="col"><b>Name</b></th>

                        <th scope="col"><b>Email</b></th>

                        <th scope="col"><b>Password</b></th>

                        <th scope="col"><b>Address</b></th>

                        <th scope="col"><b>Contact</b></th>

                        <th scope="col"><b>Bloodgroup</b></th>

                        <th scope="col"><b>Action</b></th>

                    </tr>

                </thead>

                {/* style={{color: "white"}} */}

                <tbody >

                    {

                        // todo list(working: jokon user kono input debe then system er kachhe message
                        // jabe to-do the work add the data in database)


                        //map for donor 
                        alldonors.map((data, index) =>

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


                                <td class="table-success">

                                    <button onClick={(e) => editdonor(data._id)} className="editbutton">Edit</button>

                                    {/* <br></br> */}

                                    <button onClick={(e) => getDelete(data._id)} className="deletebutton">Delete</button>

                                </td>

                            </tr>

                        )
                    }

                </tbody>

            </table>

            <br></br>
            <br></br>

            {/* table for user */}

            <h1 className="donornametable">USER TABLE</h1>

            {/* <br></br> */}

            <table className="datatable" class="table table-sm table-bordered border-primary" >

                <thead >



                    <tr className="tablehead" >

                        <th scope="col"><b>Sl. No</b></th>

                        <th scope="col"><b>Name</b></th>

                        <th scope="col"><b>Email</b></th>

                        <th scope="col"><b>Password</b></th>

                        <th scope="col"><b>Address</b></th>

                        <th scope="col"><b>Contact</b></th>

                        <th scope="col"><b>Bloodgroup</b></th>

                        <th scope="col"><b>Action</b></th>

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


                                <td class="table-success">

                                    <button onClick={(e) => edituser(data._id)} className="editbutton">Edit</button>

                                    {/* <br></br> */}

                                    <button onClick={(e) => getDeletetwo(data._id)} className="deletebutton">Delete</button>

                                </td>


                            </tr>

                        )

                    }
                </tbody>
            </table>
        </>
    )
}

export default Showdataintable
