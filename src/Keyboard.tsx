import styles from './Keyboard.module.css';
const KEYS = ["a", "b" , "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

type KeyboardProps = {
    disabled: boolean
    activeLetter: string[]
    inactiveLetter: string[]
    addGuessedLetter: (letter: string)=> void
};

const Keyboard = ({disabled = false, activeLetter, inactiveLetter, addGuessedLetter}: KeyboardProps) =>{
    return (
        <div className={styles.keyboardgrid}>
            {KEYS.map((key)=>{
                const isActive = activeLetter.includes(key);
                const isInactive = inactiveLetter.includes(key);
                return(
                    <button onClick = {() => addGuessedLetter(key)} 
                            key={key} 
                            className={`${styles.btn} ${isActive ? styles.active : ""}
                                                      ${isInactive ? styles.inactive : ""}`}
                            disabled= {isActive||isInactive||disabled}
                    >{key}</button>
                );
            })}
        </div>
    );
};

export default Keyboard;