//mdatabase connect korar jonno API Creation kora hoyeche ekhane sob 
const nodemailer = require('nodemailer');

const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors')
const mongoose = require('mongoose');

//for hashing
const bcrypt = require("bcrypt")
//for hashing 

//ei part ta ,jehetu server side a localhost 1 ta tei sob cholche tai error k bolche na
//  sobai k 1 ta host ai run korar permission dao

const app = express();
//ei part ta ,jehetu server side a localhost 1 ta tei sob cholche tai error k bolche na
//  sobai k 1 ta host ai run korar permission dao

app.use(express.json());

//ei part ta ,jehetu server side a localhost 1 ta tei sob cholche tai error k bolche na
//  sobai k 1 ta host ai run korar permission dao
app.use(cors({
    origin: '*'
}))
//ei part ta ,jehetu server side a localhost 1 ta tei sob cholche tai error k bolche na
//  sobai k 1 ta host ai run korar permission dao

const mongodburl = 'mongodb+srv://ankankumarpaul7897:Hazard10@cluster0.d9r2w7t.mongodb.net/' //etar name dewa nei bole database e "test" name a ache


mongoose.connect(mongodburl);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Eror!! MongoDB Database Connected Successfully :)');
})

const Donor = require('./Donorregistration');
const User = require('./Userrregistration');
const Admin = require('./Adminregistration');
const Request = require('./Request');
const Feedbackpopup = require('./feedbackpopup');


// object creation
// app.use("/user", userroute)
// app.use("/product", productroute)

// const Donor = require('./ECommers');

//Post Method
app.get('/', (req, res) => {
    const id2 = req.body.id
    res.send('Welcome in Postman: ' + id2)
})


//for hashing
async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
    // Store hash in the database
}

// compare password
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}
//for hashing


//Post Method for donor
app.post('/registerdonor', async (req, res) => {

    const password = req.body.password

    const hpass = await hashPassword(password)


    const data = new Donor({
        name: req.body.name,
        email: req.body.email,
        password: hpass,
        contact: req.body.contact,
        address: req.body.address,
        bloodgroup: req.body.bloodgroup,
    })

    try {
        const response = await data.save();
        res.status(200).json(response)
    }

    catch (error) {
        res.status(400).json({ message: error.message })
    }

})

// Route to check if email is already registered
app.get('/checkdonorEmail/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const existingDonor = await Donor.findOne({ email: email });
        if (existingDonor) {
            return res.status(200).json({ exists: true });
        }
        return res.status(200).json({ exists: false });
    } catch (error) {
        return res.status(500).json({ message: "Error checking email existence" });
    }
});


app.post('/requestbutton', async (req, res) => {

    const data = new Request({
        userid: req.body.userid,
        donorid: req.body.donorid,
        donatedate: req.body.donatedate,
        status: 'Pending'
    })

    // console.log(115,data);

    try {
        const response = await data.save();
        res.status(200).json(response)
    }

    catch (error) {
        res.status(400).json({ message: error.message })
    }

})


// Post Method for user
app.post('/registeruser', async (req, res) => {

    const password = req.body.password

    const hpass = await hashPassword(password)

    const data = new User({
        name: req.body.name,
        email: req.body.email,
        password: hpass,
        contact: req.body.contact,
        address: req.body.address,
        bloodgroup: req.body.bloodgroup,
    })

    try {
        const response = await data.save();
        res.status(200).json(response)
    }

    catch (error) {
        res.status(400).json({ message: error.message })
    }

})


// Route to check if email is already registered
app.get('/checkuserEmail/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(200).json({ exists: true });
        }
        return res.status(200).json({ exists: false });
    } catch (error) {
        return res.status(500).json({ message: "Error checking email existence" });
    }
});


app.post('/registeradmin', async (req, res) => {

    const password = req.body.password

    const hpass = await hashPassword(password)


    const data = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hpass,
        contact: req.body.contact,
        address: req.body.address,
        bloodgroup: req.body.bloodgroup,
    })

    try {
        const response = await data.save();
        res.status(200).json(response)
    }

    catch {
        res.status(400).json({ message: error.message })
    }

})



//Login Post Method

// app.post('/logindonor', async (req, res) => {

//     const password = req.body.password

//     const res1 = await Donor.find({ email: req.body.email })

//     const hpass = res1[0].password

//     const result = await comparePassword(password, hpass)

//     // console.log(139, result)

//     if (result) {
//         res.send({ 'message': true })
//     }
//     else {
//         res.send({ 'message': false })
//     }


// })



app.post('/logindonor', async (req, res) => {
    const password = req.body.password

    const res1 = await Donor.find({ email: req.body.email })
    if (res1.length > 0) {
        const hpass = res1[0].password

        const result = await comparePassword(password, hpass)

        // console.log(145, result)

        if (result) {
            res.send({ 'message': true })
        }
        else {
            res.send({ 'message': false })
        }

    }
    else {
        res.send({ 'message': false })

    }

})





//forget password for user start
app.post('/checkmail', async (req, res) => {

    try {
        const data = await User.find({ "email": req.body.email, });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

//user k forget password ta kon mail a new password update hobe seta jananor jonno
app.patch('/updateUserByEmail/:email', async (req, res) => {
    //const id = req.params.id

    //passsword k body theke tulche and hash a convert korche (forget password a kaj hocche)
    const password = req.body.password
    //passsword k body theke tulche and hash a convert korche (forget password a kaj hocche)

    //and hash a convert korche (forget password a kaj hocche)
    const hpass = await hashPassword(password)
    //and hash a convert korche (forget password a kaj hocche)

    try {
        // console.log(175, req.params.email)
        const data = await User.find({ "email": req.params.email })
        // console.log(176, data)
        const id = data[0]._id
        const updatedData = req.body;

        //database a abr hash store er jonno
        req.body.password = hpass
        //database a abr hash store er jonno

        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//user k forget password ta kon mail a new password update hobe seta jananor jonno
//forget password for user  end


//accept or reject update











//forget password for donor start
app.post('/donorcheckmail', async (req, res) => {

    try {
        const data = await Donor.find({ "email": req.body.email, });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

//donar k forget password ta kon mail a new password update hobe seta jananor jonno
app.patch('/updateDonorByEmail/:email', async (req, res) => {
    //const id = req.params.id

    //passsword k body theke tulche and hash a convert korche (forget password a kaj hocche)
    const password = req.body.password
    //passsword k body theke tulche and hash a convert korche (forget password a kaj hocche)

    //and hash a convert korche (forget password a kaj hocche)
    const hpass = await hashPassword(password)
    //and hash a convert korche (forget password a kaj hocche)


    try {
        // console.log(175, req.params.email)
        const data = await Donor.find({ "email": req.params.email })
        // console.log(176, data)
        const id = data[0]._id
        const updatedData = req.body;

        //database a abr hash store er jonno
        req.body.password = hpass
        //database a abr hash store er jonno

        const options = { new: true };

        const result = await Donor.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//donar k forget password ta kon mail a new password update hobe seta jananor jonno
//forget password for donor end

// app.post('/loginuser', async (req, res) => {

//     const password = req.body.password

//     const res1 = await User.find({ email: req.body.email })

//     const hpass = res1[0].password

//     const result = await comparePassword(password, hpass)

//     // console.log(139, result)

//     if (result) {
//         res.send({ 'message': true })
//     }
//     else {
//         res.send({ 'message': false })
//     }

// })



app.post('/loginUser', async (req, res) => {
    const password = req.body.password

    const res1 = await User.find({ email: req.body.email })
    if (res1.length > 0) {
        const hpass = res1[0].password

        const result = await comparePassword(password, hpass)

        // console.log(145, result)

        if (result) {
            res.send({ 'message': true })
        }
        else {
            res.send({ 'message': false })
        }

    }
    else {
        res.send({ 'message': false })

    }

})





app.post('/loginadmin', async (req, res) => {
    const password = req.body.password

    const res1 = await Admin.find({ email: req.body.email })
    if (res1.length > 0) {
        const hpass = res1[0].password

        const result = await comparePassword(password, hpass)

        // console.log(145, result)

        if (result) {
            res.send({ 'message': true })
        }
        else {
            res.send({ 'message': false })
        }

    }
    else {
        res.send({ 'message': false })

    }

})




//blood request  accept er kaj


app.patch('/updateStatusofuserblood/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        if (req.body.status === "Accepted") {
            const options = { new: true };

            const result = await Request.findByIdAndUpdate(
                id, updatedData, options
            )

            // 3 month er kajer part
            const details = await Request.findById(id)
            const donoremail = details.donorid
            const data11 = await Donor.find({ 'email': donoremail })
            const donatedate = details.donatedate
            const donorid = data11[0]._id

            console.log(462, donorid)

            const options1 = { new: true };
            const updatedData1 = { 'lastdonatedate': donatedate };
            const result1 = await Donor.findByIdAndUpdate(
                donorid, updatedData1, options1
            )

            console.log(470, result1)

            res.send(result)

        }
        else {
            const data = await Request.findByIdAndDelete(id)
            res.send(` ${data.name} has been deleted..`)
        }

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//check request that if a user already send then again block the request

app.post('/checkRequest', async (req, res) => {
    try {
        const data = await Request.find({ "userid": req.body.userid, "donorid": req.body.donorid, "donatedate": req.body.donatedate });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})




//Update by ID Method for edit page
app.patch('/updatedonor/:id', async (req, res) => {
    // res.send('Update by ID API')
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Donor.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Update by ID Method for edit page
app.patch('/updateadmin/:id', async (req, res) => {
    // res.send('Update by ID API')
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Admin.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



app.patch('/updateuser/:id', async (req, res) => {
    // res.send('Update by ID API')
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Update by ID Method for edit page


//Delete by ID Method 
app.delete('/deletedonor/:id', async (req, res) => {
    // res.send('Delete by ID API')

    try {
        const id = req.params.id;
        const data = await Donor.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

})




app.delete('/deletedonorimage/:id', async (req, res) => {
    // res.send('Delete by ID API')

    try {
        const id = req.params.image_id;
        const data = await Donor.findByIdAndDelete(id)
        res.send(`image has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

})




app.delete('/deleteuser/:id', async (req, res) => {
    // res.send('Delete by ID API')

    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

})

//Get all Method for donor
app.get('/getAlldonor', async (req, res) => {
    try {
        const data = await Donor.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.get('/getAlladmin/:id', async (req, res) => {
    try {
        const data = await Admin.find({ _id: req.params.id });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



//Get all dono by emal( 1 ta mail diye 1 jon donorlogin kore tar details dekhar jonno)
app.get('/getDonerByEmail/:email', async (req, res) => {
    try {
        const email = req.params.email
        const data = await Donor.find({ "email": email });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get all dono by emal( 1 ta mail diye 1 jon donorlogin kore tar details dekhar jonno)


//Get by ID Method for donor for edit method


app.get('/getAlldonor/:id', async (req, res) => {

    try {
        const data = await Donor.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//Get all Method for User
app.get('/getAlluser', async (req, res) => {
    try {
        const data = await User.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method for User





//all requested donor find korchi, j user ache se 1 jon kei request korche tai only tar request e dakhachi amar bloodgroup er sathe ,atch kore

app.get('/getAllrequestbydonoremailid/:id', async (req, res) => {

    try {
        const donorid = req.params.id;
        console.log(donorid)
        const data = await Request.find({ "donorid": donorid });
        const temp = [];

        for (let i = 0; i < data.length; i++) {
            let userid = data[i].userid;

            const data1 = await User.find({ email: userid });

            const userdetails = data1[0];

            if (userdetails) {
                const userObject = userdetails.toObject(); // Convert Mongoose document to plain object
                userObject.reqid = data[i]._id; // Add request ID
                userObject.donatedate = data[i].donatedate;
                userObject.status = data[i].status;
                // Add request ID
                temp.push(userObject); // Add modified user details to temp array
            }

        }
        res.json(temp);
    }

    catch (error) {
        console.error("Error in getRequestbydonorId:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//all requested donor find korchi







//Get all user by emal( 1 ta mail diye 1 jon userlogin kore tar details dekhar jonno)


app.get('/getUserByEmail/:email', async (req, res) => {
    try {
        const email = req.params.email
        const data = await User.find({ "email": email });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get all user by emal( 1 ta mail diye 1 jon userlogin kore tar details dekhar jonno)





// //admin  , j sobai k table a dekhte pabe(user)

// app.get('/getAllUserAdmin', async (req, res) => {
//         try {
//             const data = await User.find();
//             // const datatwo = await Donor.find();
//             res.json(data)
//             // res.json(datatwo)
//         }
//         catch (error) {
//             res.status(500).json({ message: error.message })
//         }
//     })

// //admin , j sobai k table a dekhte pabe(user)


// //admin , j sobai k table a dekhte pabe(donor)

// app.get('/getAllDonorAdmin', async (req, res) => {
//     try {
//         // const data = await Donor.find();
//         const datatwo = await Donor.find();
//         // res.json(data)
//         res.json(datatwo)
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// //admin , j sobai k table a dekhte pabe(donor)



// //count for dashboard
// ;

// // Get blood group counts
// app.get('/admin/blood-groups/count', async (req, res) => {
//   try {
//     const bloodGroups = await BloodGroup.aggregate([
//       {
//         $group: {
//           _id: '$bloodGroup',
//           count: { $sum: 1 }
//         }
//       }
//     ]);
//     res.json(bloodGroups);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get total donors count
// app.get('/admin/donors/count', async (req, res) => {
//   try {
//     const count = await Donor.countDocuments();
//     res.json({ count });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get total users count
// app.get('/admin/users/count', async (req, res) => {
//   try {
//     const count = await User.countDocuments();
//     res.json({ count });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });



// //count for dashboard


app.get('/getAdminByEmail/:email', async (req, res) => {
    try {
        const email = req.params.email
        const data = await Admin.find({ "email": email });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})





app.get('/getAlluser/:id', async (req, res) => {

    try {
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//search by blood group er get method // for donor search by blood group

app.get('/searchbybloodgroup/:bloodgroup', async (req, res) => {
    try {
        const data = await Donor.find({ "bloodgroup": req.params.bloodgroup });
        // const datatwo = await User.find({ "bloodgroup": req.params.bloodgroup });
        res.json(data)
        // res.json(datatwo)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

// for donor search by blood group

// for user search by blood group

app.get('/searchbybloodgrouptwo/:bloodgroup', async (req, res) => {
    try {
        const data = await User.find({ "bloodgroup": req.params.bloodgroup });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})
// for user search by blood group

//search by name


app.post('/searchbyname', async (req, res) => {
    try {
        const datathree = await Donor.find({ name: { $regex: req.params.name } });
        res.json(datathree)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})


//aksathe

// , name: { $regex: req.body.name }
// app.post('/searchbybothdonor', async (req, res) => {
//     try {
//         const datatwo = await Donor.find({ address: { $regex: req.body.address }, "bloodgroup": req.body.bloodgroup, "status": "active" });

//         if (datatwo) {
//             for (let i = 0; i < datatwo.length; i++) {

//             }
//         }
//         res.json(datatwo)
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message })
//     }

// })



app.post('/searchbybothuser', async (req, res) => {
    try {
        const datatwo = await User.find({ address: { $regex: req.body.address }, "bloodgroup": req.body.bloodgroup });
        res.json(datatwo)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})







app.post('/searchbybothdonor', async (req, res,) => {

    try {
        const data = await Donor.find({ address: { $regex: req.body.address }, "bloodgroup": req.body.bloodgroup, "status": "active" });
        //console.log(946, data)
        var tempArr = []
        if (data) {

            for (let i = 0; i < data.length; i++) {
                const lastdonateddate = data[i].lastdonatedate; // Assuming format is y/m/d (e.g., '2025/02/19')

                if (lastdonateddate == "") {
                    tempArr.push(data[i])
                }
                else {
                    const today = new Date();
                    const currentdate = today.toISOString().split('T')[0].replace(/-/g, '/'); // current date in y/m/d format
                    console.log(lastdonateddate);
                    console.log(currentdate)

                    const date1 = new Date(lastdonateddate);
                    const date2 = new Date(currentdate);

                    // Calculate the difference in milliseconds
                    const diffInMs = (date2 - date1);

                    // Convert milliseconds to days
                    const diffInDays = parseInt(diffInMs / (1000 * 60 * 60 * 24));

                    console.log(diffInDays); // Output: 41

                    // 30 days hoye gache , tai data show korbe j abar blood donate korte parbe
                    if (diffInDays > 30) {
                        tempArr.push(data[i])
                    }
                }


            }
        }

        res.json(tempArr)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})






//aksathe

// to change address

app.get('/search/:address', async (req, res) => {
    console.log(134, req.params.address)
    try {
        const data = await Donor.find({ "address": req.params.address });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})



app.get('/searchbyaddress/:address', async (req, res) => {
    const address = req.params.address
    try {
        const data = await Donor.find({ address: { $regex: address } });
        res.json(data)
    }

    //$regex = etar kaj keyword likhlei asbe

    //onno kichu diye search korar jonno regex a address er jaigai onno jeta chai seta likhbo
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})


//for donor mail OTP


app.post('/donor-otp-send-email', async (req, res) => {
    // Define email options

    const email = req.body.email
    const otp = req.body.otp

    const response = await Donor.find({ email: email })


    if (response.length > 0) {


        const mailOptions = {
            from: 'ankanpaul1310@gmail.com',
            to: req.body.email,
            subject: 'Password sent By Blood Donation App.',
            text: 'Your One Time Password(OTP) is : ' + otp
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.send('Error sending email');
            } else {
                console.log('Email sent:', info.response);
                res.send('Email sent successfully');
            }
        });
    }
    else {
        res.send("Invalid Email")
    }

    //const data = await Donor.find({email: req.body.email});
    /*
    
    */
});

//for donor mail OTP end
//for user mail OTP end
app.post('/user-otp-send-email', async (req, res) => {
    // Define email options

    const email = req.body.email
    const otp = req.body.otp

    const response = await Donor.find({ email: email })


    if (response.length > 0) {


        const mailOptions = {
            from: 'ankanpaul1310@gmail.com',
            to: req.body.email,
            subject: 'Password sent By Blood Donation App.',
            text: 'Your One Time Password(OTP) is : ' + otp
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.send('Error sending email');
            } else {
                console.log('Email sent:', info.response);
                res.send('Email sent successfully');
            }
        });
    }
    else {
        res.send("Invalid Email")
    }

    //const data = await Donor.find({email: req.body.email});
    /*
    
    */
});
//for user mail OTP end

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ankanpaul1310@gmail.com',
        pass: 'daojttphqhyvknsm'
    }
});

//for mail OTP

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)

})

// const multer = require('multer');
// const path = require('path');


// // Set up multer storage to save images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/images');  // Change this if necessary
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
//   },
// });

// const upload = multer({ storage });

// // Upload profile image endpoint
// app.post('/uploadUserProfileImage/:id', upload.single('profileImage'), (req, res) => {
//   const userId = req.params.id;
//   const profileImagePath = `/uploads/images/${req.file.filename}`;  // Relative path for serving

//   // Assuming you're using a database to save the user's profile image
//   // Update the user's profile image URL in the database
//   User.findByIdAndUpdate(userId, { profileImage: profileImagePath }, { new: true })
//     .then(() => res.json({ message: 'Profile image updated successfully' }))
//     .catch(err => res.status(500).json({ error: err.message }));
// });

// // Serve static files (images) from the 'uploads' directory
// app.use('/uploads', express.static('uploads'));

// // Start the server
// // app.listen(5000, () => {
// //   console.log('Server is running on port 5000');
// // });


//popup feedback part

app.post('/registerpopupdata', async (req, res) => {

    const data = new Feedbackpopup({
        name: req.body.name,
        location: req.body.location,
        feedback: req.body.feedback,
    })

    try {
        const response = await data.save();
        res.status(200).json(response)
    }

    catch {
        res.status(400).json({ message: error.message })
    }

})