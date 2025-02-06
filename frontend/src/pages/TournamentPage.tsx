// TournamentPage.tsx
import { useState, useEffect } from "react";

function TournamentPage() {
  const [round, setRound] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [currentMatches, setCurrentMatches] = useState([]);
  const [leftCharacter, setLeftCharacter] = useState(null);
  const [rightCharacter, setRightCharacter] = useState(null);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [winner, setWinner] = useState(null);

  // Move fetchCharacters outside of useEffect for reuse
  const fetchCharacters = async () => {
    const response = await fetch("/api/characters/");
    const data = await response.json();
    setCharacters(data);
    initializeMatches(data);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const initializeMatches = (data) => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    const matches = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      if (shuffled[i + 1]) {
        matches.push([shuffled[i], shuffled[i + 1]]);
      } else {
        // If odd number of characters, auto-advance the last character
        matches.push([shuffled[i], shuffled[i], shuffled[i]]);
      }
    }
    setCurrentMatches(matches);
    setLeftCharacter(matches[0][0]);
    setRightCharacter(matches[0][1]);
    setCurrentMatchIndex(0);
  };

  const handleCharacterClick = (side) => {
    const selectedCharacter = side === "left" ? leftCharacter : rightCharacter;
    const updatedMatches = [...currentMatches];
    updatedMatches[currentMatchIndex][2] = selectedCharacter;

    const nextMatchIndex = currentMatchIndex + 1;

    if (nextMatchIndex < updatedMatches.length) {
      setLeftCharacter(updatedMatches[nextMatchIndex][0]);
      setRightCharacter(updatedMatches[nextMatchIndex][1]);
      setCurrentMatchIndex(nextMatchIndex);
    } else {
      const nextRoundCharacters = updatedMatches.map((match) => match[2]);
      if (nextRoundCharacters.length === 1) {
        setWinner(nextRoundCharacters[0]);
        return;
      }
      setRound(round + 1);
      initializeMatches(nextRoundCharacters);
      setCurrentMatchIndex(0);
    }
  };

  const handleReplay = () => {
    setWinner(null);
    setRound(1);
    setCurrentMatchIndex(0);
    setCurrentMatches([]);
    setCharacters([]);
    fetchCharacters();
  };

  if (winner) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">🏆 The Winner 🏆</h1>
        <div className="text-center border-4 border-yellow-500 rounded-md overflow-hidden p-4">
          <img
            src={`${winner.img}`}
            alt={winner.name}
            className="w-[20rem] h-72 object-cover"
          />
          <p className="mt-4 text-2xl font-bold">{winner.name}</p>
        </div>
        <button
          onClick={handleReplay}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Replay Tournament
        </button>
      </div>
    );
  }

  if (!leftCharacter || !rightCharacter) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">The Best Character</h1>
        <p className="text-sm text-gray-400">
          Round <span className="text-blue-400">{round}</span>
        </p>
      </div>
      <div className="flex items-center justify-center space-x-8">
        <div
          className="text-center border-4 border-red-500 rounded-md overflow-hidden cursor-pointer"
          onClick={() => handleCharacterClick("left")}
        >
          <img
            src={`${leftCharacter.img}`}
            alt={leftCharacter.name}
            className="w-[20rem] h-72 object-cover"
          />
          <p className="mt-4 font-bold">{leftCharacter.name}</p>
        </div>
        <div className="text-4xl font-bold text-gray-500">VS</div>
        <div
          className="text-center border-4 border-blue-500 rounded-md overflow-hidden cursor-pointer"
          onClick={() => handleCharacterClick("right")}
        >
          <img
            src={`${rightCharacter.img}`}
            alt={rightCharacter.name}
            className="w-[20rem] h-72 object-cover"
          />
          <p className="mt-4 font-bold">{rightCharacter.name}</p>
        </div>
      </div>
    </div>
  );
}

export default TournamentPage;
