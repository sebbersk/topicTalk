const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TopicTalk', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
require('./models/User');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Hello',
	});
});
app.use('/auth', authRoutes);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
