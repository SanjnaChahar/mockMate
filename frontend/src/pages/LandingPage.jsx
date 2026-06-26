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
    </div>
  )
}

export default LandingPage