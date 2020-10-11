const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', (req, res) => {
	const user = req.body;
	User.findOne({ username: user.username }, (err, foundUser) => {
		if (!err) {
			if (foundUser) {
				bcrypt.compare(user.password, foundUser.password, (err, equal) => {
					if (equal) {
						const token = jwt.sign(
							{
								data: 'TopicTalk',
								exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
							},
							process.env.JWT_SECRET,
						);
						res.status(200).json({
							msg: 'Loggin has been successfull',
							user: foundUser.username,
							token,
						});
					} else {
						res.status(401).json({
							msg: 'Could not find a match for username and password',
							err: true,
						});
					}
				});
			} else {
				res.status(401).json({
					msg: 'Could not find a match for username and password',
					err: true,
				});
			}
		} else
			res.status(500).json({
				msg: 'Something went wrong on our part... Please try again',
				err: true,
			});
	});
});

router.post('/register', (req, res) => {
	const user = req.body;
	User.findOne({ username: user.username }, (err, foundUser) => {
		if (!err) {
			if (foundUser)
				res.status(401).json({
					msg: 'User Already Exists',
					err: true,
				});
			else {
				bcrypt.hash(user.password, 10, (err, hashPassword) => {
					if (!err) {
						user.password = hashPassword;
						const newUser = new User(user);
						newUser.save((err, u) => {
							if (!err) {
								const token = jwt.sign(
									{
										data: 'TopicTalk',
										exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
									},
									process.env.JWT_SECRET,
								);
								res.status(200).json({
									msg: 'Account was successfully registered',
									user: u.username,
									token,
								});
							} else
								res.status(500).json({
									msg: 'Something went wrong on our part... Please try again',
									err: true,
								});
						});
					} else {
						res.status(500).json({
							msg: 'Something went wrong on our part... Please try again',
							err: true,
						});
					}
				});
			}
		} else
			res.status(500).json({
				msg: 'Something went wrong on our part... Please try again',
				err: true,
			});
	});
});

module.exports = router;
