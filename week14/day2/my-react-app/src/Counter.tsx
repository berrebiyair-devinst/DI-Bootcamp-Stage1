import {useState,} from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);

  const [lastAction, setLastAction] = useState<string>("None");
  const increment = () => {
    setCount(count + 1);
    setLastAction("Incremented");
  }
  const decrement = () => {
    setCount(count - 1);
    setLastAction("Decremented");
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <p>Last action: {lastAction}</p>
      <button onClick={increment}>
        Click me
      </button>
      <button onClick={decrement}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;