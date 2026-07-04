import { useNavigate } from 'react-router-dom'

const roles = [
  {
    id: 'sde',
    name: 'SDE',
    fullName: 'Software Development Engineer',
    icon: '👨‍💻',
    description: 'DSA, System Design, Problem Solving',
    companies: 'Amazon, Google, Microsoft, Flipkart',
    color: 'hover:border-blue-500',
  },
  {
    id: 'frontend',
    name: 'Frontend Developer',
    fullName: 'Frontend Developer',
    icon: '🎨',
    description: 'HTML, CSS, JavaScript, React, DOM',
    companies: 'Razorpay, Swiggy, Zomato, startups',
    color: 'hover:border-purple-500',
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    fullName: 'Backend Developer',
    icon: '⚙️',
    description: 'Node.js, APIs, Databases, System Design',
    companies: 'Uber, PayTM, PhonePe, Atlassian',
    color: 'hover:border-green-500',
  },
]

function RoleSelectPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-gray-900 min-h-screen text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-white mb-4 flex items-center gap-2 transition"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold mb-2">
            Choose Your
            <span className="text-purple-400"> Role</span>
          </h1>
          <p className="text-gray-400">
            Select the role you are preparing for
          </p>
        </div>

        {/* Role Cards */}
        <div className="flex flex-col md:flex-row gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => navigate(`/interview/topic/${role.id}`)}
              className={`bg-gray-800 rounded-xl p-8 flex-1 border border-gray-700 ${role.color} cursor-pointer transition hover:scale-105`}
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{role.icon}</div>

              {/* Name */}
              <h3 className="text-xl font-bold mb-2">{role.name}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {role.description}
              </p>

              {/* Companies */}
              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-500 text-xs mb-1">Asked at:</p>
                <p className="text-purple-400 text-sm">{role.companies}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default RoleSelectPage