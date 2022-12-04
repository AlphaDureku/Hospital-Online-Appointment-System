const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');



router.get('/clinic', bookController.renderClinicPage)
router.get('/outpatient', bookController.renderOutpatientPage)
router.get('/patient-forms', bookController.renderPatientForm)
router.get('/choose-doctor', bookController.renderDoctorList)
router.get('/search-doctor', bookController.searchDoctor)
router.post('/send-otp', bookController.sendOTP)
router.post('/verify-otp', bookController.compareOTP)
router.post('/getPatient-Info', bookController.getPatientInfo)


module.exports = router;