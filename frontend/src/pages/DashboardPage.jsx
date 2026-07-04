import { Link } from 'react-router-dom'

function DashboardPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-1">
            Welcome back, <span className="text-purple-400">Mohit</span> 👋
          </h1>
          <p className="text-gray-400">
            Ready for your next interview practice session?
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mb-10">

          {/* Stat 1 */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Total Sessions</p>
            <p className="text-4xl font-bold text-purple-400">12</p>
          </div>

          {/* Stat 2 */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Average Score</p>
            <p className="text-4xl font-bold text-purple-400">74%</p>
          </div>

          {/* Stat 3 */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Subjects Covered</p>
            <p className="text-4xl font-bold text-purple-400">5</p>
          </div>

        </div>

        {/* Start New Interview */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-10">
          <h2 className="text-xl font-bold mb-2">Start New Interview</h2>
          <p className="text-gray-400 mb-6">
            Choose your interview mode to begin practicing
          </p>

          <div className="flex gap-4">

            {/* Role Based */}
            <Link
              to="/role-select"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-6 text-center transition"
            >
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold mb-2">Role Based</h3>
              <p className="text-purple-200 text-sm">
                SDE, Frontend, Backend Developer
              </p>
            </Link>

            {/* Topic Wise */}
            <Link
              to="/subject-select"
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-6 text-center border border-gray-600 hover:border-purple-500 transition"
            >
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-lg font-bold mb-2">Topic Wise</h3>
              <p className="text-gray-400 text-sm">
                DSA, OS, DBMS, CN and more
              </p>
            </Link>

          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h2 className="text-xl font-bold mb-6">Recent Sessions</h2>

          {/* Session List */}
          <div className="flex flex-col gap-4">

            {/* Session 1 */}
            <div className="flex items-center justify-between bg-gray-900 rounded-lg px-6 py-4 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="text-2xl">📚</div>
                <div>
                  <p className="font-semibold">Data Structures & Algorithms</p>
                  <p className="text-gray-400 text-sm">Topic Wise • 5 Questions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold text-lg">80%</p>
                <p className="text-gray-400 text-sm">2 days ago</p>
              </div>
            </div>

            {/* Session 2 */}
            <div className="flex items-center justify-between bg-gray-900 rounded-lg px-6 py-4 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="text-2xl">💻</div>
                <div>
                  <p className="font-semibold">Operating Systems</p>
                  <p className="text-gray-400 text-sm">Topic Wise • 5 Questions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 font-bold text-lg">65%</p>
                <p className="text-gray-400 text-sm">4 days ago</p>
              </div>
            </div>

            {/* Session 3 */}
            <div className="flex items-center justify-between bg-gray-900 rounded-lg px-6 py-4 border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="text-2xl">🎯</div>
                <div>
                  <p className="font-semibold">SDE Interview</p>
                  <p className="text-gray-400 text-sm">Role Based • 8 Questions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold text-lg">88%</p>
                <p className="text-gray-400 text-sm">1 week ago</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardPage