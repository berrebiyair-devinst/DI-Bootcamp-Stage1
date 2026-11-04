import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo } from "../features/TodoSlice";

export const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <span>{todo.text}</span>

      <button onClick={() => dispatch(toggleTodo(todo.id))}>
        {todo.completed ? "Unmark" : "Mark"}
      </button>

      
      <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
    </li>
  );
};