
import React from "react";

function FormComponent(props) {
  return (
    <div>
      <h1>Sample Form</h1>

      <form method="GET">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={props.data.firstName}
          onChange={props.handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={props.data.lastName}
          onChange={props.handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={props.data.age}
          onChange={props.handleChange}
        />

        <h3>Gender</h3>

        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={props.data.gender === "male"}
            onChange={props.handleChange}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={props.data.gender === "female"}
            onChange={props.handleChange}
          />
          Female
        </label>

        <h3>Destination</h3>

        <select
          name="destination"
          value={props.data.destination}
          onChange={props.handleChange}
        >
          <option value="">Select a destination</option>
          <option value="Japan">Japan</option>
          <option value="Thailand">Thailand</option>
          <option value="Brazil">Brazil</option>
        </select>

        <h3>Dietary Restrictions</h3>

        <label>
          <input
            type="checkbox"
            name="nutsFree"
            checked={props.data.nutsFree}
            onChange={props.handleChange}
          />
          Nuts Free
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="lactoseFree"
            checked={props.data.lactoseFree}
            onChange={props.handleChange}
          />
          Lactose Free
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="vegan"
            checked={props.data.vegan}
            onChange={props.handleChange}
          />
          Vegan
        </label>

        <br /><br />

        <button type="submit">Submit</button>
      </form>

      <hr />

      <h2>Entered Information:</h2>

      <p>First Name: {props.data.firstName}</p>
      <p>Last Name: {props.data.lastName}</p>
      <p>Age: {props.data.age}</p>
      <p>Gender: {props.data.gender}</p>
      <p>Destination: {props.data.destination}</p>

      <h3>Dietary Restrictions:</h3>

      <p>Nuts Free: {props.data.nutsFree ? "Yes" : "No"}</p>
      <p>Lactose Free: {props.data.lactoseFree ? "Yes" : "No"}</p>
      <p>Vegan: {props.data.vegan ? "Yes" : "No"}</p>
    </div>
  );
}

export default FormComponent;
