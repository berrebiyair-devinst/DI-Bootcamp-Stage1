
import { useState } from "react";
import { DaySelector } from "./components/DaySelector";
import { AddTask } from "./components/AddTask";
import { TaskList } from "./components/TaskList";
import "./App.css";

function App() {
  const [selectedDay, setSelectedDay] = useState("monday");

  return (
    <div className="app">
      <h1>Daily Planner</h1>

      <DaySelector
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />

      <AddTask selectedDay={selectedDay} />

      <TaskList selectedDay={selectedDay} />
    </div>
  );
}

export default App;
