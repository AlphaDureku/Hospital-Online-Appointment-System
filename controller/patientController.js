const patientModel = require('../Models/Database_Queries/patientQuery')


exports.fetchPatient_Appointments_Using_ID = async(req, res) => {
    const result = await patientModel.fetchPatient_Appointments_Using_ID(req.params.id)
    console.log(result[0])
    res.render('Patient/Appointments', { queriedAppointments: result[0], layout: 'layouts/sub' })
}