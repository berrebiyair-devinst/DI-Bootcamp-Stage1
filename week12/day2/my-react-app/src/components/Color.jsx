import {useEffect, useState} from "react";




function Color() {
  const [favoriteColor, setFavoriteColor] = useState("red");
useEffect(() => {
    alert("useEffect called");
}, []);
const changeColor = () => {
    setFavoriteColor("blue");
}
  return (
    <div>
      <h1>My favorite color is {favoriteColor}</h1>
      <button type="button" onClick={changeColor}>
        Change Color
      </button>
    </div>
  );
}

export default Color;