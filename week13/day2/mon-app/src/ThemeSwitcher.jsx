import { useContext } from "react";
import ThemeContext from "./ThemeContext";

function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : "white",
        padding: "30px"
      }}
    >
      <h1>Current theme: {theme}</h1>

      <button onClick={toggleTheme}>
        Changer de thème
      </button>
    </div>
  );
}

export default ThemeSwitcher;