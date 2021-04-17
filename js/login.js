$(function () {
	$('#submit').click(function () {
        var email = $('#email').val();
        var senha = $('#senha').val();
		login(email, senha);
	});

	function login(email, password) {
		$.ajax({
			url: `http://localhost:3000/login`,
			type: 'POST',
			dataType: 'JSON',
			data: { email: email, password: password },
		});
	}
});
