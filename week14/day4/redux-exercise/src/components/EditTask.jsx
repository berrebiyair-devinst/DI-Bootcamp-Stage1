
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../features/dailyPlannerSlice";

export const EditTask = ({ task, index, selectedDay }) => {
  const [text, setText] = useState(task.text);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (text.trim() === "") return;

    dispatch(editTask({
      day: selectedDay,
      index,
      updatedTask: {
        ...task,
        text: text.trim()
      }
    }));
  };

  return (
    <div className="edit-task">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleEdit}>
        Save
      </button>
    </div>
  );
};
