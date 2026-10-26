import { useState } from "react";

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true);

  const clickMe = () => {
    alert("J'ai été cliqué");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      alert(event.target.value);
    }
  };

  const toggle = () => {
    setIsToggleOn(prev => !prev);
  };

  return (
    <>
      <button onClick={clickMe}>Click Me</button>

      <input
        type="text"
        placeholder="Write something..."
        onKeyDown={handleKeyDown}
      />

      <button onClick={toggle}>
        {isToggleOn ? "ON" : "OFF"}
      </button>
    </>
  );
}

export default Events;