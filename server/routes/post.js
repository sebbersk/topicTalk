const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
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
	Post.findById(req.params.id, (err, post) => {
		if (!err) {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(400).json({
					msg: 'Nothing found',
					err: true,
				});
			}
		} else {
			res.status(500).json({
				msg: 'Something went wrong on our part... Please try again',
				err: true,
			});
		}
	});
});

router.post('/', async (req, res) => {
	const { title, body, url } = req.body;
	if (url) {
		try {
			const data = await axios(url);
			const html = data.data;
			const $ = cheerio.load(html);
			const url_title =
				$(`meta[property="og:title"]`).attr('content') ||
				$('title').text() ||
				$('h1').text() ||
				'';
			const url_img = $(`meta[property="og:image"]`).attr(`content`) || '';
			const url_desc =
				$(`meta[property="og:description"]`).attr(`content`) ||
				$(`meta[name="description"]`).attr('content') ||
				'';
			const newPost = new Post({ title, body, url, url_title, url_img, url_desc });
			const post = await newPost.save();
			res.status(200).json({ msg: 'Your post have been created', id: post._id });
		} catch (e) {
			if (e.errno === 'ECONNREFUSED') {
				new Post({ title, body }).save().then((post) => {
					res.status(200).json({ msg: 'Your post have been created', id: post._id });
				});
			}
		}
	}
	new Post({ title, body }).save().then((post) => {
		res.status(200).json({ msg: 'Your post have been created', id: post._id });
	});
});

router.put('/:id', (req, res) => {
	res.json({ msg: 'Updated your post' });
});
router.delete('/:id', (req, res) => {
	res.json({ msg: 'Post deleted' });
});

module.exports = router;
