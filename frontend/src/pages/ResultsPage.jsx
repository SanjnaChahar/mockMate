import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

function ResultsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const score = location.state?.score || 70
  const subject = location.state?.subject || 'General'
  const totalQuestions = location.state?.totalQuestions || 5
  const mode = location.state?.mode || 'topic'

  const [saved, setSaved] = useState(false)

  function getPerformance(score) {
    if (score >= 80) return { label: 'Excellent! 🌟', color: 'text-green-400' }
    if (score >= 60) return { label: 'Good Job! 👍', color: 'text-blue-400' }
    if (score >= 40) return { label: 'Keep Practicing! 💪', color: 'text-yellow-400' }
    return { label: 'Needs Improvement 📚', color: 'text-red-400' }
  }

  const performance = getPerformance(score)

  // Save session to database
  useEffect(() => {
    async function saveSession() {
      if (!user || saved) return

      try {
        const response = await fetch('http://localhost:5000/api/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            mode,
            subject,
            totalQuestions,
            averageScore: score,
          }),
        })

        if (response.ok) {
          setSaved(true)
          console.log('Session saved!')
        }
      } catch (error) {
        console.error('Error saving session:', error)
      }
    }

    saveSession()
  }, [])

  return (
    <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center px-6 py-10">
      <div className="max-w-lg w-full">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-2">Interview Complete!</h1>
          <p className="text-gray-400">
            Here's how you performed in your {subject} interview
          </p>
          {saved && (
            <p className="text-green-400 text-sm mt-2">
              ✅ Session saved to your profile!
            </p>
          )}
        </div>

        {/* Score Circle */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-6 text-center">
          <div className="relative w-36 h-36 mx-auto mb-6">
            <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#9333ea"
                strokeWidth="2"
                strokeDasharray={`${score}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-purple-400">{score}%</span>
              <span className="text-gray-400 text-xs">Overall</span>
            </div>
          </div>

          <p className={`text-2xl font-bold mb-2 ${performance.color}`}>
            {performance.label}
          </p>
          <p className="text-gray-400 text-sm">
            You answered {totalQuestions} questions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
            <p className="text-2xl font-bold text-purple-400">{totalQuestions}</p>
            <p className="text-gray-400 text-xs mt-1">Questions</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
            <p className="text-2xl font-bold text-purple-400">{score}%</p>
            <p className="text-gray-400 text-xs mt-1">Score</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
            <p className={`text-2xl font-bold ${performance.color}`}>
              {score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D'}
            </p>
            <p className="text-gray-400 text-xs mt-1">Grade</p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <h3 className="font-bold mb-3 text-purple-400">💡 Next Steps</h3>
          {score >= 80 ? (
            <p className="text-gray-300 text-sm leading-relaxed">
              Excellent performance! You have a strong grasp of {subject}.
              Try other subjects to broaden your preparation.
            </p>
          ) : score >= 60 ? (
            <p className="text-gray-300 text-sm leading-relaxed">
              Good job! Focus on the questions you struggled with and
              practice explaining concepts with real examples.
            </p>
          ) : (
            <p className="text-gray-300 text-sm leading-relaxed">
              Keep practicing! Review core concepts of {subject} from
              your notes, then come back and try again.
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/subject-select')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Practice Again 🔄
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition border border-gray-600"
          >
            Back to Dashboard 🏠
          </button>
        </div>

      </div>
    </div>
  )
}

export default ResultsPage