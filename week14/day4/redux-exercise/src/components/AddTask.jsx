
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/dailyPlannerSlice";

export const AddTask = ({ selectedDay }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() === "") return;

    const newTask = {
      id: crypto.randomUUID(),
      text: text.trim()
    };

    dispatch(addTask({
      day: selectedDay,
      task: newTask
    }));

    setText("");
  };

  return (
    <div>
      <h2>Add Task</h2>

      <input
        type="text"
        placeholder="Enter a task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};
