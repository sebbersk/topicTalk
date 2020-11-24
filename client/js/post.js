const query = window.location.search;
const urlParam = new URLSearchParams(query);
const id = urlParam.get('id');
const div = document.querySelector('.container');
displayPost();
function displayPost() {
	fetch(`http://localhost:3000/post/${id}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			const contentDiv = document.createElement('div');
			contentDiv.className = 'post';
			contentDiv.innerHTML = `
				<div class="row">
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
                                ${
									data.url_desc
										? `<p class="card-text"> ${truncate(data.url_desc)}  </p>`
										: ''
								}
                           
                        </div>
                        </a>
                    </div>
                </div>`
							: ''
					}
				
				</div>
			<div class="row">
				<div class="col-md-8">
					<h3>Comments</h3>
                    <div class="comments">
                    ${
						data.comments.length
							? data.comments.forEach((comment) => {
									`<div class="card border-secondary mb-3">
                        <div class="card-body text-secondary">
                            <p class="card-text">
                                Some quick example text to build on the card title and make up
                                the bulk of the card's content.
                            </p>
                        </div>
                        <div class="card-footer">
                            <span>Written by <b>User</b></span> <span>DATE</span>
                        </div>
                    </div>`;
							  })
							: ''
					}
						
					</div>
				</div>
			</div>
        </div>`;
			div.appendChild(contentDiv);
		});
}
function truncate(s) {
	if (s.length > 60) {
		return s.slice(0, 60) + '...';
	}
	return s;
}
