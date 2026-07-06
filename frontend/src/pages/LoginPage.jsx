import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      setError('')
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md border border-gray-700">

        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-purple-400">
            Mock<span className="text-white">Mate</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">
            Login to continue your interview practice
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition mt-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
            Sign up free
          </Link>
        </p>

      </div>
    </div>
  )
}

export default LoginPage