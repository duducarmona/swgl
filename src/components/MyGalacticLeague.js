import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './MyGalacticLeague.css';
import CharacterDetail from './CharacterDetail';
import CharacterCounter from './CharacterCounter';

class MyGalacticLeague extends PureComponent {
	state = {
		myCharacters: [],
	};

	componentDidMount() {
		this.getMyCharacters();
	}

	getMyCharacters = () => {
		let myCharacters = JSON.parse(localStorage.getItem('myCharacters'));

		if (!myCharacters) {
			myCharacters = [];
		}

		this.setState({
			myCharacters: myCharacters,
		});
	};

	updateMyCharacters = characters => {
		this.setState({ myCharacters: characters });
	};

	updateCounter = numberOfCharacters => {
		this.setState({
			numberOfCharacters: numberOfCharacters,
		});
	};

	render() {
		const { myCharacters } = this.state;

		return (
			<div>
				<div className="arrow-button-container-left">
					<Link to={`/`}>
						<i className="material-icons arrow-button">keyboard_arrow_left</i>
					</Link>
				</div>
				<div className="galactic-counter-container">
					<CharacterCounter numberOfCharacters={myCharacters.length} />
				</div>
				<h1>My Galactic League</h1>
				<ul className="list-no-decoration">
					{myCharacters.map((character, index) => (
						<li key={index}>
							<CharacterDetail
								character={character}
								updateMyGalacticLeague={this.updateMyCharacters}
								updateCounter={this.updateCounter}
							/>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default MyGalacticLeague;
