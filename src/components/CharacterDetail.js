import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './CharacterDetail.css';

class CharacterDetail extends PureComponent {
	state = {
		speciesNames: [],
		planet: '',
		starshipsNames: [],
		isMine: false,
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
			isMine: this.characterIsMine(this.props.character),
		});
	};

	addRemoveCharacterLeague = (add, character) => {
		// The parameter "add" is a boolean to know if add or remove a character.
		let myCharacters = JSON.parse(localStorage.getItem('myCharacters'));
		let pos = -1;
		const leagueNotFull = myCharacters.length < 10;

		if (!myCharacters) {
			myCharacters = [];
		}

		if (add) {
			if (leagueNotFull) {
				myCharacters.push(character);
			} else {
				// There are already 10 characters in My Galactic League.
				this.props.displayMessageFullLeague();
			}
		} else {
			pos = myCharacters.findIndex(char => char.name === character.name);
			myCharacters.splice(pos, 1);

			if (this._reactInternals._debugOwner.elementType.name === 'MyGalacticLeague') {
				this.updateMyGalacticLeague(myCharacters);
			}
		}

		if (!add || leagueNotFull) {
			localStorage.setItem('myCharacters', JSON.stringify(myCharacters));

			if (this._reactInternals._debugOwner.elementType.name === 'Characters') {
				this.setState({
					isMine: add,
				});
			}

			this.props.updateCounter(myCharacters.length);
		}
	};

	characterIsMine = () => {
		// Function to check if the character is already in My Galactic League.
		const myCharacters = JSON.parse(localStorage.getItem('myCharacters'));
		const { character } = this.props;
		let res = false;

		if (myCharacters) {
			res = myCharacters.some(char => char.name === character.name);
		}

		return res;
	};

	updateMyGalacticLeague = characters => {
		this.props.updateMyGalacticLeague(characters);
	};

	render() {
		const { character } = this.props;
		const { speciesNames, planet, starshipsNames, isMine } = this.state;

		return (
			<div className="CharacterDetail">
				{!isMine && (
					<div className="add-button-container">
						<i
							className="material-icons add-remove-button add-button"
							onClick={() => {
								this.addRemoveCharacterLeague(true, character);
							}}
						>
							person_add_alt_1
						</i>
					</div>
				)}
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
				{isMine && (
					<div className="add-button-container">
						<i
							className="material-icons add-remove-button remove-button"
							onClick={() => {
								this.addRemoveCharacterLeague(false, character);
							}}
						>
							person_remove_alt_1
						</i>
					</div>
				)}
			</div>
		);
	}
}

CharacterDetail.propTypes = {
	character: PropTypes.object,
	updateMyGalacticLeague: PropTypes.func,
	updateCounter: PropTypes.func,
	displayMessageFullLeague: PropTypes.func,
};

export default CharacterDetail;
