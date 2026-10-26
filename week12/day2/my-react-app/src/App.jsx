import { useState } from "react";

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 }
  ]);
 
  const vote=(languageName) => {
    setLanguages(languages.map(language => {
      if (language.name === languageName) {
        return { ...language, votes: language.votes + 1 };
      }
      return language;
    }));
  };
 return (
  <div>
    <h1>Vote for your favorite language!</h1>

    {languages.map((language) => (
      <div key={language.name}>
        <span>{language.name} : {language.votes} votes </span>

        <button onClick={() => vote(language.name)}>
          Vote
        </button>
      </div>
    ))}
  </div>
);
}

export default App;