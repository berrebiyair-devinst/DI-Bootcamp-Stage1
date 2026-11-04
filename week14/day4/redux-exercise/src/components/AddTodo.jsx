import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/TodoSlice";

export const AddTodo = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

   const handleAddTodo =() => {
    if (text.trim() !== "") {
      const newTodo = {
        id: crypto.randomUUID(),
        text: text,
        completed: false
      };
      dispatch(addTodo(newTodo));
      setText("");
    }
   }
   return (
    <div>
      <h2>Add Todo</h2>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={handleAddTodo}>Add</button>
    </div>
   )
};