const express = require('express');
const db = require('./user-model');

const router = express.Router();

router.get('/', (req, res) => {
	db
		.get()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(500).json(error.message);
		});
});

module.exports = router;
