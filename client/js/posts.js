const postContainer = document.querySelector('.post-container');

listPosts();

function listPosts() {
	fetch('http://localhost:3000/post/', {
		headers: { Authorization: localStorage.getItem('token') },
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			data.forEach((post) => {
				let div = document.createElement('div');
				div.className = 'card mb-3';
				div.innerHTML = `<div class="row no-gutters">
                ${
					post.url
						? `<div class="col-md-4"> 
						<a class='img_url' href=${post.url} target='_blank'>
                            ${
								post.url_img
									? `<img
                            src=${post.url_img}
                            class='posts-img'
                            alt='...'
                        />`
									: `<div class="posts-img">
                        <i class="fas fa-link fa-3x"></i>
                    </div>`
							} 
							
						</a>`
						: ''
				}

                </div>
                <div class="${post.url ? 'col-md-8' : ''}">
                    <a
                        href="./post.html?id=${post._id}"
                        style="text-decoration: none; color: black"
                    >
                        <div class="card-body">
                            <h5 class="card-title">
                                ${post.title}
                            </h5>
                            <p class="card-text">
                                ${post.body.slice(100)}...
                            </p>
                            <p class="card-text">
                                <small class="text-muted">${new Date(post.date)}</small>
                            </p>
                        </div>
                    </a>
                </div>
            </div>`;
				postContainer.appendChild(div);
			});
		});
}
