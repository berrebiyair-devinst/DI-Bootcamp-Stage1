import { useRef, useState } from "react";

function CharacterCounter() {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  const handleChange = () => {
    setCount(inputRef.current.value.length);
  };

  return (
    <div className="counter">
      <h1>Character Counter</h1>

      <input
        type="text"
        ref={inputRef}
        onChange={handleChange}
        placeholder="Enter your text..."
      />

      <p>Number of characters: {count}</p>
    </div>
  );
}

export default CharacterCounter;