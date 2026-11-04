

import { useDispatch } from "react-redux";
import { deleteTask } from "../features/dailyPlannerSlice";

export const DeleteTask = ({ index, selectedDay }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask({
      day: selectedDay,
      index
    }));
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
};
