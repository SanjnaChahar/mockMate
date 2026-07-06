import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-purple-400">
        Mock<span className="text-white">Mate</span>
      </Link>

      {/* Buttons */}
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-gray-300 text-sm">
              Hi, {user.name}! 👋
            </span>
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar