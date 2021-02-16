import './App.css';
import React from 'react';
import Characters from './components/Characters';
import { Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Route exact path={'/'} component={Characters} />
		</div>
	);
}

export default App;
