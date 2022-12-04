const doctorModel = require('../Models/Database_Queries/doctorQuery');

exports.renderHomePage = async(req, res) => {
    res.render('home/index')

}
exports.renderDoctorsDirectory = async(req, res) => {
    let searchOption = {
        Fname: req.query.doctor_Fname,
        Lname: req.query.doctor_Lname,
        Specialization: req.query.specialization,
        doctor_HMO: req.query.doctor_HMO
    }
    console.log(searchOption.Fname)
    if (searchOption.Fname == "" && searchOption.Lname == "" && searchOption.Specialization == '' && searchOption.doctor_HMO == '') {
        const result = await doctorModel.getDoctor()
        const schedule = await doctorModel.getSchedule()
        res.render('home/index', { queriedDoctors: result[0], queriedSchedule: schedule[0] })
    } else if ((searchOption.Fname === "" && searchOption.Lname === "") && (searchOption.Specialization != undefined && searchOption.doctor_HMO != undefined)) {
        const result = await doctorModel.getDoctor_Using_Spec_doctor_HMO(searchOption.Specialization, searchOption.doctor_HMO)
        const schedule = await doctorModel.getSchedule_Using_Spec_doctor_HMO(searchOption.Specialization, searchOption.doctor_HMO)
        console.log("get by spec and sub_spec only")
        res.render('home/index', { queriedDoctors: result[0], queriedSchedule: schedule[0] })
    } else if ((searchOption.Fname != undefined || searchOption.Lname != undefined) && (searchOption.Specialization != "" || searchOption.doctor_HMO != "")) {
        const result = await doctorModel.getDoctor_Using_All(searchOption.Fname, searchOption.Lname, searchOption.Specialization, searchOption.doctor_HMO);
        const schedule = await doctorModel.getSchedule_Using_All(searchOption.Fname, searchOption.Lname, searchOption.Specialization, searchOption.doctor_HMO)
        console.log(result[0])
        console.log("get by Name, spec and sub_spec")
        res.render('home/index', { queriedDoctors: result[0], queriedSchedule: schedule[0] })
    } else if (searchOption.Fname != "" && searchOption.Lname != "") {
        const result = await doctorModel.getDoctor_Using_Fname_Lname(searchOption.Fname, searchOption.Lname)
        const schedule = await doctorModel.getSchedule_Using_Fname_Lname(searchOption.Fname, searchOption.Lname)
        console.log("get by Fname Lname")
        res.render('home/index', { queriedDoctors: result[0], queriedSchedule: schedule[0] })
    } else if (searchOption.Lname != "") {
        const result = await doctorModel.getDoctor_Using_Lname(searchOption.Lname)
        const schedule = await doctorModel.getSchedule_Using_Lname(searchOption.Lname)
        console.log(result[0])
        console.log("get by LName")
        console.log(searchOption.Lname)
        console.log(schedule[0])
        res.render('home/index', { queriedDoctors: result[0], queriedSchedule: schedule[0] })
    } else if (searchOption.Fname != "") {
        const result = await doctorModel.getDoctor_Using_Fname(searchOption.Fname)
        const schedule = await doctorModel.getSchedule_Using_Fname(searchOption.Fname)
        console.log(result[0])
        console.log("get by FName")
        console.log(searchOption.Fname)
        res.render('home/index', { queriedDoctors: result[0], queriedSchedule: schedule[0] })
    } else {
        console.log("Undefined")
        res.render('home/index')
    }
}

exports.getProfile = async(req, res) => {
    const result = await doctorModel.getOneDoctor(req.params.id)
    res.render('Doctor/Profile', { queriedDoctors: result[0], layout: "layouts/sub" })
}



// name blank, spec !blank, sub spec, !blank else 
// name !blank, spec !blank or sub sp,