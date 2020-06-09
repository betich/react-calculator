import React from 'react';
import './App.css';
import { Main, Credit, GlobalStyle } from './style/Styles.js';
import Editor from './components/calculator.js';

const Display = (props) => {
  return (
    <div id="result">
      <h4 id="formula">{props.formula}</h4>
      <h1 id="display">{props.output}</h1>
    </div>
  );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      formula: '',
      display: 0,
      formerDisplay: 0,
      done: false
    }
    this.changeDisplay = this.changeDisplay.bind(this);
    this.displayFormula = this.displayFormula.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  displayFormula(operator) {
    let display = this.state.display < 0 ? '(' + this.state.display + ')' : this.state.display;
    if (/\d/g.test(this.state.display)) {
      // Is display a number?
      this.setState({
        formula: this.state.formula + display + operator,
        formerDisplay: this.state.formula + display,
        display: operator
      });
    } else if (/[-+×/]/g.test(this.state.display)) {
      this.setState({
        formula: this.state.formerDisplay + operator,
        display: operator
      });
    }
  }

  calculate() {
    let display = this.state.display < 0 ? '(' + this.state.display + ')' : this.state.display;
    let currFormula = (this.state.formula.replace('×', '*') + this.state.display).split(/([/+*-])/g).join(' ');
    let result = eval(currFormula);
    this.setState({
      formula: this.state.formula + display + '=' + result,
      display: result,
      done: true
    });
  }

  changeDisplay(value, method) {
    switch(method) {
      case 'UPDATE':
        if (this.state.done) {
          this.setState({
            formula: '',
            display: value,
            done: false
          });
        } else {
          this.setState({ display: value });
        }
        break;
      case 'EQUALS':
        if (!this.state.done) {
          this.calculate();
        }
        break;
      case 'OPERATION':
        if (this.state.done) {
          this.setState({
            formula: this.state.display,
            display: 0,
            done: false
          }, () => {
            this.displayFormula(value);
          })
        } else {
          this.displayFormula(value);
        }
        break;
      case 'CLEAR':
        this.setState({
          display: 0,
          formerDisplay: 0,
          formula: '',
          done: false
        });
        break;
      default:
        console.warn('Unknown method');
    }
  }

  render() {
    return (
      <Main>
        <Display output={this.state.display} formula={this.state.formula} />
        <Editor changeDisplay={this.changeDisplay} done={this.state.done} />
      </Main>
    )
  }
}

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Calculator />
      <Credit id="credit">
        <p>by <a href="https://www.github.com/betich" rel="noopener noreferrer" target="_blank">betich</a></p>
      </Credit>
    </React.Fragment>
  );
}

export default App;
