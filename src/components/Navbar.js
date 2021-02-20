import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavbarWrapper } from './NavbarStyles';
import axios from 'axios';
import './Navbar.css';

class Navbar extends PureComponent {
	state = {
		speciesNames: [],
		planetsNames: [],
		starshipsNames: [],
		openSpecies: true,
		openPlanets: true,
		openStarships: true,
		speciesNamesDisplay: [],
		planetsNamesDisplay: [],
		starshipsNamesDisplay: [],
		speciesSelected: [],
		planetsSelected: [],
		starshipsSelected: [],
	};

	componentDidMount() {
		this.loadItems('species');
		this.loadItems('planets');
		this.loadItems('starships');
	}

	loadItems = async category => {
		let page = 1;
		let next = 'next';
		let itemsAux = [];
		let itemsNamesAux = [];

		while (next !== null) {
			await axios.get(`https://swapi.dev/api/${category}/?page=${page}`).then(res => {
				next = res.data.next;
				itemsAux = itemsAux.concat(res.data.results);
			});

			page++;
		}

		itemsAux.forEach(item => {
			itemsNamesAux = itemsNamesAux.concat(item.name);
		});

		switch (category) {
			case 'species':
				this.setState({
					speciesNames: itemsNamesAux,
				});
				break;
			case 'planets':
				this.setState({
					planetsNames: itemsNamesAux,
				});
				break;
			case 'starships':
				this.setState({
					starshipsNames: itemsNamesAux,
				});
				break;
			default:
				break;
		}
	};

	displayItemsFilters = category => {
		const { openSpecies, speciesNames, openPlanets, planetsNames, openStarships, starshipsNames } = this.state;
		let itemsNamesAux = [];
		let open = false;
		let names = [];

		switch (category) {
			case 'species':
				open = openSpecies;
				names = speciesNames;
				break;
			case 'planets':
				open = openPlanets;
				names = planetsNames;
				break;
			case 'starships':
				open = openStarships;
				names = starshipsNames;
				break;
			default:
				break;
		}

		if (open) {
			itemsNamesAux = names;
		}

		switch (category) {
			case 'species':
				this.setState({
					speciesNamesDisplay: itemsNamesAux,
					openSpecies: !openSpecies,
					openPlanets: true,
					openStarships: true,
				});
				break;
			case 'planets':
				this.setState({
					planetsNamesDisplay: itemsNamesAux,
					openPlanets: !openPlanets,
					openSpecies: true,
					openStarships: true,
				});
				break;
			case 'starships':
				this.setState({
					starshipsNamesDisplay: itemsNamesAux,
					openStarships: !openStarships,
					openSpecies: true,
					openPlanets: true,
				});
				break;
			default:
				break;
		}
	};

	handleCheckbox = (event, category) => {
		let itemsSelectedAux = [];
		let pos = -1;
		const { speciesSelected, planetsSelected, starshipsSelected } = this.state;

		switch (category) {
			case 'species':
				itemsSelectedAux = speciesSelected;
				break;
			case 'planets':
				itemsSelectedAux = planetsSelected;
				break;
			case 'starships':
				itemsSelectedAux = starshipsSelected;
				break;

			default:
				break;
		}

		pos = itemsSelectedAux.indexOf(event.target.value);

		if (event.target.checked) {
			if (pos === -1) {
				itemsSelectedAux.push(event.target.value);
			}
		} else {
			if (pos >= 0) {
				itemsSelectedAux.splice(pos, 1);
			}
		}

		switch (category) {
			case 'species':
				this.setState({
					speciesSelected: itemsSelectedAux,
				});
				break;
			case 'planets':
				this.setState({
					planetsSelected: itemsSelectedAux,
				});
				break;
			case 'starships':
				this.setState({
					starshipsSelected: itemsSelectedAux,
				});
				break;
			default:
				break;
		}
	};

	applyFilters = async () => {
		const CATEGORIES = ['species', 'planets', 'starships'];
		let itemsSelected = [];
		const { speciesSelected, planetsSelected, starshipsSelected } = this.state;
		let urlsPeople = [];
		let peopleField = '';
		let charactersAux = [];

		for (const category of CATEGORIES) {
			switch (category) {
				case 'species':
					itemsSelected = speciesSelected;
					peopleField = 'people';
					break;
				case 'planets':
					itemsSelected = planetsSelected;
					peopleField = 'residents';
					break;
				case 'starships':
					itemsSelected = starshipsSelected;
					peopleField = 'pilots';
					break;
				default:
					break;
			}

			for (const itemSelected of itemsSelected) {
				await axios.get(`https://swapi.dev/api/${category}/?search=${itemSelected}`).then(res => {
					urlsPeople = urlsPeople.concat(res.data.results[0][peopleField]);
				});
			}
		}

		// To delete the duplicates.
		urlsPeople = [...new Set(urlsPeople)];

		for (const urlPeople of urlsPeople) {
			await axios.get(urlPeople).then(res => {
				charactersAux = charactersAux.concat(res.data);
			});
		}

		this.props.update([]);
		this.props.update(charactersAux);
	};

	render() {
		const { speciesNamesDisplay, planetsNamesDisplay, starshipsNamesDisplay } = this.state;

		return (
			<NavbarWrapper>
				<p onClick={() => this.displayItemsFilters('species')}>Species</p>
				{!this.state.openSpecies && (
					<ul className="list-no-decoration navbar-list">
						{speciesNamesDisplay.map((specieName, index) => (
							<li key={index} className="navbar-li">
								<label>
									<input
										type="checkbox"
										value={specieName}
										onChange={event => this.handleCheckbox(event, 'species')}
									></input>
									{specieName}
								</label>
							</li>
						))}
					</ul>
				)}
				<p onClick={() => this.displayItemsFilters('planets')}>Planets</p>
				{!this.state.openPlanets && (
					<ul className="list-no-decoration navbar-list">
						{planetsNamesDisplay.map((planetName, index) => (
							<li key={index} className="navbar-li">
								<label>
									<input
										type="checkbox"
										value={planetName}
										onChange={event => this.handleCheckbox(event, 'planets')}
									></input>
									{planetName}
								</label>
							</li>
						))}
					</ul>
				)}
				<p onClick={() => this.displayItemsFilters('starships')}>Starships</p>
				{!this.state.openStarships && (
					<ul className="list-no-decoration navbar-list">
						{starshipsNamesDisplay.map((starshipName, index) => (
							<li key={index} className="navbar-li">
								<label>
									<input
										type="checkbox"
										value={starshipName}
										onChange={event => this.handleCheckbox(event, 'starships')}
									></input>
									{starshipName}
								</label>
							</li>
						))}
					</ul>
				)}
				{(!this.state.openSpecies || !this.state.openPlanets || !this.state.openStarships) && (
					<button className="navbar-btn" onClick={this.applyFilters}>
						Apply
					</button>
				)}
			</NavbarWrapper>
		);
	}
}

Navbar.propTypes = {
	update: PropTypes.func,
};

export default Navbar;
