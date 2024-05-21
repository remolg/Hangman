import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { HangmanKeyboard } from "./HangmanKeyboard";
import words from "./worldList.json";

const categories = ["Hayvanlar", "Eşyalar", "Ülkeler", "Şehirler"];

function getWord(category: string) {
  const selectedCategory = words[category as keyof typeof words];
  return selectedCategory[Math.floor(Math.random() * selectedCategory.length)];
}

function App() {
  const [category, setCategory] = useState(() => {
    const savedCategory = localStorage.getItem("hangmanCategory");
    return savedCategory || "Hayvanlar";
  });
  const [wordToGuess, setWordToGuess] = useState(() => getWord(category));
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("hangmanCategory", category);
  }, [category]);

  useEffect(() => {
    setWordToGuess(getWord(category));
    setGuessedLetters([]);
  }, [category]);

  const handler = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    if (key !== "Enter") return;

    e.preventDefault();
    setGuessedLetters([]);
    setWordToGuess(getWord(category));
  }, [category]);

  useEffect(() => {
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [handler]);

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.toLowerCase().includes(letter.toLowerCase())
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .toLowerCase()
    .split("")
    .every(letter => guessedLetters.map(l => l.toLowerCase()).includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      const lowerLetter = letter.toLowerCase();
      if (guessedLetters.map(l => l.toLowerCase()).includes(lowerLetter) || isLoser || isWinner)
        return;

      setGuessedLetters(currentLetters => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Kazandın ✓ - Enter tuşuna basarak tekrar oyna!"}
        {isLoser && "Maalesef Olmadı  X - Enter tuşuna basarak tekrar oyna!"}
      </div>
      <div>
        <label htmlFor="category" style={{ fontSize: "1.5rem" }}>
          Kategori Seçin :
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: ".75rem",
            fontSize: "1rem",
            lineHeight: "23px",
            borderRadius: "15px 225px 255px 15px 15px 255px 225px 15px",
            border: "2px solid #41403e",
            backgroundColor: "#fff",
            backgroundImage: "none",
            backgroundPosition: "0 90%",
            backgroundRepeat: "repeat no-repeat",
            backgroundSize: "4px 3px",
            boxShadow: "rgba(0, 0, 0, .2) 15px 28px 25px -18px",
            fontFamily: "Neucha, sans-serif",
            color: "#41403e",
            cursor: "pointer",
            outline: "none",
            transition: "all 235ms ease-in-out",
            borderBottomLeftRadius: "15px 255px",
            borderBottomRightRadius: "225px 15px",
            borderTopLeftRadius: "255px 15px",
            borderTopRightRadius: "15px 225px",
          }}
        >
          {categories.map((cat, id) => (
            <option key={id} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <HangmanKeyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.toLowerCase().includes(letter.toLowerCase())
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
