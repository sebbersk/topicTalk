const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const Posts = [
	{
		title: 'WOW Algo',
		body:
			'hjasdkola kasdkas kas kdlasdkaskdlaskdalsd jdksaj djskadj sajdksa jdksadj askdj kasjdask dj',
		date: Date.now(),
		url: 'https://www.bbc.com/news/election-us-2020-54334173',
		url_title:
			'Knuth–Morris–Pratt (KMP) Pattern Matching Substring Search - First Occurrence Of Substring',
		url_img: 'https://i.ytimg.com/vi/BXCEFAzhxGY/maxresdefault.jpg',
		url_desc:
			'Free 5-Day Mini-Course: https://backtobackswe.com Try Our Full Platform: https://backtobackswe.com/pricing 📹 Intuitive Video Explanations 🏃 Run Code As You L...',
		topic: 'CS',
	},
	{
		title: 'Elections 2020...',
		body:
			'hjasdkola kasdkas kas kdlasdkaskdlaskdalsd jdksaj djskadj sajdksa jdksadj askdj kasjdask dj',
		date: Date.now(),
		url: 'https://www.bbc.com/news/election-us-2020-54334173',
		url_title: 'US election 2020: The other 1,214 candidates running for president',
		url_img:
			'https://ichef.bbci.co.uk/news/1024/branded_news/161A5/production/_114833509_brockpiercemarkcharlesjadesimmons.jpg',
		url_desc:
			'What unites a concert pianist, an IT technician and a crypto billionaire? The 2020 White House race.',
		topic: 'Politics',
	},
	{
		title: 'Hmm',
		body:
			'hjasdkola kasdkas kas kdlasdkaskdlaskdalsd jdksaj djskadj sajdksa jdksadj askdj kasjdask dj',
		date: Date.now(),
		url: 'https://www.bbc.com/news/election-us-2020-54334173',
		topic: 'Random',
	},
	{
		title: 'Hmm',
		body:
			'hjasdkola kasdkas kas kdlasdkaskdlaskdalsd jdksaj djskadj sajdksa jdksadj askdj kasjdask dj',
		date: Date.now(),
		topic: 'Random',
	},
];

module.exports = function () {
	Posts.forEach((post) => {
		new Post(post).save().then((p) => {
			// console.log(iidea);
		});
	});
};
