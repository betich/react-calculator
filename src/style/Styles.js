import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const handleColorType = (type, theme) => {
	switch (type) {
		case 'tool':
			return theme.tool;
		case 'result':
			return theme.result;
		default:
			return theme.num;
	}
};

export const Button = styled.div`
  font-size: 1.25em;
  font-family: 'Roboto Mono', Courier, monospace;
	padding: 25px;
	border-radius: 40px;
	text-align: center;
	display: flex;
	justify-content: center;
  align-items: center;
  height: 15px;
  width: auto;
  user-select: none;
  border: 1px solid ${({theme}) =>  theme.border};

  background-color: ${(props) => handleColorType(props.type, props.theme)};

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

export const ColorButton = styled(Button)`
  width: 10px;
  padding: 7px;
  border: 2px solid ${({theme}) =>  theme.border};
  border-radius: 7px;
  background: ${(props) => props.color};
  
  &:hover {
    filter: brightness(90%) saturate(2);
    -webkit-filter: brightness(90%) saturate(2);
  }
`;

export const Main = styled.div`
  background-color: ${({theme}) =>  theme.bg2};
  color: ${({theme}) => theme.primary};

  width: calc(280px + 3vw);
  padding: 30px;
  padding-top: 50px;
  box-shadow: 0 10px 20px ${({theme}) =>  theme.shadow};
  border: 1px solid ${({theme}) =>  theme.border}, 0 6px 6px rgba(0,0,0,0.23);
  border-radius: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export const Credit = styled.div`
  color: ${({theme}) =>  theme.primary};
  
  a {
      background-color: ${({theme}) =>  theme.primary};
      color:${({theme}) =>  theme.bg2};
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({theme}) =>  theme.bg1};
    color: ${({theme}) => theme.primary};
  }

  ::selection {
    background-color: ${({theme}) =>  theme.primary};
    color: ${({theme}) => theme.bg1};
  }

  #result {
    #display {
      font-size: 2em;
      margin-bottom: 10px;
    }
    hr {
      border: 2px solid ${({theme}) =>  theme.border};
    }
    #formula {
      font-size: 0.85em;
      font-weight: 300;
      font-family: 'Roboto Mono', Courier, monospace;
      margin: 3px 0;
    }
  }
`