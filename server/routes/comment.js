const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = mongoose.model('comments');

router.post('/', (req, res) => {
	res.json({ msg: 'Comment created' });
});

router.put('/', (req, res) => {
	res.json({ msg: 'Comment edited' });
});

router.delete('/', (req, res) => {
	res.json({ msg: 'Comment deleted' });
});

module.exports = router;
