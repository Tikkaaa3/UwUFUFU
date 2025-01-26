// TournamentPage.tsx
import { useState, useEffect } from "react";

function TournamentPage() {
  const [round, setRound] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [leftCharacter, setLeftCharacter] = useState(null);
  const [rightCharacter, setRightCharacter] = useState(null);

  // Fetch characters from backend
  useEffect(() => {
    async function fetchCharacters() {
      const response = await fetch("/api/characters/");
      const data = await response.json();
      setCharacters(data);
      initializeMatches(data);
    }
    fetchCharacters();
  }, []);

  // Initialize matches
  const initializeMatches = (data) => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    setLeftCharacter(shuffled[0]);
    setRightCharacter(shuffled[1]);
  };

  // Handle character click
  const handleCharacterClick = (side) => {
    const nextCharacters = characters.slice(2); // Remove current pair
    if (side === "left") {
      nextCharacters.push(leftCharacter);
    } else {
      nextCharacters.push(rightCharacter);
    }

    if (nextCharacters.length === 1) {
      alert(`The winner is ${nextCharacters[0].name}`);
      setRound(1);
      fetchCharacters(); // Restart tournament
      return;
    }

    setCharacters(nextCharacters);
    setLeftCharacter(nextCharacters[0]);
    setRightCharacter(nextCharacters[1]);
    setRound(round + 1);
  };

  if (!leftCharacter || !rightCharacter) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">The Best Character</h1>
        <p className="text-sm text-gray-400">
          Rounds of 64 <span className="text-blue-400">{round}</span>
        </p>
      </div>
      <div className="flex items-center justify-center space-x-8">
        {/* Left Character */}
        <div
          className="text-center border-4 border-red-500 rounded-md overflow-hidden cursor-pointer"
          onClick={() => handleCharacterClick("left")}
        >
          <img src={leftCharacter.img} alt={leftCharacter.name} className="w-[20rem] h-72 object-cover" />
          <p className="mt-4 font-bold">{leftCharacter.name}</p>
        </div>
        {/* VS */}
        <div className="text-4xl font-bold text-gray-500">VS</div>
        {/* Right Character */}
        <div
          className="text-center border-4 border-blue-500 rounded-md overflow-hidden cursor-pointer"
          onClick={() => handleCharacterClick("right")}
        >
          <img src={rightCharacter.img} alt={rightCharacter.name} className="w-[20rem] h-72 object-cover" />
          <p className="mt-4 font-bold">{rightCharacter.name}</p>
        </div>
      </div>
    </div>
  );
}

export default TournamentPage;