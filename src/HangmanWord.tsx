type HangmanWordProps = {
  guessedLetters: string[]
  wordToGuess: string
  reveal?: boolean
}

export function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWordProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => {
        const isGuessed = guessedLetters.map(l => l.toLocaleLowerCase()).includes(letter.toLocaleLowerCase())
        return (
          <span style={{ borderBottom: ".1em solid black" }} key={index}>
            <span
              style={{
                visibility:
                  isGuessed || reveal ? "visible" : "hidden",
                color:
                  !isGuessed && reveal ? "red" : "black",
              }}
            >
              {letter}
            </span>
          </span>
        )
      })}
    </div>
  )
}
