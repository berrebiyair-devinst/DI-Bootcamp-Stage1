import { ThemeProvider } from "./ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";
import CharacterCounter from "./CharacterCounter";
function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      <CharacterCounter />
    </ThemeProvider>
  );
}

export default App;