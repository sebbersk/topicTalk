const loginForm = document.querySelector('.login');
const regForm = document.querySelector('#w-reg-form');
const userRegex = /^[a-z][a-z0-9]{2,19}$/i;
const passwordRegex = /^[A-Za-z0-9_@#$]{8,20}$/;
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData(loginForm);
	const user = formData.get('username');
	const password = formData.get('password');
	if (userRegex.test(user)) {
		if (passwordRegex.test(password)) {
			console.log('Success Login');
			//Make Request
		} else {
			console.log('Write a valid password');
		}
	} else {
		console.log('Write a valid Username');
	}
});

regForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData(regForm);
	const user = formData.get('username');
	const email = formData.get('email');
	const password = formData.get('password');
	const conPassword = formData.get('conPassword');
	if (password !== conPassword) {
		console.log('Passwords dont match');
		return;
	}
	if (userRegex.test(user)) {
		if (passwordRegex.test(password)) {
			if (emailRegex.test(email)) {
				console.log('Success Register');
			} else {
				console.log('Please input a valid Email');
			}
		} else {
			console.log('Write a valid password');
		}
	} else {
		console.log('Write a valid Username');
	}
});
