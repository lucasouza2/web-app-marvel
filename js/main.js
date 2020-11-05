$(function () {
	var win = $(window);
	const apikey = 'apikey=57f92f2acc1aa8c873560a8e5f1648f0';
	var baseUrl = `https://gateway.marvel.com/v1/public/`;
	var offset = 0;

	$(document).ready(function () {
		// $('.detalhesPersonagem').hide();
		load20Characters();
	});

	$('#home').click(function () {
		$('#todosPersonagens').show();
		$('#pesquisaPersonagens').html('');
	});

	$('#inputName').on('keypress', function (e) {
		if (e.which == 13) {
			$('#pesquisa').click()
		}
	});

	$('#pesquisa').click(function () {
		var name = $('#inputName').val();
		if (name === '') {
			return;
		}
		$('#todosPersonagens').hide();
		$('#pesquisaPersonagens').html('');
		findCharactersByName(name);
	});

	$('#todosPersonagens').on('click', 'li', function (event) {
		getCharacterByID(event.target.id)
	});

	$('#pesquisaPersonagens').on('click', 'li', function (event) {
		getCharacterByID(event.target.id);
	});

	function getCharacterByID(id) {
		$.ajax({
			url: `${baseUrl}characters/${id}?${apikey}`,
			type: 'GET',
			dataType: 'JSON',
			success: function (result) {
				console.log(result);
			},
			error: function (error) {
				console.log(`Error: ${error}`);
			},
		});
	}

	function findCharactersByName(name) {
		$('#loadingSvg').show();
		$.ajax({
			url: `${baseUrl}characters?nameStartsWith=${name}&${apikey}`,
			type: 'GET',
			dataType: 'JSON',
			success: function (result) {
				var results = result.data.results;
				for (let i = 0; i < results.length; i++) {
					addLI('pesquisaPersonagens', results[i]);
				}
				$('#loadingSvg').hide();
			},
			error: function (error) {
				console.log(`Error: ${error}`);
			},
		});
	}

	// Each time the user scrolls
	win.scroll(function () {
		// End of the document reached?
		if ($(document).height() - win.height() == win.scrollTop() && $('#todosPersonagens').is(':visible')) {
			load20Characters();
		}
	});

	function load20Characters() {
		$('#loadingSvg').show();
		$.ajax({
			url: `${baseUrl}characters?offset=${offset}&${apikey}`,
			type: 'GET',
			dataType: 'JSON',
			success: function (result) {
				let results = result.data.results;
				for (let i = 0; i < results.length; i++) {
					addLI('todosPersonagens', results[i]);
				}
				offset += 20;
				$('#loadingSvg').hide();
			},
			error: function (error) {
				console.log(`Error: ${error}`);
			},
		});
	}

	function addLI(div, personagem) {
		$(`#${div}`).append(
			$(
				`<li id='${personagem.id}'style='background-image: url(${personagem.thumbnail.path}/standard_fantastic.${personagem.thumbnail.extension})'></li>`
			).append($('<h2></h2>').text(personagem.name))
		);
	}
});
