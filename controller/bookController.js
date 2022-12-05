const mail = require('nodemailer')
const patientModel = require('../Models/Object_Models/Patient-info')
const doctorModel = require('../Models/Database_Queries/doctorQuery');
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

exports.renderDoctorList = async(req, res) => {
    res.render('Services/choose-doctor', { layout: 'layouts/sub' })
}


exports.searchDoctor = async(req, res) => {
    let searchOption = {
        Fname: req.query.doctor_Fname,
        Lname: req.query.doctor_Lname,
        Specialization: req.query.specialization,
        doctor_HMO: req.query.doctor_HMO
    }
    console.log(searchOption)
    if (searchOption.Fname == "" && searchOption.Lname == "" && searchOption.Specialization == '' && searchOption.doctor_HMO == '') {
        const result = await doctorModel.getDoctor()
        const schedule = await doctorModel.getSchedule()
        res.render('Services/choose-doctor', { queriedDoctors: result[0], queriedSchedule: schedule[0], layout: 'layouts/sub' })
    } else if ((searchOption.Fname === "" && searchOption.Lname === "") && (searchOption.Specialization != undefined && searchOption.doctor_HMO != undefined)) {
        const result = await doctorModel.getDoctor_Using_Spec_doctor_HMO(searchOption.Specialization, searchOption.doctor_HMO)
        const schedule = await doctorModel.getSchedule_Using_Spec_doctor_HMO(searchOption.Specialization, searchOption.doctor_HMO)
        console.log("get by spec and sub_spec only")
        res.render('Services/choose-doctor', { queriedDoctors: result[0], queriedSchedule: schedule[0], layout: 'layouts/sub' })
    } else if ((searchOption.Fname != undefined || searchOption.Lname != undefined) && (searchOption.Specialization != "" || searchOption.doctor_HMO != "")) {
        const result = await doctorModel.getDoctor_Using_All(searchOption.Fname, searchOption.Lname, searchOption.Specialization, searchOption.doctor_HMO);
        const schedule = await doctorModel.getSchedule_Using_All(searchOption.Fname, searchOption.Lname, searchOption.Specialization, searchOption.doctor_HMO)
        console.log(result[0])
        console.log("get by Name, spec and sub_spec")
        res.render('Services/choose-doctor', { queriedDoctors: result[0], queriedSchedule: schedule[0], layout: 'layouts/sub' })
    } else if (searchOption.Fname != "" && searchOption.Lname != "") {
        const result = await doctorModel.getDoctor_Using_Fname_Lname(searchOption.Fname, searchOption.Lname)
        const schedule = await doctorModel.getSchedule_Using_Fname_Lname(searchOption.Fname, searchOption.Lname)
        console.log("get by Fname Lname")
        res.render('Services/choose-doctor', { queriedDoctors: result[0], queriedSchedule: schedule[0], layout: 'layouts/sub' })
    } else if (searchOption.Lname != "") {
        const result = await doctorModel.getDoctor_Using_Lname(searchOption.Lname)
        const schedule = await doctorModel.getSchedule_Using_Lname(searchOption.Lname)
        console.log(result[0])
        console.log("get by LName")
        console.log(searchOption.Lname)
        console.log(schedule[0])
        res.render('Services/choose-doctor', { queriedDoctors: result[0], queriedSchedule: schedule[0], layout: 'layouts/sub' })
    } else if (searchOption.Fname != "") {
        const result = await doctorModel.getDoctor_Using_Fname(searchOption.Fname)
        const schedule = await doctorModel.getSchedule_Using_Fname(searchOption.Fname)
        console.log(result[0])
        console.log("get by FName")
        console.log(searchOption.Fname)
        res.render('Services/choose-doctor', { queriedDoctors: result[0], queriedSchedule: schedule[0], layout: 'layouts/sub' })
    } else {
        console.log("Undefined")
        res.render('Services/choose-doctor')
    }


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
            subject: "Security Verification", // Subject line
            html: "<b>" + otp + "</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    }

    main().catch(console.error);
}