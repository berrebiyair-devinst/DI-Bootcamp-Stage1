
import { TaskProvider } from "./TaskContext";
import Todolist from "./Todolist";

function App() {
  return (
    <TaskProvider>
      <Todolist />
    </TaskProvider>
  );
}

export default App;
