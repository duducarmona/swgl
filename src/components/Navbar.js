import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavbarWrapper } from './NavbarStyles';
import axios from 'axios';
import './Navbar.css';

class Navbar extends PureComponent {
	state = {
		speciesNames: [],
		next: 'next',
		openSpecies: true,
		speciesNamesDisplay: [],
		speciesSelected: [],
		species: [],
	};

	componentDidMount() {
		this.loadSpecies();
	}

	loadSpecies = async () => {
		let page = 1;
		let speciesNamesAux = [];
		let speciesAux = [];

		while (this.state.next !== null) {
			await axios.get(`https://swapi.dev/api/species/?page=${page}`).then(res => {
				this.setState({
					next: res.data.next,
				});

				speciesAux = speciesAux.concat(res.data.results);
			});

			page++;
		}

		speciesAux.forEach(specie => {
			speciesNamesAux = speciesNamesAux.concat(specie.name);
		});

		this.setState({
			speciesNames: speciesNamesAux,
			species: speciesAux,
		});
	};

	displaySpecies = () => {
		const { openSpecies } = this.state;
		let speciesNamesAux = [];

		if (openSpecies) {
			speciesNamesAux = this.state.speciesNames;
		}

		this.setState({
			speciesNamesDisplay: speciesNamesAux,
			openSpecies: !openSpecies,
		});
	};

	handleCheckboxSpecie = event => {
		const { speciesSelected } = this.state;
		const speciesSelectedAux = speciesSelected;
		const pos = speciesSelectedAux.indexOf(event.target.value);

		if (event.target.checked) {
			if (pos === -1) {
				speciesSelectedAux.push(event.target.value);
			}
		} else {
			if (pos >= 0) {
				speciesSelectedAux.splice(pos, 1);
			}
		}

		this.setState({
			speciesSelected: speciesSelectedAux,
		});
	};

	applyFilters = async () => {
		const { speciesSelected } = this.state;
		let urlsPeople = [];
		let charactersAux = [];

		for (const specieSelected of speciesSelected) {
			await axios.get(`https://swapi.dev/api/species/?search=${specieSelected}`).then(res => {
				urlsPeople = urlsPeople.concat(res.data.results[0].people);
			});
		}

		for (const urlPeople of urlsPeople) {
			await axios.get(urlPeople).then(res => {
				charactersAux = charactersAux.concat(res.data);
			});
		}

		this.props.update(charactersAux);
	};

	update = characters => {
		this.setState({ charactersHeader: characters });
	};

	render() {
		const { open } = this.props;
		const { speciesNamesDisplay } = this.state;

		return (
			<NavbarWrapper open={open}>
				<p onClick={this.displaySpecies}>Species</p>
				<ul className="list-no-decoration species-list">
					{speciesNamesDisplay.map((specieName, index) => (
						<li key={index} className="species-li">
							<label>
								<input type="checkbox" id="cbox1" value={specieName} onChange={this.handleCheckboxSpecie}></input>
								{specieName}
							</label>
						</li>
					))}
				</ul>
				<p>Planets</p>
				<p>Starships</p>
				{!this.state.openSpecies && (
					<button className="species-btn" onClick={this.applyFilters}>
						Apply
					</button>
				)}
			</NavbarWrapper>
		);
	}
}

Navbar.propTypes = {
	open: PropTypes.bool,
	update: PropTypes.func,
};

export default Navbar;
