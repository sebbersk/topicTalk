const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
	body: { type: String, required: true },
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
		},
	},
	date: { type: Date, default: Date.now },
});

mongoose.model('comments', commentSchema);
