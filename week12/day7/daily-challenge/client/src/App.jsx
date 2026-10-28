
import React from "react";

class App extends React.Component {
  state = {
    message: "",
    inputValue: "",
    response: ""
  };

  componentDidMount() {
    this.getMessage();
  }

  getMessage = async () => {
    const res = await fetch("http://localhost:5000/api/hello");
    const data = await res.text();

    this.setState({ message: data });
  };

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:5000/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        value: this.state.inputValue
      })
    });

    const data = await res.text();

    this.setState({ response: data });
  };

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
            placeholder="Enter a message"
          />

          <button type="submit">Submit</button>
        </form>

        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default App;
