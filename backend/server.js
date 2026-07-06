const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config()

// Create Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes (we'll add these soon)
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/sessions', require('./routes/sessionRoutes'))

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'MockMate API is running!' })
})

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected!')
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error)
  })