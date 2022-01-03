//
//Handles all the call for the /awarded route to query the award_store table
//
const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.get('/', controller.getAwarded);
router.post('/', controller.addAwarded);


module.exports = router;