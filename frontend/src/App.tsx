//import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TournamentPage from './pages/TournamentPage'

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 w-full text-white p-4">
        <ul className="flex justify-center space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tournament">Tournament</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tournament" element={<TournamentPage />} />
      </Routes>
    </Router>
  )
}

export default App