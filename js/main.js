$(function () {
	const apikey = 'apikey=57f92f2acc1aa8c873560a8e5f1648f0';
	var baseUrl = `http://gateway.marvel.com/v1/public/`;
	var text = '';
	var offset = 0;
	$('#btn').click(function () {
		getCharacter('Tony');
	});

	$('#scroll').click(function () {
		get20Characters();
	});

	function getCharacter(name) {
		$.ajax({
			url: `${baseUrl}characters?nameStartsWith=${name}&${apikey}`,
			type: 'GET',
			dataType: 'JSON',
			success: function (result) {
				$('#results').html(result.data.results[0].name);
			},
			error: function (error) {
				console.log(`Error: ${error}`);
			},
		});
	}

	function get20Characters() {
		$.ajax({
			url: `${baseUrl}characters?offset=${offset}&${apikey}`,
			type: 'GET',
			dataType: 'JSON',
			success: function (result) {
				let results = result.data.results;
				for (let i = 0; i < results.length; i++) {
					createArticle(results[i].name);
					// text += `${results[i].name} <br>`
				}
				// $('#results').html(text)
				offset += 20;
			},
			error: function (error) {
				console.log(`Error: ${error}`);
			},
		});
	}

	function createArticle(name) {
		var node;
		var textnode;
		node = document.createElement('article');
		textnode = document.createTextNode(name);
		node.setAttribute('id', name);
		node.setAttribute('class', 'post');
		node.appendChild(textnode);
		document.getElementById('container').appendChild(node);
	}
});
