const verificationModel = require('../Models/Database_Queries/verification')
const patientModel = require('../Models/Database_Queries/patientQuery')
const mail = require('nodemailer')


//Check appointment section
exports.renderPatientDirectory = async(req, res) => {
    const result = await patientModel.fetchPatient_Directory()
    res.json(result[0])
}

exports.sendEmailOtp = async(req, res) => {
    const Patient = {
        Email: req.body.patient_Email
    }
    console.log(Patient.email)
    const result = await patientModel.fetchPatient_Appointments_Using_Email(Patient.Email)
    if (result[0].length !== 0) {
        const hashed = await verificationModel.generateOTP(Patient.Email)
        sendEmail(Patient.Email, hashed)
    }

}
exports.fetchPatient_OTP = async(req, res) => {
    let Patient = {
        Email: req.body.inputEmail,
        patient_id: null,
        isVerified: false
    }
    console.log(req.body.inputEmail)
    const result = await verificationModel.fetchPatient_OTP(Patient.Email)
    result[0].forEach(data => {
        if (data.patient_OTP == req.body.inputOTP) {
            Patient.isVerified = true
            Patient.patient_id = data.patient_id
        }
    })
    if (Patient.isVerified)
        res.send({ isVerified: Patient.isVerified, patient_id: Patient.patient_id })
    else
        res.send({ isVerified: Patient.isVerified })
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
            from: '"templanzamark2002@gmail.com',
            to: email,
            subject: "Security Verification",
            html: "<b>" + otp + "</b>",
        });
        console.log("Message sent: %s", info.messageId);

    }

    main().catch(console.error);
}


exports.testInsertPatient = async(req, res) => {
    patientModel.insertPatient("John", "Deep", "templanzamark2002@gmail.com", "9653876383", "111 Juan Luna St.", "20", "Male")
    patientModel.insertPatient("Mark", "SuckerVerg", "templanzamark2003@gmail.com", "9653876383", "111 Juan Luna St.", "25", "Male")
    res.send("success")
}