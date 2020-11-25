const query = window.location.search;
const urlParam = new URLSearchParams(query);
const id = urlParam.get('id');
const div = document.querySelector('.post');
const commentCon = document.querySelector('.comments');
console.log(commentCon);
displayPost();

async function displayPost() {
	const res = await fetch(`http://localhost:3000/post/${id}`);
	const data = await res.json();
	console.log(data);
	const contentDiv = document.querySelector('.post-row');
	contentDiv.innerHTML = `
				<div class="col-md-8">
					<div class="card border-info mb-3">
						<div class="card-header">${data.title}</div>
						<div class="card-body text-info">
							<p class="card-text">
								${data.body}
							</p>
						</div>
					</div>
				</div>
				${
					data.url
						? `<div class="col-md-4">
				<div class="card bg-white text-white">
					${
						data.url_img
							? `
								<img
					src=${data.url_img}
					class="card-img"
					alt="..."
				/>`
							: `<div class="posts-img">
							<a class="post-url"href=${data.url} target="_blank" >
							<i class="fas fa-link fa-3x"></i>
							
							
						</div>`
					}
					<a class="post-url" href=${data.url} target="_blank" >
					<div class="card-img-overlay">
					
					${data.url_title ? `<h5 class="card-title">${data.url_title}</h5>` : ''}
						
						<p class="card-text">
							${data.url_desc ? `<p class="card-text"> ${truncate(data.url_desc)}  </p>` : ''}
						
					</div>
					</a>
				</div>
			</div>`
						: ''
				}
	`;
	data.comments.forEach((comment) => {
		appendComment(comment);
	});
}

function truncate(s) {
	if (s.length > 60) {
		return s.slice(0, 60) + '...';
	}
	return s;
}
function appendComment(comment) {
	const comm = document.createElement('div');
	comm.className = 'card border-secondary mb-3';
	comm.innerHTML = `
	<div class="card-body text-secondary">
		<p class="card-text">
		${comment.body}
		</p>
	</div>
	<div class="card-footer">
		<span>Written by <b>User</b></span> <span>DATE</span>
	</div>`;
	commentCon.appendChild(comm);
}
