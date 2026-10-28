import React from "react";
import exersise3 from "./exersise3.json";

class Example1 extends React.Component {
  render() {
    return (
      <div>
        <h2>Social Medias</h2>

        {exersise3.SocialMedias.map((social, index) => (
          <div key={index}>
            <a href={social}>{social}</a>
          </div>
        ))}
      </div>
    );
  }
}

export default Example1;