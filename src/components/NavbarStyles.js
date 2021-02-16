import styled from 'styled-components';

export const NavbarWrapper = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	position: absolute;
	top: 30vh;
	right: ${props => (props.open ? '0' : '-100%')};
	width: 40%;
	transition: right 0.3s linear;
	background-color: #414850;
	color: #e6605f;
	border-radius: 5px;

	@media only screen and (min-width: 624px) {
		flex-direction: row;
		position: initial;
		height: auto;
		justify-content: center;
		background: white;
	}
`;
