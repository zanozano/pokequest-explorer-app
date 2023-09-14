# Search Pokemon App

## _Explore Pokémon World with PokeAPI_

![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)

Welcome to Searcg Pokemon App, a powerful web application that allows users to delve into the vast world of Pokémon by providing in-depth information sourced from the PokeAPI. Discover detailed data about your favorite Pokémon, including their images, types, and stats, all within an engaging and user-friendly interface. PokeDex takes your experience to the next level with SCSS and the BEM methodology for streamlined styling, customized scrolling for a smoother user experience, and seamless SweetAlert integration for enhanced usability. Stay tuned for upcoming features, such as Pokémon sound integration, to make your journey even more immersive.

## Features

- **Pokémon Information**: Easily retrieve information by entering a Pokémon's name or ID in the search field, and let PokeDex fetch and display their image, types, and stats.

- **SCSS with BEM**: PokeDex leverages SCSS (Sassy CSS) following the BEM (Block Element Modifier) methodology to maintain structured and clean styling.

- **SCSS Reset and Customized Scroll**: With partial SCSS files, default styles are reset, and custom scrolling behaviors are implemented to provide an exceptional user experience.

- **Chart.js Integration**: Enjoy interactive and visually appealing charts, powered by Chart.js, to visualize a Pokémon's stats.

- **SweetAlert Integration**: PokeDex seamlessly incorporates SweetAlert for user-friendly alerts and notifications, elevating the overall user experience.

- **Future Sound Integration**: Exciting plans are underway to integrate Pokémon sounds, promising an even more immersive exploration.

## Dependencies

PokeDex relies on a range of technologies and libraries to provide its functionality:

- [PokeAPI](https://pokeapi.co/): A robust open-source Pokémon database and API.

- [SCSS](https://sass-lang.com/): A versatile CSS preprocessor that streamlines the styling workflow.

- [BEM Methodology](http://getbem.com/): A structured naming convention that ensures maintainable and comprehensible CSS and HTML.

- [Chart.js](https://www.chartjs.org/): A JavaScript library that creates stunning interactive charts for displaying Pokémon stats.

- [SweetAlert2](https://sweetalert2.github.io/): A versatile and user-friendly replacement for JavaScript's standard popup boxes.

## Usage

1. Begin your journey by cloning the repository to your local machine.

```bash
git clone https://github.com/zanozano/search-pokemon-app.git
cd search-pokemon-app
```

1. Install the necessary project dependencies.

```bash
npm install
```

1. Launch the application by opening the `index.html` file in your preferred web browser.

2. In the input field, provide the name or ID of the Pokémon you want to learn more about, then click the "Search" button.

3. Explore the Pokémon's image, types, and stats, presented alongside an interactive chart.

## Scripts

For real-time updates of SCSS to CSS, use the following script after installing the dependencies:

```bash
 "scripts": {
    "scss": "sass --watch public/assets/scss/style.scss:public/assets/css/style.css"
  }
```

## Current Deployment Example

Experience Search Pokemon App in action by visiting the following Firebase-hosted link:

[**Search Pokemon App Live Demo**](https://pokeapi-9df8e.web.app/)

## Contributing

Search Pokemon App warmly welcomes contributions! Whether you want to enhance existing features or introduce new ones, please feel free to fork the repository and submit pull requests.
