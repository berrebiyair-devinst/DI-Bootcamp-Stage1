import { useDispatch } from "react-redux";
import { increment, decrement,reset  } from "./counterSlice";
import { DisplayCounter} from "./DisplayCounter.jsx";

export function Counter() {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Redux Counter</h2>

      <DisplayCounter />

      <button onClick={() => dispatch(increment())}>
        +
      </button>

      <button onClick={() => dispatch(decrement())}>
        -
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>

    </div>
  );
}