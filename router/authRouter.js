const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const { isValid } = require('./users/user-service');

const db = require('./users/user-model');

router.post('/register', (req, res) => {
	const credentials = req.body;

	if (isValid(credentials)) {
		const rounds = process.env.BCRYPT_ROUNDS || 8;

		const hash = bcryptjs.hashSync(credentials.password, rounds);
		credentials.password = hash;
		db
			.insert(credentials)
			.then((user) => {
				res.status(201).json({ data: user });
			})
			.catch((error) => {
				res.status(500).json(error.message);
			});
	} else {
		res.status(400).json({ message: 'Please provide username and password' });
	}
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;
	db
		.getBy({ username })
		.then(([ found ]) => {
			console.log(found);
			if (found && bcryptjs.compareSync(password, found.password)) {
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
