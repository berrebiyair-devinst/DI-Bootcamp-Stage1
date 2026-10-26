import { useState } from "react";
import Garage from "./Garage";

function Car(props) {
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>This car is {color} {props.model}</h1>
      <Garage size="small" />
    </>
  );
}

export default Car;