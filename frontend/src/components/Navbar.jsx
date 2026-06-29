import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-purple-400">
        Mock<span className="text-white">Mate</span>
      </Link>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="text-gray-300 hover:text-white transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
        >
          Get Started
        </Link>
      </div>

    </nav>
  )
}

export default Navbar