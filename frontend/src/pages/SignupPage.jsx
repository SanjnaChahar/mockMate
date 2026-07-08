import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      setError('')
      await signup(name, email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center py-10">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md border border-gray-700">

        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-purple-400">
            Mock<span className="text-white">Mate</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-400">
            Start practicing interviews for free today
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

          {/* Full Name */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

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
              placeholder="Create a strong password"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat your password"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition mt-2"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </div>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
            Login here
          </Link>
        </p>

      </div>
    </div>
  )
}

export default SignupPage