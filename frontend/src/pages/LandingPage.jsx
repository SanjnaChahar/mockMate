function LandingPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">

      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center text-center px-6 py-24">

        {/* Badge */}
        <div className="inline-block bg-purple-900 text-purple-300 text-sm font-medium px-4 py-1 rounded-full mb-6">
          🚀 AI Powered Mock Interviews
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl font-bold leading-tight mb-6 max-w-3xl">
          Ace Your Next
          <span className="text-purple-400"> Technical Interview </span>
          with AI
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-xl max-w-2xl mb-10">
          Practice role-based and topic-wise interviews, get instant AI feedback,
          track your improvement and land your dream job.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mb-16">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition">
            Start Practicing Free
          </button>
          <button className="border border-gray-600 hover:border-purple-400 text-gray-300 hover:text-purple-400 px-8 py-3 rounded-lg text-lg transition">
            See How It Works
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-12 text-center justify-center">
          <div>
            <div className="text-3xl font-bold text-purple-400">500+</div>
            <div className="text-gray-400 text-sm mt-1">Interview Questions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">8</div>
            <div className="text-gray-400 text-sm mt-1">CS Subjects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">AI</div>
            <div className="text-gray-400 text-sm mt-1">Powered Feedback</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">Free</div>
            <div className="text-gray-400 text-sm mt-1">To Get Started</div>
          </div>
        </div>

      </div>

      {/* Features Section */}
      <div className="px-6 py-20 bg-gray-800">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need to
            <span className="text-purple-400"> Crack Interviews</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            MockMate gives you the complete interview preparation toolkit
          </p>
        </div>

        {/* 3 Cards */}
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">

          {/* Card 1 */}
          <div className="bg-gray-900 rounded-xl p-8 flex-1 border border-gray-700 hover:border-purple-500 transition">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Role Based Interviews</h3>
            <p className="text-gray-400 leading-relaxed">
              Practice interviews specifically designed for SDE, Frontend Developer,
              and Backend Developer roles. Questions tailored to what companies actually ask.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-900 rounded-xl p-8 flex-1 border border-gray-700 hover:border-purple-500 transition">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-3">Topic Wise Practice</h3>
            <p className="text-gray-400 leading-relaxed">
              Master DSA, Operating Systems, DBMS, Computer Networks, OOP,
              SQL, System Design and Web Development — one topic at a time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900 rounded-xl p-8 flex-1 border border-gray-700 hover:border-purple-500 transition">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-3">AI Feedback & Scoring</h3>
            <p className="text-gray-400 leading-relaxed">
              Get instant detailed feedback on every answer. AI scores your response,
              identifies gaps and suggests improvements to help you grow faster.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default LandingPage