const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const Comment = mongoose.model('comments');
const auth = require('../helper/auth');
// POST ROUTES //
router.get('/', (req, res) => {
	Post.find()
		.sort({ date: 'desc' })
		.select('-comments')
		.then((posts) => {
			res.status(200).json(posts);
		});
});

router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.populate({ path: 'comments', options: { sort: { date: 'desc' } } })
		.then((post, err) => {
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

router.post('/', auth, async (req, res) => {
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
			res.status(200).json({ msg: 'Your post has been created', id: post._id });
		} catch (e) {
			res.status(500).json({
				msg: 'Something went wrong on our part... Please try again',
				err: true,
			});
		}
	}
	new Post({ title, body }).save().then((post) => {
		res.status(200).json({ msg: 'Your post has been created', id: post._id });
	});
});

router.put('/:id', auth, (req, res) => {
	const { title, body } = req.body;
	Post.findById(req.params.id).then((post) => {
		if (post && post.user.id == req.user) {
			post.title = title;
			post.body = body;
			post.save().then((post) => {
				res.status(200).json({ msg: 'Your post has been updated', id: post._id });
			});
		} else {
			res.status(500).json({
				msg: 'No post found...',
				err: true,
			});
		}
	});
});
router.delete('/:id', auth, (req, res) => {
	Post.findById(req.params.id).then((post) => {
		if (post && post.user.id == req.user) {
			post.comments.forEach((id) => {
				Comment.remove({ _id: id }).then(() => console.log('Comment removed'));
			});
			Post.remove({ _id: req.params.id }).then(() => {
				res.status(200).json({ msg: 'Your post has been deleted', id: post._id });
			});
		} else {
			res.status(500).json({
				msg: 'No post found...',
				err: true,
			});
		}
	});
});
// ^^^ POST ROUTES ^^^//

// COMMENT ROUTES //
router.post('/:id/comment', auth, (req, res) => {
	const { body } = req.body;
	new Comment({ body }).save().then((comment) => {
		Post.findById(req.params.id).then((post) => {
			post.comments.push(comment._id);
			post.save().then(() => {
				res.status(200).json({ msg: 'Comment has been added', id: comment._id });
			});
		});
	});
});
router.delete('/:id/comment/:comment_id', auth, (req, res) => {
	Post.findById(req.params.id).then((post) => {
		if (post) {
			Comment.findById(req.params.comment_id).then((comment) => {
				if (comment && comment.user.id === req.user) {
					const newCommentArr = post.comments.filter((cId) => {
						return cId !== req.params.comment_id;
					});
					post.comments = newCommentArr;
					post.save().then(() => {
						Comment.remove({ _id: req.params.comment_id }).then(() => {
							res.status(200).json({ msg: 'Comment deleted', id: post._id });
						});
					});
				} else {
					res.status(401).json({ msg: 'Not allowed to do that...' });
				}
			});
		} else {
			res.status(500).json({
				msg: 'No post found...',
				err: true,
			});
		}
	});
});

router.put('/:id/comment/:comment_id', auth, (req, res) => {
	const { body } = req.body;
	Comment.findById(req.params.comment_id).then((comment) => {
		if (comment && comment.user.id === req.user) {
			comment.body = body;
			comment.save().then(() => {
				res.status(200).json({ msg: 'Comment Updated', id: req.params.id });
			});
		}
	});
});

module.exports = router;
