const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');



router.get('/clinic', bookController.renderClinicPage)
router.get('/outpatient', bookController.renderOutpatientPage)


module.exports = router;