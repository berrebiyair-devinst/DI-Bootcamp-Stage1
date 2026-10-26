import React from "react";

class Child extends React.Component {
  componentWillUnmount() {
    alert("Component is unmounted!");
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

class Color extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteColor: "red",
      show: true
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 2000);
  }

  shouldComponentUpdate() {
    return true;
  }

  getSnapshotBeforeUpdate() {
    console.log("in getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate() {
    console.log("after update");
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  changeColor = () => {
    this.setState({ favoriteColor: "blue" });
  };

  removeChild = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <h1>My favorite color is {this.state.favoriteColor}</h1>

        <button onClick={this.changeColor}>
          Change color
        </button>

        {this.state.show && <Child />}

        <button onClick={this.removeChild}>
          Supprimer
        </button>
      </div>
    );
  }
}

export default Color;