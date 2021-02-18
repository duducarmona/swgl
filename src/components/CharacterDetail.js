import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './CharacterDetail.css';

class CharacterDetail extends PureComponent {
	state = {
		speciesNames: [],
		planet: '',
		starshipsNames: [],
		isMine: false
	};

	componentDidMount = async () => {
		const { species, homeworld, starships, url } = this.props.character;
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
			planetNameAux = response.data.name;
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
			starshipsNames: starshipsNamesAux,
			isMine: this.characterIsMine(url)
		});
	};

	addCharacterToLeague = (characterURL) => {
		let myCharacters = JSON.parse(localStorage.getItem('myCharacters'));

		if (!myCharacters) {
			myCharacters = [];
		}

		myCharacters.push(characterURL);

		localStorage.setItem('myCharacters', JSON.stringify(myCharacters));

		this.setState({
			isMine: true
		});
	}

	characterIsMine = (characterURL) => {
		// Function to check if the character is already in My Galactic League.
		const myCharacters = JSON.parse(localStorage.getItem('myCharacters'));
		let res = false;

		if (myCharacters) {
			res = myCharacters.includes(characterURL);
		} 
		
		return res;
	}

	render() {
		const { character } = this.props;
		const { speciesNames, planet, starshipsNames, isMine } = this.state;

		return (
			<div className="CharacterDetail">
				{!isMine && 
					<div className="add-button-container">
						<i className="material-icons add-remove-button" onClick={() => {this.addCharacterToLeague(character.url)}}>
							person_add_alt_1
						</i>
					</div>
				}
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
