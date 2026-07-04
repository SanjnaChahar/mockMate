import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import SubjectSelectPage from './pages/SubjectSelectPage'
import InterviewPage from './pages/InterviewPage'
import ResultsPage from './pages/ResultsPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/subject-select" element={<SubjectSelectPage />} />
        <Route path="/interview/topic/:subjectId" element={<InterviewPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  )
}

export default App