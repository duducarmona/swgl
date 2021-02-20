import React, { PureComponent } from 'react';
import './CharacterCounter.css';
import PropTypes from 'prop-types';

class CharacterCounter extends PureComponent {
	render() {
    const { numberOfCharacters } = this.props;

		return (
			<div className="counter-container">
        <img className="counter-img" src={numberOfCharacters < 10 ? "mandalorian-grey.png" : "mandalorian-red.png"} alt="mandalorian" />
        <p className="counter-number">{numberOfCharacters}</p>
			</div>
		);
	}
}

CharacterCounter.propTypes = {
	numberOfCharacters: PropTypes.number
};

export default CharacterCounter;
