import React from 'react';
import './App.css';
import {Main, Button} from './style/Styles.js';

const Display = (props) => {
  return (
    <div id="display">
      <h4>100 * 15</h4>
      <h1>1500</h1>
    </div>
  );
}

class CalcButton extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      btnStyle: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.setActiveButton = this.setActiveButton.bind(this);
  }
  handleClick() {

    this.setActiveButton();
    setTimeout(() => this.setActiveButton(), 100)
  }

  setActiveButton() {
    this.state.btnStyle === null ?
      this.setState({
        btnStyle: {
          filter: "saturate(2) brightness(80%)",
          webkitFilter: "saturate(2) brightness(80%)"
        }
      }) :
      this.setState({
        btnStyle: null
      });
  }

  render() {
    return (
      <Button onClick={this.handleClick} color={this.props.color} id={this.props.id} style={this.state.btnStyle}>{this.props.symbol}</Button>
    );
  }

}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="editor">
        <CalcButton color="tool" id="clear" symbol="C"></CalcButton>
        <CalcButton color="tool" id="modulo" symbol="%"></CalcButton>
        <CalcButton color="tool" id="divide" symbol="÷"></CalcButton>

        <CalcButton id="nine" symbol="9"></CalcButton>
        <CalcButton id="eight" symbol="8"></CalcButton>
        <CalcButton id="seven" symbol="7"></CalcButton>
        <CalcButton color="tool" id="multiply" symbol="×"></CalcButton>

        <CalcButton id="six" symbol="6"></CalcButton>
        <CalcButton id="five" symbol="5"></CalcButton>
        <CalcButton id="four" symbol="4"></CalcButton>
        <CalcButton color="tool" id="subtract" symbol="-"></CalcButton>

        <CalcButton id="three" symbol="3"></CalcButton>
        <CalcButton id="two" symbol="2"></CalcButton>
        <CalcButton id="one" symbol="1"></CalcButton>
        <CalcButton color="tool" id="add" symbol="+"></CalcButton>

        <CalcButton id="zero" symbol="0"></CalcButton>
        <CalcButton id="decimal" symbol="."></CalcButton>
        <CalcButton color="result" id="equals" symbol="="></CalcButton>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <Main>
        <Display />
        <Editor />
      </Main>
    )
  }
}

function App() {
  return (
    <Calculator />
  );
}

export default App;
