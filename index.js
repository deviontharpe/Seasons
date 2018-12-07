import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

// const App = () => {
//   window.navigator.geolocation.getCurrentPosition(
//     position => console.log(position),
//     err => console.log(err)
//   );
//   return <div>Latitude: </div>;
// };

console.log("Started...");

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount = () => {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );
  };

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please Accept location request!" />;
  }

  //React says we have to define render
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
