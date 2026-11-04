import { useSelector } from "react-redux";
import { selectCount } from "./counterSlice";

export function DisplayCounter() {
  const count = useSelector(selectCount);
  return <div>Count: {count}</div>;
}