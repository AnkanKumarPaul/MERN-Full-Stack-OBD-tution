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
    console.log('Database Connected');
})

const Donor = require('./Donorregistration');
const User = require('./Userrregistration');


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

    catch {
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

    catch {
        res.status(400).json({ message: error.message })
    }

})


//Login Post Method

app.post('/logindonor', async (req, res) => {

    const password = req.body.password

    const res1 = await Donor.find({ email: req.body.email })

    const hpass = res1[0].password

    const result = await comparePassword(password, hpass)

    // console.log(139, result)

    if (result) {
        res.send({ 'message': true })
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
        // const id = data[0]._id
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

app.post('/loginuser', async (req, res) => {

    const password = req.body.password

    const res1 = await User.find({ email: req.body.email })

    const hpass = res1[0].password

    const result = await comparePassword(password, hpass)

    // console.log(139, result)

    if (result) {
        res.send({ 'message': true })
    }
    else {
        res.send({ 'message': false })
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


app.get('/getAlluser/:id', async (req, res) => {

    try {
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//search by blood group er get method

app.get('/searchbybloodgroup/:bloodgroup', async (req, res) => {
    try {
        const data = await Donor.find({ "bloodgroup": req.params.bloodgroup });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})



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
app.post('/searchbyboth', async (req, res) => {
    try {
        const datatwo = await Donor.find({ address: { $regex: req.body.address }, "bloodgroup": req.body.bloodgroup });
        res.json(datatwo)
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


//for mail OTP


app.post('/send-email', async (req, res) => {
    // Define email options

    const email = req.body.email

    const response = await Donor.find({ email: email })


    if (response.length > 0) {
        const otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)

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