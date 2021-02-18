import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import './MyGalacticLeague.css';

class MyGalacticLeague extends PureComponent {
	render() {
		return (
			<div>
				<div className="arrow-button-container-left">
					<Link to={`/`}>
						<i className="material-icons arrow-button">keyboard_arrow_left</i>
					</Link>
				</div>
				<h1>My Galactic League</h1>
			</div>
		);
	}
}

export default MyGalacticLeague;
