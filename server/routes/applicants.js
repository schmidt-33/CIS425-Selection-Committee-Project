//
//Handles all the call for the /applicants route to query the applicant_store table
//
const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get('/', controller.getApplicants);
router.post('/', controller.addApplicant);
router.get('/:id', controller.getApplicantById)

module.exports = router;