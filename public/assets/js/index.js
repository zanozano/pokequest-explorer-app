// Evolution
function getAllEvolutions(evol, selectedPokemon) {
	const evolutions = [];

	function recursiveEvolutions(currentChain) {
		const species = currentChain.species.name;
		if (selectedPokemon !== species) {
			evolutions.push(species);
		}
		currentChain.evolves_to.forEach(nextEvolution => {
			recursiveEvolutions(nextEvolution);
		});
	}

	recursiveEvolutions(evol);

	return displayEvolutions(evolutions);
}


// Render Pokemon
function getEvolutions(species, selectedPokemon) {
	fetch(species.url)
		.then(response => response.json())
		.then(data => {
			fetch(data.evolution_chain.url)
				.then(response => response.json())
				.then(evol => {
					getAllEvolutions(evol.chain, selectedPokemon);
				})
				.catch('Error fetching evolution chain data');
		})
		.catch('Error fetching species data');
}


// Display Evolutions
function displayEvolutions(evolutions) {
	const pokeIconContainer = document.getElementById('pokeIcon');
	let iconsHTML = '';

	function renderNextImage(index) {
		if (index >= evolutions.length) {
			return;
		}
		//spinner
		const pokemonName = evolutions[index];
		const spinnerHTML = '<div class="section__container--icon"><div class="spinner-border" role = "status"></div></div>';
		pokeIconContainer.innerHTML = spinnerHTML;

		fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
			.then(response => response.json())
			.then(data => {
				const pokemonImage = data.sprites.front_default;

				iconsHTML += `
          <div class="section__container--icon" data-hover="${data.id}">
            <img class="section__icon" src="${pokemonImage}" alt="${data.name}" onclick="fetchPokemonInfo(${data.id})" />	
          </div>
        `;

				pokeIconContainer.innerHTML = iconsHTML;
				renderNextImage(index + 1);

			})
			.catch(`Error fetching Pokémon data for ${pokemonName}`);
	}

	renderNextImage(0);
}

// Submit Pokemon
function submitPokemon(id) {
	const form = document.getElementById('form');
	const input = form.querySelector('#pokemonInput');
	input.value = id;
	form.submit();
}

// render main pokemon card
function fetchPokemonInfo(valueInput) {

	if (valueInput !== '') {
		//spinner
		const spinnerHTML = '<div class="spinner-border" role="status"></div>';
		const sectionCard = document.querySelector('.section__card');
		sectionCard.innerHTML = spinnerHTML;
		$.ajax({
			url: 'https://pokeapi.co/api/v2/pokemon/' + valueInput,
			success: function (data) {
				$('#pokemonInput').val('');
				let number = data.id;
				let name = data.name;
				let image = data.sprites.other["official-artwork"].front_default;
				let types = data.types;
				let species = {
					name: data.species.name,
					url: data.species.url
				};

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
							<img class="section__main--image" src="${image}" alt="${name}" />
							<div class="section__display--icon" id="pokeIcon"></div>
                	</div>

					<div>
						<h4>#${number}</h4>          
						<h5>${capitalizeFirstLetter(name)}</h5>
					</div>
					<div class="section__type">
						${typeInfoArray.map(typeInfo => `<div class="section__chip ${typeInfo.name}">${typeInfo.name}</div>`).join('')}
					</div>
					<button id="toggleChartBtn" class="section__btn" onClick="showChart(statsArray)">Show Stats</button>
				
					<div id="evolutionContainer" class="section__evolutions">
    
    				</div>
					</div>
            	
				<div id="chart" class="d-none section__card">
					<canvas class="section__canvas" id="pokeStats"></canvas>
				</div>
				`);
				$('#pokeInfo').focus();
				//evolution
				getEvolutions(species, name);
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
		});
	}
}

$(document).ready(function () {
	document.getElementById('form').addEventListener('submit', function (event) {
		event.preventDefault();
		let valueInput = document.getElementById('pokemonInput').value;
		fetchPokemonInfo(valueInput);
	});
	//change main image
	$('#pokeIcon').on('click', '.section__icon', function () {
		const clickedImageSrc = $(this).attr('src');
		$('.section__main--image').attr('src', clickedImageSrc);
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
