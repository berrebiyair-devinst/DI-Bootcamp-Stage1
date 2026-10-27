import React, { useState } from "react";
import BuggyCounter from "./Components/BuggyCounter";
import ErrorBoundary from "./Components/ErrorBoundary";
import Color from "./Components/Color";

function App() {
  const [simulation, setSimulation] = useState("1");

  return (
    <div>
      <h1>React Lifecycle Exercises</h1>

      <h2>Exercise 1 - Error Boundaries</h2>

      <button onClick={() => setSimulation("1")}>
        Simulation 1
      </button>

      <button onClick={() => setSimulation("2")}>
        Simulation 2
      </button>

      <button onClick={() => setSimulation("3")}>
        Simulation 3
      </button>

      <h3>Simulation {simulation}</h3>

      {simulation === "1" && (
        <ErrorBoundary>
          <BuggyCounter />
          <BuggyCounter />
        </ErrorBoundary>
      )}

      {simulation === "2" && (
        <>
          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>

          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>
        </>
      )}

      {simulation === "3" && <BuggyCounter />}

      <hr />

      <h2>Exercises 2 & 3 - Lifecycle</h2>
      <Color />
    </div>
  );
}

export default App;