
import styles from './HangmanWord.module.css';
type HangmanWordProps = {
    reveal?: boolean
    guessedLetters: string[]
    wordToGuess: string
}
const HangmanWord = ( {reveal=false, guessedLetters, wordToGuess}:HangmanWordProps ) =>{
    // const word = "test";
    // const guessedLetters = ["t", "e", "g"];
    return (
        <div className={styles.mainBody}>
            {wordToGuess.split("").map((letter, index)=>(
                <span className={styles.word} key={index}>
                    <span style={{
                        visibility : guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden',
                        color: !guessedLetters.includes(letter) && reveal ? "red" : "black"

                    }}>
                        {letter}
                    </span>
                </span>
            ))}
        </div>
    );
};

export default HangmanWord;