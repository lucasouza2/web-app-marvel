$(function () {
	const apikey = '&apikey=57f92f2acc1aa8c873560a8e5f1648f0';
	var baseUrl = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=Tony`;
	$('#btn').click(function () {
		$.ajax({
			url: baseUrl+apikey,
			type: 'GET',
			dataType: 'JSON',
			success: function (result) {
				$('#results').html(result.data.results[0].name);
			},
			error: function (error) {
				console.log(`Error: ${error}`);
			},
		});
	});
});
