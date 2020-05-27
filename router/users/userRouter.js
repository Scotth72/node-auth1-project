const router = require('express').Router();
const db = require('./user-model');

function restricted(req, res, next) {
	if (req.session && req.session.loggedIn) {
		next();
	} else {
		res.status(401).json({ you: 'cannot pass' });
	}
}

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
