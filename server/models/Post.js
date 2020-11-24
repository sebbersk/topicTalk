const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	url: { type: String },
	url_title: { type: String },
	url_img: { type: String },
	url_desc: { type: String },
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
		},
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'comments',
		},
	],
	date: { type: Date, default: Date.now },
});
mongoose.model('posts', postSchema);
