import React, { PureComponent } from 'react';
import axios from 'axios';
import CharacterDetail from './CharacterDetail';
import Header from './Header';
import CharacterCounter from './CharacterCounter';
import './Characters.css';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Characters extends PureComponent {
	state = {
		characters: [],
		stringSearch: '',
		next: 'next',
		page: 1,
		totalPages: 0,
		searchValue: '',
		numberOfCharacters: 0,
	};

	componentDidMount() {
		this.loadCharacters();
		this.scrollListener = window.addEventListener('scroll', e => {
			this.handleScroll(e);
		});
		this.calculateNumberOfMyCharacters();
	}

	calculateNumberOfMyCharacters = () => {
		const myCharacters = JSON.parse(localStorage.getItem('myCharacters'));

		this.setState({
			numberOfCharacters: myCharacters.length,
		});
	};

	loadCharacters = async () => {
		const { page, characters, stringSearch } = this.state;
		const url = `https://swapi.dev/api/people/?` + stringSearch + `page=${page}`;
		let newCharacters = [];

		if (page > 1) {
			newCharacters = characters;
		}

		await axios.get(url).then(res => {
			this.setState({
				characters: newCharacters.concat(res.data.results),
				next: res.data.next,
				totalPages: Math.ceil(res.data.count / 10),
			});
		});
	};

	loadMore = () => {
		this.setState(
			{
				page: this.state.page + 1,
			},
			() => {
				if (this.state.next !== null && this.state.page <= this.state.totalPages) {
					this.loadCharacters();
				}
			}
		);
	};

	handleScroll = async () => {
		const lastLi = document.querySelector('ul > li:last-child');
		const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
		const pageOffset = window.pageYOffset + window.innerHeight;

		if (pageOffset > lastLiOffset) {
			await this.loadMore();
		}
	};

	searchByCharacterName = async name => {
		await this.setState(
			{
				stringSearch: `search=${name}&`,
				page: 1,
				characters: [],
			},
			() => {
				this.loadCharacters();
			}
		);
	};

	handleInput = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	update = characters => {
		this.setState({ characters: characters });
	};

	updateCounter = numberOfCharacters => {
		this.setState({
			numberOfCharacters: numberOfCharacters,
		});
	};

	displayMessageFullLeague = () => {
		toast.error('My Galactic League is full!');
	};

	render() {
		const { characters, searchValue, numberOfCharacters } = this.state;

		return (
			<div>
				<ToastContainer className="ToastContainer" position="bottom-center" type="info"></ToastContainer>
				<div className="arrow-button-container-right">
					<Link to={'/league'}>
						<i className="material-icons arrow-button">keyboard_arrow_right</i>
					</Link>
				</div>
				<CharacterCounter numberOfCharacters={numberOfCharacters} />
				<h1>Star Wars Characters</h1>
				<div className="search-filter-container">
					<div className="searcher-container">
						<input
							className="searcher-input searcher"
							type="text"
							name="searchValue"
							value={searchValue}
							onChange={this.handleInput}
							placeholder="Search by name"
						></input>
						<i
							className="material-icons magnifying-glass searcher"
							onClick={() => {
								this.searchByCharacterName(searchValue);
							}}
						>
							search
						</i>
					</div>
					<Header update={this.update} />
				</div>
				<ul className="list-no-decoration">
					{characters.map((character, index) => (
						<li key={index}>
							<CharacterDetail
								character={character}
								updateCounter={this.updateCounter}
								displayMessageFullLeague={this.displayMessageFullLeague}
							/>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Characters;
