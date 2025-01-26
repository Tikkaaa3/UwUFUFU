// TournamentPage.tsx
import { useState, useEffect } from "react";

function TournamentPage() {
  const [round, setRound] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [currentMatches, setCurrentMatches] = useState([]);
  const [leftCharacter, setLeftCharacter] = useState(null);
  const [rightCharacter, setRightCharacter] = useState(null);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  // Fetch characters from the backend
  useEffect(() => {
    async function fetchCharacters() {
      const response = await fetch("/api/characters/");
      const data = await response.json();
      setCharacters(data);
      initializeMatches(data);
    }
    fetchCharacters();
  }, []);

  // Initialize matches for a round
  const initializeMatches = (data) => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    const matches = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      matches.push([shuffled[i], shuffled[i + 1]]);
    }
    setCurrentMatches(matches);
    setLeftCharacter(matches[0][0]);
    setRightCharacter(matches[0][1]);
  };

  // Handle character selection
  const handleCharacterClick = (side) => {
    const selectedCharacter = side === "left" ? leftCharacter : rightCharacter;

    // Save the winner for the current match
    const updatedMatches = [...currentMatches];
    updatedMatches[currentMatchIndex][2] = selectedCharacter; // Store winner in the third position of the current match

    const nextMatchIndex = currentMatchIndex + 1;

    // Move to the next match
    if (nextMatchIndex < updatedMatches.length) {
      setLeftCharacter(updatedMatches[nextMatchIndex][0]);
      setRightCharacter(updatedMatches[nextMatchIndex][1]);
      setCurrentMatchIndex(nextMatchIndex);
    } else {
      // Prepare for the next round
      const nextRoundCharacters = updatedMatches.map((match) => match[2]); // Collect all winners
      if (nextRoundCharacters.length === 1) {
        alert(`The winner is ${nextRoundCharacters[0].name}`);
        // Restart tournament
        setRound(1);
        setCurrentMatchIndex(0);
        setCurrentMatches([]);
        fetchCharacters();
        return;
      }

      setRound(round + 1);
      initializeMatches(nextRoundCharacters); // Start the next round
      setCurrentMatchIndex(0);
    }
  };

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
        {/* Left Character */}
        <div
          className="text-center border-4 border-red-500 rounded-md overflow-hidden cursor-pointer"
          onClick={() => handleCharacterClick("left")}
        >
          <img
            src={leftCharacter?.img}
            alt={leftCharacter?.name}
            className="w-[20rem] h-72 object-cover"
          />
          <p className="mt-4 font-bold">{leftCharacter?.name}</p>
        </div>
        {/* VS */}
        <div className="text-4xl font-bold text-gray-500">VS</div>
        {/* Right Character */}
        <div
          className="text-center border-4 border-blue-500 rounded-md overflow-hidden cursor-pointer"
          onClick={() => handleCharacterClick("right")}
        >
          <img
            src={rightCharacter?.img}
            alt={rightCharacter?.name}
            className="w-[20rem] h-72 object-cover"
          />
          <p className="mt-4 font-bold">{rightCharacter?.name}</p>
        </div>
      </div>
    </div>
  );
}

export default TournamentPage;
