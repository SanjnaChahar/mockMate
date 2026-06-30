import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import SubjectSelectPage from './pages/SubjectSelectPage'
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
      </Routes>
    </div>
  )
}

export default App