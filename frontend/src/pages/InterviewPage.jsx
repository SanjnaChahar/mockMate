import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
})

const subjectNames = {
  dsa: 'Data Structures & Algorithms',
  os: 'Operating Systems',
  dbms: 'Database Management Systems',
  cn: 'Computer Networks',
  oop: 'Object Oriented Programming',
  sql: 'SQL & Databases',
  'system-design': 'System Design',
  webdev: 'Web Development',
}

const companyContext = {
  dsa: 'Amazon, Google, Microsoft, Flipkart',
  os: 'Microsoft, Adobe, Atlassian, Oracle',
  dbms: 'Oracle, IBM, TCS, Infosys, Wipro',
  cn: 'Cisco, Infosys, Wipro, Goldman Sachs',
  oop: 'Amazon, Microsoft, Accenture, TCS',
  sql: 'TCS, Infosys, Wipro, Capgemini',
  'system-design': 'Google, Amazon, Flipkart, Uber',
  webdev: 'Razorpay, Swiggy, Zomato, startups',
}

function InterviewPage() {
  const { subjectId } = useParams()
  const navigate = useNavigate()

  const subjectName = subjectNames[subjectId] || 'Computer Science'
  const companies = companyContext[subjectId] || 'top tech companies'

  // Mode selection state
  const [mode, setMode] = useState(null) // null = not chosen yet, 'voice' or 'text'

  // Chat states
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const [sessionEnded, setSessionEnded] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [scoreCount, setScoreCount] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState('')

  const totalQuestions = 5
  const chatEndRef = useRef(null)
  const recognitionRef = useRef(null)

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Start interview only after mode is selected
  useEffect(() => {
    if (mode !== null) {
      startInterview()
    }
  }, [mode])

  // Speak text — only in voice mode
  function speakText(text) {
    if (mode !== 'voice') return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.lang = 'en-US'
    window.speechSynthesis.speak(utterance)
  }

  // Add message to chat
  function addMessage(role, content, score = null) {
    setMessages(prev => [...prev, {
      role, content, score, id: Date.now() + Math.random()
    }])
  }

  // Start interview
  async function startInterview() {
    const greeting = `Hello! 👋 I'm your AI interviewer for today's ${subjectName} session. I'll ask you ${totalQuestions} questions commonly asked at ${companies}. Take your time and answer clearly. Let's begin!`
    addMessage('ai', greeting)
    if (mode === 'voice') speakText(greeting)
    await generateQuestion([], 1)
  }

  // Generate question from Groq
  async function generateQuestion(history, qNumber) {
    setIsLoading(true)
    try {
      const historyText = history
.filter(h => h.role === "ai")
.map(h => h.content)
.join("\n")

      const prompt = `You are a friendly technical interviewer conducting a campus placement interview for a final year Computer Science student in India.

Subject: ${subjectName}
Companies hiring: ${companies}
Question number: ${qNumber} of ${totalQuestions}

Previous conversation:
${historyText}

Generate ONE interview question following these strict rules:
- Difficulty: EASY to MEDIUM only (not advanced or research level)
- Type: Conceptual or definitional questions (not complex implementation)
- Style: Like "What is...", "Explain...", "What is the difference between...", "Give an example of..."
- Target: A student who has studied ${subjectName} in their B.Tech syllabus
- Length: One clear, simple sentence
- No numbering, no preamble — just the question directly

Examples of GOOD questions:
- What is the difference between a stack and a queue?
- Explain what deadlock is with an example.
- What is normalization in DBMS?
- What is the difference between TCP and UDP?

Examples of BAD questions (too hard — avoid these):
- Design a distributed system that handles...
- Implement a lock-free concurrent data structure...
- How would you optimize a B+ tree for...`

      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        max_tokens: 150,
      })

      const question = response.choices[0].message.content
      .replace(/^Question[:\-]*/i, "")
      .trim()

      setCurrentQuestion(question)

      addMessage('ai', question)
      speakText(question)
      setQuestionCount(qNumber)

    } catch (error) {
      console.error('Groq error:', error)
      addMessage('ai', `Let's continue with ${subjectName}. Can you explain one of the core concepts you've studied in this subject?`)
      setQuestionCount(qNumber)
    } finally {
      setIsLoading(false)
    }
  }

  // Evaluate answer
  async function evaluateAnswer(answer, currentMessages) {
    setIsLoading(true)
    try {
      const lastQuestion = [...currentMessages]
        .reverse()
        .find(m => m.role === 'ai')?.content || ''


      const prompt = `You are evaluating a campus placement interview answer for a final year CS student in India.

Subject: ${subjectName}
Question asked: ${lastQuestion}
Student's answer: ${answer}

Respond in EXACTLY this format:
SCORE: [number 1-10]/10
FEEDBACK: [3-4 sentences. Mention specifically what was correct in their answer, what important points were missing, and one tip to improve. Be encouraging but honest like a real interviewer.]

STRICT RULES:
- Do NOT include any new question in your response
- Do NOT write "NEXT QUESTION" anywhere
- Only provide SCORE and FEEDBACK nothing else`

      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 200,
      })

      const result = response.choices[0].message.content.trim()
      const scoreMatch = result.match(/(\d+)\/10/i)
      const feedbackMatch = result.match(/FEEDBACK[:\s]*([\s\S]*)/i)

      const score = scoreMatch ? parseInt(scoreMatch[1]) : 6
      const feedbackText = feedbackMatch
        ? feedbackMatch[1].trim()
        : 'Good attempt! Keep practicing this topic.'

      addMessage('ai', feedbackText, score)
      speakText(feedbackText)

      setTotalScore(prev => prev + score)
      setScoreCount(prev => prev + 1)

      return score

    } catch (error) {
      console.error('Evaluation error:', error)
      addMessage('ai', 'Good attempt! Keep practicing this topic.', 6)
      setTotalScore(prev => prev + 6)
      setScoreCount(prev => prev + 1)
      return 6
    } finally {
      setIsLoading(false)
    }
  }

  // Handle send
  async function handleSend() {
    if (userInput.trim() === '' || isLoading || sessionEnded) return

    const answer = userInput.trim()
    setUserInput('')
    stopListening()

    addMessage('user', answer)
    const updatedMessages = [...messages, { role: 'user', content: answer }]

    await evaluateAnswer(answer, updatedMessages)

    if (questionCount >= totalQuestions) {
      const avg = Math.round(totalScore / Math.max(scoreCount, 1))
      setTimeout(() => {
        addMessage('ai', `🎉 Interview complete! You answered all ${totalQuestions} questions. Great effort! Redirecting to your results...`)
        setSessionEnded(true)
        setTimeout(() => navigate('/results'), 3000)
      }, 1000)
    } else {
      setTimeout(async () => {
        await generateQuestion(
          [...updatedMessages],
          questionCount + 1
        )
      }, 1500)
    }
  }

  // Enter to send
  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Voice input
  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Please use Google Chrome for voice input.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart = () => setIsListening(true)

    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setUserInput(transcript)
    }

    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }

  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  // ============================================
  // MODE SELECTION SCREEN
  // ============================================
  if (mode === null) {
    return (
      <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center px-6">
        <div className="bg-gray-800 rounded-2xl p-10 max-w-md w-full border border-gray-700 text-center">

          {/* Icon */}
          <div className="text-5xl mb-4">🎯</div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">
            {subjectName} Interview
          </h1>
          <p className="text-gray-400 mb-8">
            How would you like to answer questions?
          </p>

          {/* Mode Options */}
          <div className="flex flex-col gap-4">

            {/* Voice Mode */}
            <button
              onClick={() => setMode('voice')}
              className="bg-gray-700 hover:bg-purple-700 border border-gray-600 hover:border-purple-500 rounded-xl p-5 text-left transition group"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">🎤</div>
                <div>
                  <p className="font-bold text-lg group-hover:text-white">
                    Voice Mode
                  </p>
                  <p className="text-gray-400 text-sm group-hover:text-purple-200">
                    AI speaks questions • You answer with mic
                  </p>
                </div>
              </div>
            </button>

            {/* Text Mode */}
            <button
              onClick={() => setMode('text')}
              className="bg-gray-700 hover:bg-purple-700 border border-gray-600 hover:border-purple-500 rounded-xl p-5 text-left transition group"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">⌨️</div>
                <div>
                  <p className="font-bold text-lg group-hover:text-white">
                    Text Mode
                  </p>
                  <p className="text-gray-400 text-sm group-hover:text-purple-200">
                    Read questions • Type your answers
                  </p>
                </div>
              </div>
            </button>

          </div>

          {/* Info */}
          <p className="text-gray-500 text-xs mt-6">
            {totalQuestions} questions • {companies}
          </p>

        </div>
      </div>
    )
  }

  // ============================================
  // CHAT INTERVIEW SCREEN
  // ============================================
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col">

      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
                🤖
              </div>
              <div>
                <p className="font-bold">AI Interviewer</p>
                <p className="text-gray-400 text-xs">
                  {subjectName} •
                  {mode === 'voice' ? ' 🎤 Voice Mode' : ' ⌨️ Text Mode'}
                </p>
              </div>
            </div>
            <span className="text-gray-400 text-sm bg-gray-700 px-3 py-1 rounded-full">
              {questionCount}/{totalQuestions} Questions
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(questionCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* AI Avatar */}
              {message.role === 'ai' && (
                <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 mt-1 flex-shrink-0">
                  🤖
                </div>
              )}

              <div className={`max-w-lg flex flex-col gap-1 ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Bubble */}
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed
                  ${message.role === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-sm'
                    : 'bg-gray-800 text-gray-100 border border-gray-700 rounded-tl-sm'
                  }`}
                >
                  {message.content}
                </div>

                {/* Score badge */}
                {message.score !== null && message.score !== undefined && (
                  <div className={`text-xs px-3 py-1 rounded-full font-bold
                    ${message.score >= 7
                      ? 'bg-green-900 text-green-300'
                      : message.score >= 5
                      ? 'bg-yellow-900 text-yellow-300'
                      : 'bg-red-900 text-red-300'}`}
                  >
                    Score: {message.score}/10
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {message.role === 'user' && (
                <div className="bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center text-sm ml-3 mt-1 flex-shrink-0">
                  🧑
                </div>
              )}
            </div>
          ))}

          {/* Loading dots */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">
                🤖
              </div>
              <div className="bg-gray-800 border border-gray-700 px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1 items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Box */}
      {!sessionEnded && (
        <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
          <div className="max-w-3xl mx-auto flex gap-3 items-end">

            {/* Mic Button — always visible but highlighted in voice mode */}
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-full transition flex-shrink-0
                ${isListening
                  ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                  : mode === 'voice'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-700 hover:bg-gray-600'}`}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              🎤
            </button>

            {/* Text Input */}
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              placeholder={
                isListening
                  ? '🔴 Listening... speak now'
                  : mode === 'voice'
                  ? 'Click 🎤 to speak or type here...'
                  : 'Type your answer here...'
              }
              className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:outline-none focus:border-purple-500 transition resize-none"
              rows={2}
            />

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={isLoading || userInput.trim() === ''}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed p-3 rounded-full transition flex-shrink-0"
            >
              ➤
            </button>

          </div>
          <p className="text-gray-500 text-xs text-center mt-2">
            Press Enter to send • {mode === 'voice' ? 'Click 🎤 to speak' : 'Type your answer above'}
          </p>
        </div>
      )}

    </div>
  )
}

export default InterviewPage