import React, { PureComponent } from 'react';
import axios from 'axios';
import CharacterDetail from './CharacterDetail';

class Characters extends PureComponent {
	state = {
		characters: [],
	};

	componentDidMount() {
		axios.get('https://swapi.dev/api/people/?page=1').then(response => {
			this.setState({
				characters: response.data.results
			});
		});
	}

	render() {
		const { characters } = this.state;

		return (
      <div>
        <h1>Star Wars Galactic League</h1>
        <ul className="list-no-decoration">
          {characters.map((character, index) => (
            <li key={index}>
              <CharacterDetail character={character}/>
            </li>
          ))}
        </ul>
      </div>
		);
	}
}

Characters.propTypes = {};

export default Characters;
