import React from 'react';
import { Button } from '../style/Styles.js';

const buttons = [
	{
		value: 'Delete',
		type: 'tool',
		id: 'clear',
		symbol: 'C'
	},
	{
		value: 'Backspace',
		type: 'tool',
		id: 'back',
		symbol: '⌫'
	},
	{
		value: 'PlusMinus',
		type: 'tool',
		id: 'plusminus',
		symbol: '+/-'
	},
	{
		value: '/',
		type: 'tool',
		id: 'divide',
		symbol: '÷'
	},
	{
		value: '7',
		id: 'seven',
		symbol: '7'
	},
	{
		value: '8',
		id: 'eight',
		symbol: '8'
	},
	{
		value: '9',
		id: 'nine',
		symbol: '9'
	},
	{
		value: '*',
		type: 'tool',
		id: 'multiply',
		symbol: '×'
	},
	{
		value: '4',
		id: 'four',
		symbol: '4'
	},
	{
		value: '5',
		id: 'five',
		symbol: '5'
	},
	{
		value: '6',
		id: 'six',
		symbol: '6'
	},
	{
		value: '-',
		type: 'tool',
		id: 'subtract',
		symbol: '-'
	},
	{
		value: '1',
		id: 'one',
		symbol: '1'
	},
	{
		value: '2',
		id: 'two',
		symbol: '2'
	},
	{
		value: '3',
		id: 'three',
		symbol: '3'
	},
	{
		value: '+',
		type: 'tool',
		id: 'add',
		symbol: '+'
	},
	{
		value: '0',
		id: 'zero',
		symbol: '0'
	},
	{
		value: '.',
		id: 'decimal',
		symbol: '.'
	},
	{
		value: '=',
		type: 'result',
		id: 'equals',
		symbol: '='
	}
];

class CalcButton extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			btnStyle: null
		};
		this.submitValue = this.submitValue.bind(this);
		this.setActiveButton = this.setActiveButton.bind(this);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress.bind(this));
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	handleKeyPress(e) {
		var validInput = /[\d\-+*/=.]|Delete|Backspace/g;
		if (e.key.match(validInput) && e.key === this.props.value) {
			this.submitValue();
		}
	}

	submitValue() {
		this.props.setKeyValue(this.props.value);

		this.setActiveButton();
		setTimeout(() => this.setActiveButton(), 100);
	}

	setActiveButton() {

			this.state.btnStyle === null ? this.setState({
				btnStyle: {
					filter: 'saturate(2) brightness(80%)',
					WebkitFilter: 'saturate(2) brightness(80%)'
				}
			}) :
			this.setState({
				btnStyle: null
			});
	}

	render() {
		return (
			<Button onClick={this.submitValue} type={this.props.type} id={this.props.id} style={this.state.btnStyle}>
				{this.props.symbol}
			</Button>
		);
	}
}

class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			currentDisplay: '0'
		};
		this.getKeyValue = this.getKeyValue.bind(this);
	}

	getKeyValue(value) {
		let currentDisplay = this.state.currentDisplay;

		if (Math.abs(currentDisplay).toString().length <= 13) {
			if (currentDisplay === '0' && /[(0-9)]/.test(value)) {
				// First Input?
				this.setState({ currentDisplay: value.toString() }, () => {
					this.props.changeDisplay(this.state.currentDisplay, 'UPDATE');
				});
			} else if (/[-(0-9)]/g.test(value)) {
				// Is the input a number?
				this.setState({ currentDisplay: currentDisplay + value.toString() }, () => {
					this.props.changeDisplay(this.state.currentDisplay, 'UPDATE');
				});
			} else if (/[.]/g.test(value)) {
				// Is input a decimal?
				if (currentDisplay.includes('.') && currentDisplay.match(/[.]/g).length > 0) {
					// Already has a decimal?
					this.setState(null);
				} else {
					this.setState({ currentDisplay: currentDisplay + value }, () => {
						this.props.changeDisplay(this.state.currentDisplay, 'UPDATE');
					});
				}
			}
		}

		if (/[=+\-/*(Delete)(Backspace)(PlusMinus)]/g.test(value)) {
			// Is input an operator?
			if (value === 'Backspace') {
				if (currentDisplay.length > 1) {
					this.setState({ currentDisplay: currentDisplay.slice(0, -1) }, () => {
						this.props.changeDisplay(this.state.currentDisplay, 'UPDATE');
					});
				} else {
					this.setState({ currentDisplay: '0' }, () => {
						this.props.changeDisplay(this.state.currentDisplay, 'UPDATE');
					});
				}
				return;
			}
			else if (value === '-' && (currentDisplay === '0' || currentDisplay === '-') && !this.props.done) {
				this.setState({ currentDisplay: '-' }, () => {
					this.props.changeDisplay('-', 'UPDATE');
				});
				return;
			}
			else {
				switch (value) {
					case '=':
						this.props.changeDisplay(currentDisplay, 'EQUALS');
						break;
					case '+':
						this.props.changeDisplay('+', 'OPERATION');
						break;
					case '-':
						this.props.changeDisplay('-', 'OPERATION');
						break;
					case '/':
						this.props.changeDisplay('/', 'OPERATION');
						break;
					case '*':
						this.props.changeDisplay('×', 'OPERATION');
						break;
					case 'PlusMinus':
						if (this.state.currentDisplay !== '0' && this.state.currentDisplay !== '-') {
							let invNum = -parseInt(this.state.currentDisplay).toString();
							this.setState({ currentDisplay: invNum }, () => {
								this.props.changeDisplay(this.state.currentDisplay, 'UPDATE');
							});
						}
						return;
					case 'Delete':
						this.props.changeDisplay(currentDisplay, 'CLEAR');
						this.setState({ currentDisplay: '0' });
						break;
					default:
						console.warn('Unknown Value');
				}
			}

			this.setState({ currentDisplay: '0' });
		}
	}

	render() {
		const calcButtons = buttons.map((btn, i) => {
			return (
				<CalcButton
					value={btn.value}
					type={btn.type}
					id={btn.id}
					symbol={btn.symbol}
					key={i}
					setKeyValue={this.getKeyValue}
				/>
			);
		});
		return <div id="editor">{calcButtons}</div>;
	}
}

export default Editor;
