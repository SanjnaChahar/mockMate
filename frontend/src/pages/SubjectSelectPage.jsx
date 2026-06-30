import { useNavigate } from 'react-router-dom'

const subjects = [
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    shortName: 'DSA',
    icon: '🌳',
    description: 'Arrays, Trees, Graphs, DP, Sorting',
    questions: 80,
    color: 'hover:border-green-500',
    iconBg: 'bg-green-900',
  },
  {
    id: 'os',
    name: 'Operating Systems',
    shortName: 'OS',
    icon: '💻',
    description: 'Processes, Threads, Deadlock, Memory',
    questions: 60,
    color: 'hover:border-blue-500',
    iconBg: 'bg-blue-900',
  },
  {
    id: 'dbms',
    name: 'Database Management',
    shortName: 'DBMS',
    icon: '🗄️',
    description: 'ACID, Normalization, Transactions',
    questions: 55,
    color: 'hover:border-yellow-500',
    iconBg: 'bg-yellow-900',
  },
  {
    id: 'cn',
    name: 'Computer Networks',
    shortName: 'CN',
    icon: '🌐',
    description: 'OSI Model, TCP/IP, HTTP, DNS',
    questions: 50,
    color: 'hover:border-purple-500',
    iconBg: 'bg-purple-900',
  },
  {
    id: 'oop',
    name: 'OOP / Java / C++',
    shortName: 'OOP',
    icon: '🎯',
    description: 'Classes, Inheritance, Polymorphism',
    questions: 65,
    color: 'hover:border-red-500',
    iconBg: 'bg-red-900',
  },
  {
    id: 'sql',
    name: 'SQL & Databases',
    shortName: 'SQL',
    icon: '📊',
    description: 'Joins, Queries, Aggregations, Views',
    questions: 45,
    color: 'hover:border-orange-500',
    iconBg: 'bg-orange-900',
  },
  {
    id: 'system-design',
    name: 'System Design',
    shortName: 'System Design',
    icon: '⚙️',
    description: 'Scalability, Caching, Load Balancing',
    questions: 40,
    color: 'hover:border-pink-500',
    iconBg: 'bg-pink-900',
  },
  {
    id: 'webdev',
    name: 'Web Development',
    shortName: 'Web Dev',
    icon: '🌍',
    description: 'HTML, CSS, JS, React, APIs',
    questions: 70,
    color: 'hover:border-cyan-500',
    iconBg: 'bg-cyan-900',
  },
]

function SubjectSelectPage() {
  const navigate = useNavigate()

  function handleSubjectClick(subjectId) {
    navigate(`/interview/topic/${subjectId}`)
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-white mb-4 flex items-center gap-2 transition"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold mb-2">
            Choose a
            <span className="text-purple-400"> Subject</span>
          </h1>
          <p className="text-gray-400">
            Select a CS subject to practice topic wise interview questions
          </p>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => handleSubjectClick(subject.id)}
              className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${subject.color} cursor-pointer transition hover:scale-105`}
            >
              {/* Icon */}
              <div className={`${subject.iconBg} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {subject.icon}
              </div>

              {/* Name */}
              <h3 className="font-bold text-lg mb-1">{subject.shortName}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                {subject.description}
              </p>

              {/* Questions count */}
              <p className="text-purple-400 text-sm font-medium">
                {subject.questions}+ questions
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default SubjectSelectPage