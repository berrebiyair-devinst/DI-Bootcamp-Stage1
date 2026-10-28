import React from "react";
import exersise3 from "./exersise3.json";

class Example3 extends React.Component {
  render() {
    return (
      <div>
        <h2>Experiences</h2>

        {exersise3.Experiences.map((experience, index) => (
          <div key={index}>
            <h3>{experience.companyName}</h3>

            <a href={experience.url}>
              Company Website
            </a>

            {experience.roles.map((role, i) => (
              <div key={i}>
                <h4>{role.title}</h4>
                <p>{role.description}</p>
                <p>{role.startDate} - {role.endDate}</p>
                <p>{role.location}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;