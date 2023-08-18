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
					let image = data.sprites.other["official-artwork"].front_default;
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

					statsArray = data.stats.map(function (s) {
						return {
							label: s.stat.name,
							stat: s.base_stat,
						};
					});

					$('#pokeInfo').html(`
					<div class="section__pokemon--information">
                    	<div class="section__card">
							<img src="${image}" alt="${name}" />
                    	</div> 
						<div>
							<h4>#${number}</h4>          
							<h5>${capitalizeFirstLetter(name)}</h5>
						</div>
						<div class="section__type">
							${typeInfoArray.map(typeInfo => `<div class="section__chip ${typeInfo.name}">${typeInfo.name}</div>`).join('')}
						</div>
						<button id="toggleChartBtn" class="section__btn" onClick="showChart(statsArray)">Show Stats</button>
					</div>
                	
					<div id="chart" class="d-none section__card">
						<canvas class="section__canvas" id="pokeStats"></canvas>
					</div>
					`);
					$('#pokeInfo').focus();
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

//toggle
function attachToggleChartListener() {
	let toggleChartBtn = document.getElementById('toggleChartBtn');
	if (toggleChartBtn) {
		toggleChartBtn.addEventListener('click', function () {
			showChart(statsArray);
		});
	}
}
document.addEventListener('DOMContentLoaded', function () {
	attachToggleChartListener();
});


//chart
let myChart = null;
function showChart(statsArray) {

	let chart = document.getElementById('chart');
	chart.classList.toggle('d-none');

	let canvas = document.getElementById('pokeStats').getContext('2d');

	if (myChart) {
		myChart.destroy();
	}

	const orderedData = ['hp', 'attack', 'defense', 'special-defense', 'special-attack', 'speed']
		.map(label => statsArray.find(stat => stat.label === label).stat);


	const config = {
		type: 'radar',
		data: {
			datasets: [{
				data: orderedData,
				fill: true,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgb(255, 99, 132)',
				pointBackgroundColor: 'rgb(255, 99, 132)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(255, 99, 132)'
			}],
			labels: ['HP', 'Attack', 'Defense', 'Sp.Def', 'Sp.Atk', 'Speed']
		},
		options: {
			maintainAspectRatio: false,
			responsive: true,
			scales: {
				r: {
					beginAtZero: true,
					pointLabels: {
						font: {
							weight: 'bold',
							color: '#313131',
							size: 14,
						},
						callback: function (value, index, values) {
							return [value, statsArray[index].stat]; // Retorna un arreglo para separar etiqueta y valor
						},
					},
					ticks: {
						display: false,
					},
					grid: {
						display: true,
					},
				},
			},
			plugins: {
				legend: {
					display: false,
				},
			},
		},
	};
	myChart = new Chart(canvas, config);
}

//autocomplete
document.addEventListener('DOMContentLoaded', function () {
	let input = document.getElementById('pokemonInput');
	let awesomplete = new Awesomplete(input, {
		minChars: 2,
		maxItems: 10,
		list: [],
	});

	let searchTimeout;

	input.addEventListener('input', function () {
		let inputValue = input.value.trim();
		clearTimeout(searchTimeout);

		searchTimeout = setTimeout(function () {
			if (inputValue.length >= awesomplete.minChars) {
				fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000`)
					.then((response) => response.json())
					.then((data) => {
						var pokemonNames = data.results
							.map((pokemon) => pokemon.name)
							.filter((name) => name.includes(inputValue.toLowerCase()));
						awesomplete.list = pokemonNames;
					})
					.catch((error) => {
						console.error('Error fetching Pokémon data:', error);
					});
			} else {
				awesomplete.list = [];
			}
		}, 300);
	});
});

