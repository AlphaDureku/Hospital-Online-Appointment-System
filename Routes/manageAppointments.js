const express = require('express');
const router = express.Router();
const patientController = require('../controller/patientController')

router.get('/:id', patientController.fetchPatient_Appointments_Using_ID)



module.exports = router;