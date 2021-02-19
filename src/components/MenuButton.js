import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MenuButtonWrapper = styled.button`
	box-shadow: 0px 0px 1px rgb(50, 50, 50);
	background-color: #414850;
	border-radius: 5px;
	border: 1px solid #999999;
	height: 34px;

	@media only screen and (min-width: 624px) {
		display: none;
	}
`;

class MenuButton extends PureComponent {
	render() {
		const { open, handleClick } = this.props;

		return !open ? (
			<MenuButtonWrapper onClick={handleClick}>
				<i className="material-icons">filter_alt</i>
			</MenuButtonWrapper>
		) : (
			<MenuButtonWrapper onClick={handleClick}>
				<i className="material-icons">close</i>
			</MenuButtonWrapper>
		);
	}
}

MenuButton.propTypes = {
	open: PropTypes.bool,
	handleClick: PropTypes.func,
};

export default MenuButton;
