const router = require('express').Router();
const bcrypt = require('bcrypt');

const db = require('./users/user-model');

router.post('/register', (req, res) => {
	const hash = bcrypt.hashSync(req.body.password, 25);
	req.body.password = hash;
	db
		.insert(req.body)
		.then((response) => {
			res.status(201).json(response);
		})
		.catch((error) => {
			res.status(500).json(error.message);
		});
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	db
		.getBy({ username })
		.then(([ found ]) => {
			console.log(found);
			if (found && bcrypt.compareSync(password, found.password)) {
				req.session.login = true;
				res.status(200).json(found);
			} else {
				res.status(401).json({ message: 'Invalid username or password' });
			}
		})
		.catch((error) => {
			res.status(500).json(error.message);
		});
});

module.exports = router;
