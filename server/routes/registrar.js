//
//Handles all the call for the /registrar route to query the registrar table
//

const express = require('express')
const controller = require('./controller')

const router = express.Router()

//Registrar queries
router.get('/', controller.getRegistrar);
router.get('/:id', controller.getRegistrarById);
router.get('/bill/:id', controller.getBillbyId);

module.exports = router;