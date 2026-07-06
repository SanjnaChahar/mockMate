const Session = require('../models/Session')

// @desc    Create new session
// @route   POST /api/sessions
const createSession = async (req, res) => {
  try {
    const { mode, subject, totalQuestions, averageScore } = req.body

    const session = await Session.create({
      userId: req.user._id,
      mode,
      subject,
      totalQuestions,
      averageScore,
      completed: true,
    })

    res.status(201).json(session)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all sessions for logged in user
// @route   GET /api/sessions
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)

    res.json(sessions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createSession, getSessions }