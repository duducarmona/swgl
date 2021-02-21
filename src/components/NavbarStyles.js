import styled from 'styled-components';

export const NavbarWrapper = styled.nav`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	position: absolute;
	z-index: 1;
	top: 30vh;
	right: 0;
	/* right: ${props => (props.open ? '0' : '-50%')}; */
	width: 50%;
	/* transition: right 0.3s linear; */
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
