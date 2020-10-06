const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');

router.post('/login', (req, res) => {
	console.log(req.body);
	res.json({ msg: 'Logged in' });
});

router.post('/register', (req, res) => {
	const user = req.body;
	const newUser = new User(user);
	newUser.save().then((u) => console.log(u));
	res.json({ msg: 'Logged in' });
});

module.exports = router;
