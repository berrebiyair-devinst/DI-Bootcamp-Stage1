
import { useSelector } from "react-redux";
import { EditTask } from "./EditTask";
import { DeleteTask } from "./Deletetask";

export const TaskList = ({ selectedDay }) => {
  const tasks = useSelector(
    (state) => state.dailyPlanner.dailyPlan[selectedDay]
  );

  return (
    <div>
      <h2>Tasks for {selectedDay}</h2>

      {tasks.length === 0 ? (
        <p>No tasks for this day.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={task.id}>
              <p>{task.text}</p>

              <EditTask
                key={`${selectedDay}-${task.id}`}
                task={task}
                index={index}
                selectedDay={selectedDay}
              />

              <DeleteTask
                index={index}
                selectedDay={selectedDay}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
