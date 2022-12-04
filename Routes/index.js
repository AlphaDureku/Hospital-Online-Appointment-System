const express = require('express');
const router = express.Router();
const searchController = require('../controller/searchController');
const trackAppointmentController = require('../controller/trackAppointmentController')

router.get('/', searchController.renderHomePage)

router.get('/doctors-directory', searchController.renderDoctorsDirectory)

router.get('/patient-directory', trackAppointmentController.renderPatientDirectory)

router.post('/send-OTP', trackAppointmentController.sendEmailOtp)

router.post('/verify', trackAppointmentController.fetchPatient_OTP)

router.post('/testInsertPatient', trackAppointmentController.testInsertPatient)

module.exports = router;