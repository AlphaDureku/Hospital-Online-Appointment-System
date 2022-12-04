const mail = require('nodemailer')
const patientModel = require('../Models/Object_Models/Patient-info')

exports.renderClinicPage = async(req, res) => {

    res.render('Services/clinic', { layout: 'layouts/sub' })
}


exports.renderOutpatientPage = async(req, res) => {

    res.render('Services/outpatient', { layout: 'layouts/sub' })
}


exports.sendOTP = async(req, res) => {
    const hashed = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    const Patient = {
        Email: req.body.patient_Email,
        OTP: hashed
    }
    patientModel.otp = Patient.OTP
    sendEmail(Patient.Email, hashed)
}

exports.compareOTP = async(req, res) => {
    let Patient = {
        inputOTP: req.body.inputOTP,
        isVerified: false
    }
    if (Patient.inputOTP == patientModel.otp) {
        Patient.isVerified = true
    }
    res.send({ isVerified: Patient.isVerified })

}

exports.renderPatientForm = async(req, res) => {


    res.render('Services/patient-forms', { layout: 'layouts/sub' })
}

exports.getPatientInfo = async(req, res) => {
    patientModel.Fname = req.body.Fname
    patientModel.Lname = req.body.Lname
    patientModel.Mname = req.body.Mname
    patientModel.address = req.body.address
    patientModel.contactNumber = req.body.contactNumber
    patientModel.dateOfBirth = req.body.dateOfBirth
    patientModel.gender = req.body.gender

    console.log(patientModel)

}



// Send Email Process
const sendEmail = (email, otp) => {
    async function main() {
        let testAccount = await mail.createTestAccount();
        let transporter = mail.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: 'templanzamark2002@gmail.com',
                pass: 'iordclhizynxaekm',
            },
        });

        let info = await transporter.sendMail({
            from: '"templanzamark2002@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world? " + otp + "</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    }

    main().catch(console.error);
}