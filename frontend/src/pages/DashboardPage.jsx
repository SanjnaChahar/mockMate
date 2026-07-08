import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch real sessions from backend
  useEffect(() => {
    async function fetchSessions() {
      if (!user) return

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sessions`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        })

        const data = await response.json()
        setSessions(data)
      } catch (error) {
        console.error('Error fetching sessions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [user])

  // Calculate stats from real sessions
  const totalSessions = sessions.length
  const averageScore = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + s.averageScore, 0) / sessions.length)
    : 0
  const subjectsCovered = [...new Set(sessions.map(s => s.subject))].length

  function getScoreColor(score) {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  function timeAgo(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Yesterday'
    return `${diff} days ago`
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-1">
            Welcome back, <span className="text-purple-400">{user?.name}!</span> 👋
          </h1>
          <p className="text-gray-400">
            Ready for your next interview practice session?
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Total Sessions</p>
            <p className="text-4xl font-bold text-purple-400">{totalSessions}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Average Score</p>
            <p className="text-4xl font-bold text-purple-400">
              {averageScore > 0 ? `${averageScore}%` : 'N/A'}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Subjects Covered</p>
            <p className="text-4xl font-bold text-purple-400">{subjectsCovered}</p>
          </div>
        </div>

        {/* Start New Interview */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-10">
          <h2 className="text-xl font-bold mb-2">Start New Interview</h2>
          <p className="text-gray-400 mb-6">
            Choose your interview mode to begin practicing
          </p>
          <div className="flex gap-4">
            <Link
              to="/role-select"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-6 text-center transition"
            >
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold mb-2">Role Based</h3>
              <p className="text-purple-200 text-sm">SDE, Frontend, Backend</p>
            </Link>
            <Link
              to="/subject-select"
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-6 text-center border border-gray-600 hover:border-purple-500 transition"
            >
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-lg font-bold mb-2">Topic Wise</h3>
              <p className="text-gray-400 text-sm">DSA, OS, DBMS, CN and more</p>
            </Link>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h2 className="text-xl font-bold mb-6">Recent Sessions</h2>

          {loading ? (
            <p className="text-gray-400">Loading sessions...</p>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-2">No sessions yet!</p>
              <p className="text-gray-500 text-sm">
                Complete your first interview to see it here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {sessions.map((session) => (
                <div
                  key={session._id}
                  className="flex items-center justify-between bg-gray-900 rounded-lg px-6 py-4 border border-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {session.mode === 'role' ? '🎯' : '📚'}
                    </div>
                    <div>
                      <p className="font-semibold">{session.subject}</p>
                      <p className="text-gray-400 text-sm">
                        {session.mode === 'role' ? 'Role Based' : 'Topic Wise'} • {session.totalQuestions} Questions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${getScoreColor(session.averageScore)}`}>
                      {session.averageScore}%
                    </p>
                    <p className="text-gray-400 text-sm">
                      {timeAgo(session.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default DashboardPage