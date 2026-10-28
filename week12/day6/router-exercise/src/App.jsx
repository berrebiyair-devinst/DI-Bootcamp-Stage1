
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import ErrorBoundary from "./ErrorBoundary.jsx";
import PostList from "./PostList.jsx";
import Example1 from "./Example1.jsx";
import Example2 from "./Example2.jsx";
import Example3 from "./Example3.jsx";

// Exercice 4 : POST JSON avec fetch
const user = {
  key1: "myusername",
  email: "mymail@gmail.com",
  name: "Isaac",
  lastname: "Doe",
  age: 27
};

const sendData = async () => {
  const response = await fetch(
    "https://webhook.site/9344240c-0d5f-468a-98b6-43679e98dc25",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }
  );

  console.log(response);
};

// Exercice 1 : React Router et ErrorBoundary
function HomeScreen() {
  return <h1>Home</h1>;
}

function ProfileScreen() {
  return <h1>Profile</h1>;
}

function ShopScreen() {
  throw new Error("ShopScreen crashed!");
}

// Application principale
function App() {
  return (
    <>
      {/* Exercice 2 : Affichage des posts JSON */}
      <PostList />

      {/* Exercice 4 : Envoi de données JSON */}
      <button onClick={sendData}>Send Data</button>

      <BrowserRouter>
        <nav>
          <NavLink to="/">
            Home <Example1 />
          </NavLink>

          <NavLink to="/profile">
            Profile <Example2 />
          </NavLink>

          <NavLink to="/shop">
            Shop <Example3 />
          </NavLink>
        </nav>

        <hr />

        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomeScreen />
              </ErrorBoundary>
            }
          />

          <Route
            path="/profile"
            element={
              <ErrorBoundary>
                <ProfileScreen />
              </ErrorBoundary>
            }
          />

          <Route
            path="/shop"
            element={
              <ErrorBoundary>
                <ShopScreen />
              </ErrorBoundary>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
