$(function () {
	const apikey = 'apikey=57f92f2acc1aa8c873560a8e5f1648f0';
	var baseUrl = `http://gateway.marvel.com/v1/public/`;
	var offset = 0;

	$(document).ready(function () {
		get20Characters();
	});

	$('#pesquisa').click(function () {
		var name = $('#inputName').val();
		getCharacter(name);
	});

	function getCharacter(name) {
		$.ajax({
			url: `${baseUrl}characters?nameStartsWith=${name}&${apikey}`,
			type: 'GET',
			dataType: 'JSON',
			success: function (result) {
				var results = result.data.results;
				addLI(results[0].name, results[0].thumbnail);
			},
			error: function (error) {
				console.log(`Error: ${error}`);
			},
		});
	}

	var win = $(window);

	// Each time the user scrolls
	win.scroll(function () {
		// End of the document reached?
		if ($(document).height() - win.height() == win.scrollTop()) {
			// TODO: Adcionar loading gif
			get20Characters()
		}
	});

	function get20Characters() {
		$.ajax({
			url: `${baseUrl}characters?offset=${offset}&${apikey}`,
			type: 'GET',
			dataType: 'JSON',
			success: function (result) {
				let results = result.data.results;
				for (let i = 0; i < results.length; i++) {
					addLI(results[i].name, results[i].thumbnail);
				}
				offset += 20;
			},
			error: function (error) {
				console.log(`Error: ${error}`);
			},
		});
	}

	function addLI(name, backgroundimage) {
		$('#personagens').append(
			$(
				`<li style='background-image: url(${backgroundimage.path}/standard_fantastic.${backgroundimage.extension})'></li>`
			).append($('<h2></h2>').text(name))
		);
	}
});
