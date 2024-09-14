import React, { useState, useEffect, useCallback } from 'react';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/Card'; // Adjust the path if necessary
import Button from './components/ui/Button'; // Adjust the path if necessary
import Input from './components/ui/Input'; // Adjust the path if necessary
import Progress from './components/ui/Progress'; // Adjust the path if necessary
import { Alert, AlertDescription } from './components/ui/Alert';

// Assuming lucide-react is already installed
import { Check, X, Clock, Star } from 'lucide-react';

// Example movie scenes
const movieScenes = [
    {
      id: 1,
      iconicElements: ['Ship', 'Man', 'Arms spread', 'Ocean'],
      movie: "Titanic",
      hints: ["Released in 1997", "Directed by James Cameron", "Stars Leonardo DiCaprio"],
      image: "https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/9874701/titaniccover.jpg?quality=90&strip=all&crop=0,0.72677999507268,100,98.546440009855", // Replace with actual URL
    },
    {
      id: 2,
      iconicElements: ['Woman', 'White dress', 'Subway grate', 'Wind'],
      movie: "The Seven Year Itch",
      hints: ["Released in 1955", "Stars Marilyn Monroe", "Directed by Billy Wilder"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ueEGtP35381msNA8WTAV8Izl7PB_8s9hdw&s", // Replace with actual URL
    },
    // Add more movie scenes here
  ];

const INITIAL_TIME = 30;
const HINT_PENALTY = 5;

const VisualMovieGuessingGame = () => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [hintIndex, setHintIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(INITIAL_TIME);
    const [gameState, setGameState] = useState('playing'); // 'playing', 'correct', 'incorrect'
    const [isGameOver, setIsGameOver] = useState(false);
  
    const currentScene = movieScenes[currentSceneIndex];
  
    const resetGame = useCallback(() => {
      setCurrentSceneIndex(0);
      setGuess('');
      setMessage('');
      setHintIndex(0);
      setTimer(INITIAL_TIME);
      setGameState('playing');
      setScore(0);
      setIsGameOver(false);
    }, []);
  
    const handleNextScene = useCallback(() => {
      if (currentSceneIndex < movieScenes.length - 1) {
        setCurrentSceneIndex(prev => prev + 1);
        setGuess('');
        setMessage('');
        setHintIndex(0);
        setTimer(INITIAL_TIME);
        setGameState('playing');
      } else {
        setIsGameOver(true);
      }
    }, [currentSceneIndex]);
  
    useEffect(() => {
      // generateImageFromScene();
    }, []);
  
    useEffect(() => {
      if (gameState !== 'playing' || isGameOver) return;
  
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setGameState('incorrect');
            setMessage(`Time's up! The movie was "${currentScene.movie}".`);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }, [gameState, isGameOver, currentScene.movie]);
  
    const handleGuess = useCallback(() => {
      if (guess.toLowerCase() === currentScene.movie.toLowerCase()) {
        const timeBonus = Math.max(10, timer);
        setScore(prevScore => prevScore + timeBonus);
        setMessage(`Correct! You earned ${timeBonus} points.`);
        setGameState('correct');
      } else {
        setMessage(`Sorry, that's not correct. The movie was "${currentScene.movie}".`);
        setGameState('incorrect');
      }
    }, [guess, currentScene.movie, timer]);
  
    const handleHint = useCallback(() => {
      if (hintIndex < currentScene.hints.length) {
        setHintIndex(prevIndex => prevIndex + 1);
        setTimer(prevTimer => Math.max(prevTimer - HINT_PENALTY, 0));
      }
    }, [currentScene.hints.length, hintIndex]);
  
    if (isGameOver) {
      return (
        <Card className="w-96 mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Game Over!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4">Your final score: {score}</p>
            <Button onClick={resetGame} className="w-full">Play Again</Button>
          </CardContent>
        </Card>
      );
    }
  
    return (
      <Card className="w-96 mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Guess the Movie</CardTitle>
        </CardHeader>
        <CardContent>
          <img 
            src={currentScene.image} 
            alt="Movie scene" 
            className="w-24 h-24 object-cover rounded-lg shadow-md mb-4" // Set image size to 24x24
          />
          <div className="flex flex-wrap justify-center mb-4">
            {currentScene.iconicElements.map((element, index) => (
              <span key={index} className="m-1 px-2 py-1 bg-gray-200 rounded-full text-sm">
                {element}
              </span>
            ))}
          </div>
          <div className="mb-4">
            <Progress value={(timer / INITIAL_TIME) * 100} />
            <div className="flex justify-between mt-1 text-sm">
              <span><Clock className="inline mr-1" size={16} /> {timer}s</span>
              <span><Star className="inline mr-1" size={16} /> {score}</span>
            </div>
          </div>
          <Input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter movie title"
            className="mb-4"
            disabled={gameState !== 'playing'}
          />
          <div className="flex justify-between mb-4">
            <Button onClick={handleGuess} disabled={gameState !== 'playing'}>Submit Guess</Button>
            <Button onClick={handleHint} disabled={gameState !== 'playing' || hintIndex >= currentScene.hints.length}>
              Get Hint ({currentScene.hints.length - hintIndex})
            </Button>
          </div>
          {hintIndex > 0 && (
            <ul className="mt-4 pl-5 list-disc">
              {currentScene.hints.slice(0, hintIndex).map((hint, index) => (
                <li key={index} className="text-sm">{hint}</li>
              ))}
            </ul>
          )}
          {message && (
            <Alert className="mt-4" variant={gameState === 'correct' ? 'default' : 'destructive'}>
              {gameState === 'correct' && <Check className="h-4 w-4" />}
              {gameState === 'incorrect' && <X className="h-4 w-4" />}
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleNextScene} className="w-full" disabled={gameState === 'playing'}>
            {currentSceneIndex < movieScenes.length - 1 ? 'Next Scene' : 'Finish Game'}
          </Button>
        </CardFooter>
      </Card>
    );
};

export default VisualMovieGuessingGame;
