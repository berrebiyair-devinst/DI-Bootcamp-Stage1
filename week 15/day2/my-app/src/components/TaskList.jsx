import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectTasksByCategory,
  selectCompletedTasks,
} from "../features/taskSelectors";

import {
  addTask,
  removeTask,
  editTask,
  updateTaskStatus,
} from "../features/tasksSlice";

import CategorySelector from "./CategorySelector";

function TaskList() {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(1);

  const tasks = useSelector((state) =>
    selectTasksByCategory(state, selectedCategory)
  );

  const completedTasks = useSelector(selectCompletedTasks);

  const handleAddTask = () => {
    if (!title.trim()) return;

    dispatch(
      addTask({
        id: Date.now(),
        title,
        description,
        categoryId,
        completed: false,
        progress: 0,
      })
    );

    setTitle("");
    setDescription("");
  };

  const handleDelete = useCallback(
    (id) => {
      dispatch(removeTask(id));
    },
    [dispatch]
  );

  const handleComplete = useCallback(
    (task) => {
      dispatch(
        updateTaskStatus({
          id: task.id,
          completed: !task.completed,
          progress: task.completed ? 0 : 100,
        })
      );
    },
    [dispatch]
  );

  const handleProgress = useCallback(
    (task, progress) => {
      dispatch(
        updateTaskStatus({
          id: task.id,
          completed: progress === 100,
          progress,
        })
      );
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (task) => {
      const newTitle = prompt("Edit task title:", task.title);

      if (newTitle === null || !newTitle.trim()) return;

      const newDescription = prompt(
        "Edit description:",
        task.description
      );

      if (newDescription === null) return;

      dispatch(
        editTask({
          id: task.id,
          title: newTitle,
          description: newDescription,
        })
      );
    },
    [dispatch]
  );

  return (
    <div>
      <h2>Productivity Tracker</h2>

      <h3>Completed Tasks: {completedTasks}</h3>

      <CategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <h3>Add Task</h3>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
      >
        <option value={1}>Work</option>
        <option value={2}>Study</option>
        <option value={3}>Personal</option>
      </select>

      <button onClick={handleAddTask}>Add Task</button>

      <h3>Task List</h3>

      {tasks.map((task) => (
        <div key={task.id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Progress: {task.progress}%</p>

          <input
            type="range"
            min="0"
            max="100"
            value={task.progress}
            onChange={(e) =>
              handleProgress(task, Number(e.target.value))
            }
          />

          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(task)}
            />
            Completed
          </label>

          <button onClick={() => handleEdit(task)}>
            Edit
          </button>

          <button onClick={() => handleDelete(task.id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default TaskList;