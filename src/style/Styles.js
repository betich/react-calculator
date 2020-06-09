import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

//  TODOS
//  - ADD A +/- BUTTON *
//  - ADD THEMING
//  - THEMING MENU POPS UP AND FILLS THE PAGE

const handleColorType = (type) => {
	switch (type) {
		case 'tool':
			return '#cceabb';
		case 'result':
			return '#ffcb9e';
		default:
			return '#f7f7f7';
	}
};

export const Button = styled.div`
	font-size: 1.3em;
	padding: 20px;
	border-radius: 10px;
	text-align: center;
	display: flex;
	justify-content: center;
  align-items: center;
  height: 30px;
  user-select: none;
  border: 1px solid #eee;

  background-color: ${(props) => handleColorType(props.type)};

  &:hover {
    filter: brightness(90%);
    -webkit-filter: brightness(90%);
    cursor: pointer;
  }
	&:before {
    content: "";
    padding-top: 100%;
    display: inline-block;
	}
`;

export const Main = styled.div`
  background-color: #fff;

  width: calc(280px + 3vw);
  padding: 30px;
  box-shadow: 0px 3px 3px rgba(10, 10, 10, 0.2);
  border: 1px solid #ccc;
  border-radius: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export const Credit = styled.div`
  color: rgb(32, 32, 32);
  
  a {
      background-color: rgb(32, 32, 32);
      color: #fff;
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(255, 247, 236);
  }
`