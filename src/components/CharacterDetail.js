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

	componentDidMount() {
		const { species, homeworld, starships } = this.props.character;

		// Get the species names.
		species.forEach(specieURL => {
			axios.get(specieURL).then(response => {
				this.setState({
					speciesNames: [...this.state.speciesNames, response.data.name],
				});
			});
		});

		// Get the planet name.
		axios.get(homeworld).then(response => {
			this.setState({
				planet: response.data.name,
			});
		});

		// Get the starships names.
		starships.forEach(starshipURL => {
			axios.get(starshipURL).then(response => {
				this.setState({
					starshipsNames: [...this.state.starshipsNames, response.data.name],
				});
			});
		});
	}

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
