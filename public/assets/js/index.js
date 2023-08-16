$(document).ready(function () {
	$('form').submit(function (event) {
		event.preventDefault();
		let valueInput = $('#pokemonInput').val();
		if (valueInput != '') {
			$.ajax({
				url: 'https://pokeapi.co/api/v2/pokemon/' + valueInput,
				success: function (data) {
					let number = data.id;
					let name = data.name;
					let image = data.sprites.front_default;
					let types = data.types;

					function capitalizeFirstLetter(string) {
						return string.charAt(0).toUpperCase() + string.slice(1);
					}

					let typeInfoArray = types.map(function (type) {
						return {
							name: type.type.name,
							url: type.type.url
						};
					});

					console.log(typeInfoArray);


					$('#pokeInfo').html(`
                    <div class="section__card">
					<img src="${image}" />
                    </div> 
					<h4>#${number}</h4>          
					<h5>${capitalizeFirstLetter(name)}</h5>
					<div class="section__type">
					${typeInfoArray.map(typeInfo => `<div class="section__chip ${typeInfo.name}">${typeInfo.name}</div>`).join('')}
					</div>
                `);
					//
					let estadisticas = [];
					console.log(data);
					data.stats.forEach(function (s) {
						estadisticas.push({
							label: s.stat.name,
							y: s.base_stat,
						});
					});

					let config = {
						animationEnabled: true,
						title: {
							text: 'Estadisticas',
						},
						axisY: {
							title: 'Valor',
						},
						axisX: {
							title: '',
						},
						data: [
							{
								type: 'column',
								dataPoints: estadisticas,
							},
						],
					};

					let chart = new CanvasJS.Chart('pokeStats', config);
					chart.render();
				},
				error: function () {
					Swal.fire({
						icon: 'error',
						title: 'Pokemon Not Found',
						text: 'The entered value does not correspond to a valid Pokemon.',
					});
				}
			});
		} else {
			Swal.fire({
				icon: 'warning',
				title: 'Enter a value',
				text: 'Please enter a name or number.',
			})
		}
	});
});
