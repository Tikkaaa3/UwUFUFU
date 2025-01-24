import { useState } from "react";

function TournamentPage() {
  // State for the current round and character data
  const [round, setRound] = useState(1);
  const [characters, setCharacters] = useState([
    { id: 1, name: "Naruto", img: "https://via.placeholder.com/200x300", color: "red" },
    { id: 2, name: "Sasuke", img: "https://via.placeholder.com/200x300", color: "blue" },
  ]);

  // Function to handle image click and move to the next round
  const handleCharacterClick = (selectedCharacterId: number) => {
    // Simulate new characters for the next round
    const nextCharacters = [
      { id: 3, name: "New Character 1", img: "https://via.placeholder.com/200x300", color: "red" },
      { id: 4, name: "New Character 2", img: "https://via.placeholder.com/200x300", color: "blue" },
    ];

    // Update the round and characters
    setRound(round + 1);
    setCharacters(nextCharacters);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* Title and Round Info */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">The Best Character</h1>
        <p className="text-sm text-gray-400">
          Rounds of 64 <span className="text-blue-400">{round}/32</span>
        </p>
      </div>

      {/* Characters and VS Section */}
      <div className="flex items-center justify-center space-x-8">
        {characters.map((character) => (
          <div key={character.id} className="text-center">
            <div
              className={`border-4 border-${character.color}-500 rounded-md overflow-hidden cursor-pointer`}
              onClick={() => handleCharacterClick(character.id)}
            >
              <img
                src={character.img}
                alt={character.name}
                className="w-48 h-72 object-cover"
              />
            </div>
            <p className="mt-4 font-bold">{character.name}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default TournamentPage;