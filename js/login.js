$(function () {
	$('#login').click(function () {
		var email = $('#email').val().toLowerCase();
		var senha = $('#senha').val();
		if (email == '') {
			$('#validate_email').text('Digite seu e-mail!').show().fadeOut(4000);
			return;
		}

		if (senha == '') {
			$('#validate_senha').text('Digite sua senha!').show().fadeOut(4000);
			return;
		}

		if (!validateEmail(email)) {
			return $('#validate_email').text('E-mail não válido!').show().fadeOut(4000);
		}

		login(email, senha);
	});

	$('#cadastrar').click(function () {
		var email = $('#email').val().toLowerCase();
		var senha = $('#senha').val();
		if (email == '') {
			$('#validate_email').text('Digite seu e-mail!').show().fadeOut(4000);
			return;
		}

		if (senha == '') {
			$('#validate_senha').text('Digite sua senha!').show().fadeOut(4000);
			return;
		}

		if (!validateEmail(email)) {
			return $('#validate_email').text('E-mail não válido!').show().fadeOut(4000);
		}

		cadastrar(email, senha);
	});

	function validateEmail(email) {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	function login(email, password) {
		var user = $.ajax({
			url: `http://localhost:3000/user`,
			type: 'GET',
			dataType: 'JSON',
			data: { email: email },
		}).always(function () {
			if (user['status'] == 204) {
				return $('#validate_form').text('E-mail não existe!').show().fadeOut(4000);
			}
		});
		var login = $.ajax({
			url: `http://localhost:3000/login`,
			type: 'POST',
			dataType: 'JSON',
			data: { email: email, password: password },
		}).always(function name() {
			if (login['status'] == 401) {
				return $('#validate_form').text('E-mail ou senha errados!').show().fadeOut(4000);
			} else if (login['status'] == 202 || login['status'] == 304) {
				localStorage.setItem('token', login['responseJSON']['token']);
				localStorage.setItem('email', email);
				return location.href = 'index.html';
			}
		});
	}

	function cadastrar(email, password) {
		var user = $.ajax({
			url: `http://localhost:3000/user`,
			type: 'POST',
			dataType: 'JSON',
			data: { email: email, password: password },
		}).always(function () {
			if (user['status'] == 201) {
				return $('#validate_form').text('Cadastrado com sucesso!').show().fadeOut(4000);
			} else if (user['status'] == 400) {
				return $('#validate_form').text('Email já existe!').show().fadeOut(4000);
			}
		});
	}
});
