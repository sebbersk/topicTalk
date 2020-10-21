const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('posts');

router.get('/', (req, res) => {
	Post.find()
		.sort({ date: 'desc' })
		.select('-comments')
		.then((posts) => {
			res.status(200).json(posts);
		});
});

router.get('/:id', (req, res) => {
	res.json({ msg: 'Here is your post' });
});

router.post('/', (req, res) => {
	res.json({ msg: 'Your post have been created' });
});

router.put('/:id', (req, res) => {
	res.json({ msg: 'Updated your post' });
});
router.delete('/:id', (req, res) => {
	res.json({ msg: 'Post deleted' });
});

module.exports = router;
