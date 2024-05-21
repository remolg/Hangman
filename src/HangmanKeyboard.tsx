import styles from "./Keyboard.module.css";

const ROW1 = ["q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "ü"];
const ROW2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "i"];
const ROW3 = ["z", "x", "c", "v", "b", "n", "m", "ö", "ç"];


type KeyboardProps = {
    disabled?: boolean;
    activeLetters: string[];
    inactiveLetters: string[];
    addGuessedLetter: (letter: string) => void;
};


export function HangmanKeyboard({ activeLetters, inactiveLetters, addGuessedLetter, disabled = false, }: KeyboardProps) {

    const handleClick = (key: string) => {
        addGuessedLetter(key);
    };

    const renderKey = (key: string) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);

        return (
            <button
                onClick={() => handleClick(key)}
                className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`}
                disabled={isInactive || isActive || disabled}
                key={key}
            >
                {key}
            </button>
        );
    };

    return (
        <div>
            <div className={styles.row}>
                {ROW1.map(renderKey)}
            </div>
            <div className={styles.row}>
                {ROW2.map(renderKey)}
            </div>
            <div className={styles.row}>
                {ROW3.map(renderKey)}
            </div>
        </div>
    );
}
