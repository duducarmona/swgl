import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './CharacterDetail.css';

class CharacterDetail extends PureComponent {
	state = {
		speciesNames: [],
		planet: '',
		starshipsNames: [],
	};

	componentDidMount = async () => {
		const { species, homeworld, starships } = this.props.character;
		let speciesNamesAux = [];
		let planetNameAux = '';
		let starshipsNamesAux = [];

		// Get the species names.
		for (const specieURL of species) {
			await axios.get(specieURL).then(response => {
				speciesNamesAux = speciesNamesAux.concat(response.data.name);
			});
		}

		// Get the planet name.
		await axios.get(homeworld).then(response => {
			planetNameAux = response.data.name
		});

		// Get the starships names.
		for (const starshipURL of starships) {
			await axios.get(starshipURL).then(response => {
					starshipsNamesAux = starshipsNamesAux.concat(response.data.name);
			});
		}

		this.setState({
			speciesNames: speciesNamesAux,
			planet: planetNameAux,
			starshipsNames: starshipsNamesAux
		});
	};

	render() {
		const { character } = this.props;
		const { speciesNames, planet, starshipsNames } = this.state;

		return (
			<div className="CharacterDetail">
				<h2>{character.name}</h2>
				<div className="characteristics-container">
					<ul className="list-no-decoration">
						<h3>Species:</h3>
						<div className="characteristics">
							{speciesNames.map((specieName, index) => (
								<li key={index}>{specieName}</li>
							))}
							{speciesNames.length === 0 && <li>Human</li>}
						</div>
					</ul>
					<h3>Planet:</h3>
					<p className="characteristics">{planet}</p>
					<ul>
						<h3>Starships:</h3>
						<div className="characteristics starships-list">
							{starshipsNames.map((starshipName, index) => (
								<li key={index}>{starshipName}</li>
							))}
						</div>
					</ul>
				</div>
			</div>
		);
	}
}

CharacterDetail.propTypes = {
	character: PropTypes.object,
};

export default CharacterDetail;
