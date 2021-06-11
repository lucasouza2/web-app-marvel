$(function () {
	var win = $(window);
	const apikey = 'apikey=57f92f2acc1aa8c873560a8e5f1648f0';
	var baseUrl = `https://gateway.marvel.com/v1/public/`;
	var offset = 0;
	var logado = false;
	var user = 0;

	$(document).ready(function () {
		checkForSession();
	});

	function loadFavoritiesCharacters() {
		$('#loadingSvg').show();
		$.ajax({
			url: `http://localhost:3000/favorities`,
			type: 'GET',
			dataType: 'JSON',
			data: { user_id: user },
			success: function (result) {
				for (let i = 0; i < result.length; i++) {
					getCharacterByID(result[i]['hero_id']);
				}
			},
		});
		$('#loadingSvg').hide();
	}

	function addLI(div, personagem) {
		$(`#${div}`).append(
			$(
				`<li id='${personagem.id}'style='background-image: url(${personagem.thumbnail.path}/standard_fantastic.${personagem.thumbnail.extension})'></li>`
			).append($(`<h2 id='${personagem.id}'></h2>`).text(personagem.name))
		);
	}

	function getCharacterByID(id) {
		$.ajax({
			url: `${baseUrl}characters/${id}?offset=${offset}&${apikey}`,
			type: 'GET',
			dataType: 'JSON',
			success: function (result) {
				addLI('todosPersonagens', result.data.results[0]);
			},
		});
	}

	function checkForSession() {
		var token = localStorage.getItem('token');
		var result = $.ajax({
			url: `http://localhost:3000/session`,
			type: 'GET',
			dataType: 'JSON',
			data: { sid: token },
		}).always(function name() {
			if (result['status'] != 200) {
				$('#perfil').text('Fazer login');
			} else {
				logado = true;
				user = result['responseJSON'];
				$('.detalhesPersonagem').hide();
				loadFavoritiesCharacters();
			}
		});
	}
});
