import React, { Component } from "react";
import moment from "moment";
import WeatherResults from "./WeatherResults";
import WeatherLeft from "./WeatherLeft";
import WeatherRight from "./WeatherRight";
import DataList from "./DataList";
import WeatherButton from "./WeatherButton";

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: null,
      isLoading: null
    };
  }

  componentDidMount() {
    this.setState({
      message: "Press button below to get weather data"
    });
  }

  // Get weather data on button click
  fetchData(e) {
    e.preventDefault();
    console.log("Clicked");

    // Set state
    this.setState({
      message: "Loading..."
    });

    // Fetch weather data
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=a12bdf3ba8d1fe9462fc6875c17c1e7f"
    )
      .then(res => res.json())
      .then(data => {
        // Get all weather descriptions
        let dataDesc = () => {
          const desc = [];
          for (let i = 0; i < data.weather.length; i++) {
            let item = data.weather[i].main;
            desc.push(item);
          }
          return `${desc.join(", ")}`;
        };

        // Convert sunrise & sunset from unix to readable
        let sunFormat = "H:mma";
        let sunrise = moment.unix(data.sys.sunrise);
        let sunset = moment.unix(data.sys.sunset);

        // Weather data source
        const dataSource = {
          location: data.name,
          description: dataDesc(),
          temp: `${data.main.temp}`,
          wind: `${data.wind.speed} mph`,
          sunrise: sunrise.format(sunFormat),
          sunset: sunset.format(sunFormat)
        };
        // set state
        this.setState({ dataSource });
      });
  }

  render() {
    let weatherRight;
    if (this.state.dataSource) {
      weatherRight = <DataList data={this.state.dataSource} />;
    } else {
      weatherRight = <p className="Message">{this.state.message}</p>;
    }
    return (
      <div className="WeatherContainer">
        <WeatherResults>
          <WeatherLeft />
          <WeatherRight data={this.state.message}>{weatherRight}</WeatherRight>
        </WeatherResults>
        <WeatherButton onClick={this.fetchData.bind(this)} />
      </div>
    );
  }
}

export default Weather;
