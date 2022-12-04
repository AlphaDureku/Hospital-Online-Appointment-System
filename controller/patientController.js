const patientModel = require('../Models/Database_Queries/patientQuery')


exports.fetchPatient_Appointments_Using_ID = async(req, res) => {
    const result = await patientModel.fetchPatient_Appointments_Using_ID(req.params.id)
    res.send(result[0])
}