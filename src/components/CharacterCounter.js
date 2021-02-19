import React, { PureComponent } from 'react';
import './CharacterCounter.css';
import PropTypes from 'prop-types';

class CharacterCounter extends PureComponent {
	render() {
		return (
			<div className="counter-container">
        <img className="counter-img" src="mandalorian-grey.png" alt="mandalorian" />
        <p className="counter-number">{this.props.numberOfCharacters}</p>
			</div>
		);
	}
}

CharacterCounter.propTypes = {
	numberOfCharacters: PropTypes.number
};

export default CharacterCounter;
