
import { useState, useRef, useEffect } from "react";
import { useTasks } from "./TaskContext";

function Todolist() {
  const { state, dispatch } = useTasks();

  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);

  const editRef = useRef(null);

  const handleAddTask = () => {
    if (!task.trim()) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: crypto.randomUUID(),
        text: task.trim(),
        completed: false
      }
    });

    setTask("");
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
  };

  useEffect(() => {
    if (editingId !== null && editRef.current) {
      editRef.current.focus();
    }
  }, [editingId]);

  const saveEdit = (id) => {
    const newText = editRef.current?.value.trim();

    if (!newText) return;

    dispatch({
      type: "EDIT_TASK",
      payload: {
        id,
        text: newText
      }
    });

    setEditingId(null);
  };

  const filteredTasks = state.tasks.filter(todo => {
    if (state.filter === "COMPLETED") return todo.completed;
    if (state.filter === "ACTIVE") return !todo.completed;
    return true;
  });

  return (
    <div>
      <h1>Task Manager</h1>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />

      <button onClick={handleAddTask}>Add Task</button>

      <div>
        <button onClick={() => dispatch({
          type: "FILTER_TASKS",
          payload: "ALL"
        })}>All</button>

        <button onClick={() => dispatch({
          type: "FILTER_TASKS",
          payload: "ACTIVE"
        })}>Active</button>

        <button onClick={() => dispatch({
          type: "FILTER_TASKS",
          payload: "COMPLETED"
        })}>Completed</button>
      </div>

      <ul>
        {filteredTasks.map(todo => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  ref={editRef}
                  defaultValue={todo.text}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(todo.id);
                  }}
                />
                <button onClick={() => saveEdit(todo.id)}>
                  Save
                </button>
                <button onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch({
                    type: "TOGGLE_TASK",
                    payload: todo.id
                  })}
                />

                <span
                  onClick={() => startEditing(todo)}
                  style={{
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                    cursor: "pointer"
                  }}
                >
                  {todo.text}
                </span>

                <button onClick={() => startEditing(todo)}>
                  Edit
                </button>

                <button onClick={() => dispatch({
                  type: "REMOVE_TASK",
                  payload: todo.id
                })}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;
