import React, { PureComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import CharacterDetail from './CharacterDetail';

class Characters extends PureComponent {
	state = {
		characters: [],
		scrollerRef: React.createRef(),
	};

	loadMore = page => {
		axios.get(`https://swapi.dev/api/people/?page=${page}`).then(res => {
			this.setState({
				characters: this.state.characters.concat(res.data.results),
			});
		});
	};

	render() {
		const { scrollerRef, characters } = this.state;

		return (
			<div style={{ height: '700px', overflow: 'auto' }} ref={scrollerRef}>
				<div>
					<h1>Star Wars Galactic League</h1>
					<ul className="list-no-decoration">
						<InfiniteScroll
							pageStart={0}
							loadMore={this.loadMore}
							hasMore={characters.length < 82}
							loader={
								<div className="loader" key={0}>
									Loading ...
								</div>
							}
							useWindow={false}
							getScrollParent={() => scrollerRef.current}
						>
							{characters.map((character, index) => (
								<li key={index}>
									<CharacterDetail character={character} />
								</li>
							))}
						</InfiniteScroll>
					</ul>
				</div>
			</div>
		);
	}
}

export default Characters;
