import './App.css';
import React from 'react';
import Characters from './components/Characters';
import MyGalacticLeague from './components/MyGalacticLeague';
import { Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Route exact path={'/'} component={Characters} />
			<Route exact path={'/league'} component={MyGalacticLeague} />
		</div>
	);
}

export default App;
