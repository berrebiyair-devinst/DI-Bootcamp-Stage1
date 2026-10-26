import { useState } from "react";

function Phone() {
  const [brand, setBrand] = useState("Samsung");
  const [model, setModel] = useState("Galaxy S20");
  const [color, setColor] = useState("black");
  const [year, setYear] = useState(2020);

  function changeColor(newColor){
    setColor("blue");
  }
  return (
    <div>
      <h1>My Phone</h1>
      <p>Brand: {brand}</p>
      <p>Model: {model}</p>
      <p>Color: {color}</p>
      <p>Year: {year}</p>

      <button type="button" onClick={changeColor}>Change color</button>
    </div>
  );
}

export default Phone;