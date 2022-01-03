
const pool = require('../db');

//------------------------------------------------------------
//-----------------------REGISTRAR CALLS----------------------
//------------------------------------------------------------

const getRegistrar = (req, res) => {
	pool.query("SELECT * FROM registrar", (error, results) =>{
		if(error) throw err;
		res.status(200).json(results.rows);
	})
}

const getRegistrarById = (req, res) => {
	const id = parseInt(req.params.id);

	pool.query("SELECT * FROM registrar WHERE studentId = $1", [id], (error, results) =>{
		if(error) throw err;
		res.status(200).json(results.rows);
	})
}

const getBillbyId = (req, res) => {
	const id = parseInt(req.params.id);

	pool.query("SELECT bill FROM registrar WHERE studentId = $1", [id], (error, results) =>{
		if(error) throw err;
		res.status(200).json(results.rows);
	})
}
//------------------------------------------------------------
//--------------------APPLICANT_STORE CALLS-------------------
//------------------------------------------------------------
const getApplicants = (req, res) => {
	pool.query("SELECT * FROM applicant_store", (error, results) =>{
		if(error) throw err;
		res.status(200).json(results.rows);
	})
}

const addApplicant = (req, res) => {
	const {studentid, firstname, lastname, phonenumber, email, gender, date_of_birth, class_status, gpa, current_credits} = req.body;

	pool.query("INSERT INTO applicant_store VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [studentid, firstname, lastname, phonenumber, email, gender, date_of_birth, class_status, gpa, current_credits], (error, results) =>{
		if(error) throw error;
		res.status(201).send("Applicant added to applicant_store");
	})
};

const getApplicantById = (req, res) => {
	const id = parseInt(req.params.id);

	pool.query("SELECT * FROM registrar WHERE studentId = $1", [id], (error, results) =>{
		if(error) throw err;
		res.status(200).json(results.rows);
	})
}

//------------------------------------------------------------
//-----------------------AWARDED CALLS------------------------
//------------------------------------------------------------

const getAwarded = (req, res) => {
	pool.query("SELECT * FROM awarded_store", (error, results) =>{
		if(error) throw err;
		res.status(200).json(results.rows);
	})
}

const addAwarded = (req, res) => {
	const {studentid, firstname, lastname, amount} = req.body;

	pool.query("INSERT INTO awarded_store VALUES ($1, $2, $3, $4)", [studentid, firstname, lastname, amount], (error, results) =>{
		if(error) throw error;
		res.status(201).send("Applicant added to awarded_store");
	})
};





module.exports = {
	getRegistrar,
	getRegistrarById,
	getBillbyId,
	addApplicant,
	getApplicants,
	getApplicantById,
	getAwarded,
	addAwarded,
}