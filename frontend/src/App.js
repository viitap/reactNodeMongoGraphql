import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    input: '',
    locations: []
  };

  constructor(props) {
    super(props);
     fetch('/locations').then(function(response) {
       return response.json();
     }).then(function(json) {
       this.setState({
           locations : json
       })
     }.bind(this));
  }

  clickHandler = () => {
  };

  inputChange = e => {
    this.setState({
      input: e.target.value,
    });
  };

  render() {
    return (
        <div>
            <div>Locations: {this.state.locations.map(l => l.name)}</div>
            <div>
                <input type="text" value={this.state.input} onChange={this.inputChange} />
            </div>
            <div>
                <button onClick={this.clickHandler}>Kuikka</button>
            </div>
        </div>
    );
  }
}

export default(App);
