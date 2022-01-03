const Pool = require('pg').Pool;

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database:"postgres",
	password: "schmidt6",
	port: 5432,
});

module.exports = pool;