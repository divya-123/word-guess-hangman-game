import { useCallback, useEffect, useState } from 'react'
import words from './wordList.json';
import styles from './App.module.css';
import HangmanDrawing from './HangmanDrawing';
import HangmanWord from './HangmanWord';
import Keyboard from './Keyboard';

function getWord(){
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(() =>{
    return words[Math.floor(Math.random() * words.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(letter=> !wordToGuess.includes(letter));

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter:string) => {
    if(guessedLetters.includes(letter) || isLoser || isWinner){
      return;
    }
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isLoser, isWinner]);

  // const addGuessedLetter = (letter:string) => {
  //   if(guessedLetters.includes(letter)){
  //     return;
  //   }
  //   setGuessedLetters(currentLetters => [...currentLetters, letter]);
  // };
  useEffect(()=>{
    const handler = (e: KeyboardEvent) =>{
      const key = e.key;

      if(!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    }
    document.addEventListener("keypress", handler);
    
    return ()=>{
      document.removeEventListener("keypress", handler);
    }
  },[guessedLetters]);

  useEffect(()=>{
    const handler = (e: KeyboardEvent) =>{
      const key = e.key;

      if(key!=="Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    }
    document.addEventListener("keypress", handler);
    
    return ()=>{
      document.removeEventListener("keypress", handler);
    }
  },[]);
  return (
    <div className={styles.mainBody}>
      <div className={styles.heading}>
        <div style = {{color:'green'}}>
        {isWinner && "Winner!!! Refresh to try again."}
        </div>
        <div style = {{color:'red'}}>
        {isLoser && "Nice try!!! Refresh to try again."}
        </div>
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWord reveal={isLoser} guessedLetters = {guessedLetters} wordToGuess = {wordToGuess}/>
      <div style = {{alignSelf : "stretch"}}>
      <Keyboard 
              disabled = {isWinner || isLoser}
              activeLetter = {guessedLetters.filter(letter=>{
                  wordToGuess.includes(letter);
              })}
              inactiveLetter = {incorrectLetters}
              addGuessedLetter={addGuessedLetter}
      />
      </div>
    </div>
  )
}

export default App
