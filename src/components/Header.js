import React, { PureComponent } from 'react';
import { HeaderWrapper } from './HeaderStyles';
import Navbar from './Navbar';
import MenuButton from './MenuButton';
import PropTypes from 'prop-types';

class Header extends PureComponent {
	state = {
		open: false,
		charactersHeader: [],
	};

	handleClick = () => {
		this.setState({
			open: !this.state.open,
		});
	};

	update = characters => {
		this.setState(
			{
				charactersHeader: characters,
			},
			() => {
				this.props.update(this.state.charactersHeader);
			}
		);
	};

	render() {
		const { open } = this.state;

		return (
			<HeaderWrapper>
				{open && <Navbar update={this.update} />}
				<MenuButton open={open} handleClick={this.handleClick} />
			</HeaderWrapper>
		);
	}
}

Header.propTypes = {
	update: PropTypes.func,
};

export default Header;
