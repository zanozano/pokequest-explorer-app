$(document).ready(function () {
	$('form').submit(function (event) {
		event.preventDefault();
		let valueInput = $('#pokemonInput').val();
		if (valueInput != '') {
			$.ajax({
				url: 'https://pokeapi.co/api/v2/pokemon/' + valueInput,
				success: function (data) {
					$('#pokemonInput').val('');
					let number = data.id;
					let name = data.name;
					let image = data.sprites.other.dream_world.front_default;
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
					data.stats.forEach(function (s) {
						estadisticas.push({
							label: s.stat.name,
							y: s.base_stat,
						});
					});

					let ctx = document.getElementById('pokeStats').getContext('2d');
					let chart = new Chart(ctx, {
						type: 'bar',
						data: {
							labels: estadisticas.map(stat => stat.label),
							datasets: [{
								label: 'Estadisticas',
								data: estadisticas.map(stat => stat.y),
								backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color of bars
								borderColor: 'rgba(75, 192, 192, 1)', // Border color of bars
								borderWidth: 1,
							}]
						},
						options: {
							plugins: {
								title: {
									display: true,
									text: 'Estadisticas'
								},
								legend: {
									display: false
								},
							},
							scales: {
								y: {
									beginAtZero: true,
									title: {
										display: true,
										text: 'Valor'
									}
								},
								x: {
									title: {
										display: false,
										text: ''
									}
								}
							}
						}
					});

					//
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
