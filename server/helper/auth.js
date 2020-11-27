const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = function (req, res, next) {
	//Get token from header
	const token = req.headers['authorization']; //key to token insided header
	if (!token) {
		return res.status(401).json({ msg: 'No token, auth denied' });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.data;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'token is not valid' });
	}
};
