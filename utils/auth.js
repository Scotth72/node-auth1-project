module.exports = function(req, res, next) {
	if (req.session.loggedIn) {
		next();
	} else {
		res.status(400).json({ message: 'User must be logged in' });
	}
};
