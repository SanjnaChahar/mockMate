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

    {/* How It Works Section */}
      <div className="px-6 py-20 bg-gray-900">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-4">
            How
            <span className="text-purple-400"> MockMate </span>
            Works
          </h2>
          <p className="text-gray-400 text-lg">
            Start practicing in 3 simple steps
          </p>
        </div>

        {/* 3 Steps */}
        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-purple-600 text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="text-xl font-bold mb-3">Choose Your Mode</h3>
            <p className="text-gray-400 leading-relaxed">
              Select role-based interview for job preparation or
              topic-wise practice to master specific CS subjects.
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center text-purple-400 text-3xl">
            →
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-purple-600 text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="text-xl font-bold mb-3">Answer Questions</h3>
            <p className="text-gray-400 leading-relaxed">
              AI asks you interview questions one by one.
              Type your answers just like a real interview setting.
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center text-purple-400 text-3xl">
            →
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="bg-purple-600 text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="text-xl font-bold mb-3">Get AI Feedback</h3>
            <p className="text-gray-400 leading-relaxed">
              Receive instant detailed feedback, score and
              improvement tips for every answer you give.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Logo */}
          <div className="text-2xl font-bold">
            Mock<span className="text-purple-400">Mate</span>
          </div>

          {/* Tagline */}
          <p className="text-gray-400 text-sm text-center">
            AI powered mock interviews for CS students
          </p>

          {/* Links */}
          <div className="flex gap-6 text-gray-400 text-sm">
            <span className="hover:text-purple-400 cursor-pointer transition">About</span>
            <span className="hover:text-purple-400 cursor-pointer transition">GitHub</span>
            <span className="hover:text-purple-400 cursor-pointer transition">Contact</span>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-gray-600 text-sm mt-6">
          © 2025 MockMate. Built for CS students by CS students.
        </div>
      </div>

    </div>
  )
}

export default LandingPage