import React from "react";
import exersise3 from "./exersise3.json";

class Example2 extends React.Component {
  render() {
    return (
      <div>
        <h2>Skills</h2>

        {exersise3.Skills.map((skill, index) => (
          <div key={index}>
            <h3>{skill.Area}</h3>

            {skill.SkillSet.map((item, i) => (
              <p key={i}>
                {item.Name}
              </p>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Example2;