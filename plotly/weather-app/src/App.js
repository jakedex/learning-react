import React, { Component } from 'react';
import xhr from 'xhr';
import './App.css';


class App extends Component {
  state = {
    location: '',
    data: {}
  };

  fetchData = (evt) => {
    evt.preventDefault();

    const location = encodeURIComponent(this.state.location);
    const urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    const urlSuffix = '&APPID=12e0f4bb6997b1d9977bb6d02727a279&units=imperial';
    const url = urlPrefix + location + urlSuffix;

    // let self = this;

    xhr({
      url
    }, (err, data) => {
      this.setState({
        data: JSON.parse(data.body)
      });
    });
  };

  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };

  render() {
    let currentTemp = 'not loaded yet';
    if (this.state.data.list) {
      console.log(this.state.data.list);
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the weather for
            <input placeholder={'City, country'} type="text" value={this.state.location} onChange={this.changeLocation} />
          </label>
        </form>
        <p className="temp-wrapper">
          <span className="temp">{ currentTemp }</span>
          <span className="temp">°F</span>
        </p>
      </div>
    );
  }
}

export default App;
