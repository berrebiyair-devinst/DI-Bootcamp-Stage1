import React from "react";
import "./Exercise.css";

class Exercise extends React.Component {
  render() {
    const style_header = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    return (
      <div>
        <h1 style={style_header}>This is a Header</h1>

        <p className="para">This is a Paragraph</p>

        <a href="https://react.dev">
          This is a Link
        </a>

        <form>
          <input type="text" placeholder="Your name" />
          <button type="submit">Submit</button>
        </form>

        <img
          src="https://react.dev/images/og-home.png"
          alt="React"
          width="200"
        />

        <ul>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;