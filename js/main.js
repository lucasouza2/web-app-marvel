$(function () {
	var win = $(window);
	const apikey = 'apikey=57f92f2acc1aa8c873560a8e5f1648f0';
	var baseUrl = `https://gateway.marvel.com/v1/public/`;
	var offset = 0;

	$(document).ready(function () {
		$('.detalhesPersonagem').hide();
		load20Characters();
	});

	$('#home').click(function () {
		$('#todosPersonagens').show();
		$('#pesquisaPersonagens').html('');
	});

	$('#inputName').on('keypress', function (e) {
		if (e.which == 13) {
			$('#pesquisa').click();
		}
	});

	$('#detalhesFechar').click(function () {
		$('.detalhesPersonagem').hide();
		limparDiv()
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
		getCharacterByID(event.target.id);
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
				$('.detalhesPersonagem').show();
				$('.detalhesPersonagem .loadingSvg').show();
				construirDivDetalhes(result.data.results[0]);
				$('.detalhesPersonagem .loadingSvg').hide();
			},
			error: function (error) {
				console.log(id);
				console.log(`Error: ${JSON.stringify(error)}`);
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
			).append($(`<h2 id='${personagem.id}'></h2>`).text(personagem.name))
		);
	}

	function construirDivDetalhes(personagem) {
		limparDiv();
		$('.background').append(
			$(`<img
						id="backgroundImage"
						src="${personagem.thumbnail.path}/portrait_incredible.${personagem.thumbnail.extension}"
					/>`)
		);
		$('#h1NomePersonagem').text(personagem.name);
		let series = personagem.series.items;
		let seriesCount = personagem.series.available;
		let comics = personagem.comics.items;
		let comicsCount = personagem.comics.available;
		let stories = personagem.stories.items;
		let storiesCount = personagem.stories.available;
		for (let i = 0; i < series.length; i++) {
			$('#listaSeries').append($(`<li></li>`).append(series[i].name));
		}
		if (seriesCount > 20) {
			$('#listaSeries').append($(`<li></li>`).append(`...`));
		}

		for (let i = 0; i < comics.length; i++) {
			$('#listaComics').append($(`<li></li>`).append(comics[i].name));
		}
		if (comicsCount > 20) {
			$('#listaComics').append($(`<li></li>`).append(`...`));
		}

		for (let i = 0; i < stories.length; i++) {
			$('#listaStories').append($(`<li></li>`).append(stories[i].name));
		}
		if (storiesCount > 20) {
			$('#listaStories').append($(`<li></li>`).append(`...`));
		}
	}

	function limparDiv() {
		$('#listaSeries').html('');
		$('#listaComics').html('');
		$('#listaStories').html('');
		$('.background').html('');
	}
});
