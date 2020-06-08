import styled from 'styled-components';

const handleColorType = (color) => {
	switch (color) {
		case 'tool':
			return '#cceabb';
		case 'result':
			return '#fdcb9e';
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

  background-color: ${(props) => handleColorType(props.color)};

  &:hover {
    opacity: 0.8;
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

  padding: 30px;
  box-shadow: 0px 3px 10px rgba(10, 10, 10, 0.2);
  border: 1px solid #ccc;
  border-radius: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;
