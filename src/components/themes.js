import React from 'react';
import { ColorButton } from '../style/Styles.js';

export const themes = [
	{
		name: 'Light',
		primary: '#202020',
		bg1: '#fbf7f5',
		bg2: '#fff',
		num: '#f7f7f7',
		tool: '#cceabb',
		result: '#ff9a9d',
		border: '#ddd',
		shadow: 'rgba(10, 10, 10, 0.2)'
	},
	{
		name: 'Dark',
		primary: '#f3f3f3',
		bg1: '#2e2e2e',
		bg2: '#202020',
		num: '#313131',
		tool: '#414141',
		result: '#ca3e47',
		border: '#555',
		shadow: 'rgba(0, 0, 0, 0.5)'
	},
	{
		name: 'Red',
		primary: '#000',
		bg1: '#f52c4f',
		bg2: '#fcfcfc',
		num: '#fafafa',
		tool: '#ebe1e1',
		result: '#f54c69',
		border: '#d5d5d5',
		shadow: 'rgba(10, 10, 10, 0.2)'
	},
	{
		name: 'Pastel',
		primary: '#323740',
		bg1: '#94a8a3',
		bg2: '#ffe5e0',
		num: '#F7EDE2',
		tool: '#f5cd8c',
		result: '#f28482',
		border: '#d0d0d0',
		shadow: 'rgba(10, 10, 10, 0.2)'
	}
];

class ColorBtn extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		let selectedTheme = themes.filter(theme => theme.name === this.props.name)[0];
		this.props.changeDisplay(selectedTheme.name);
		this.props.setTheme(selectedTheme);
	}

	render() {
		return (
			<ColorButton
				color={this.props.color}
				id={this.props.name}
				onClick={this.handleClick}
			>
			</ColorButton>
		);
	}
}

export class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
		this.props = props;
		this.state = {
			currentTheme: 'Light'
		}
		this.updateDisplay = this.updateDisplay.bind(this);
	}

	updateDisplay(theme) {
		this.setState({ currentTheme: theme });
	}

    render() {
		const themeBtns = themes.map((theme, i) => {
			return (
				<ColorBtn
					color={theme.bg1}
					name={theme.name}
					key={i}
					setTheme={this.props.setTheme}
					changeDisplay={this.updateDisplay}
				>
				</ColorBtn>
			);
		})

        return (
            <div id="themeswitch">
				<h4 id="theme">{this.state.currentTheme}</h4>
                <div>
					{ themeBtns }
				</div>
            </div>
        );
    }
}