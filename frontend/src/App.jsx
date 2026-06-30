import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/signupPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'

function App(){
  return(
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} /> 
    </Routes>
    </div>
    
  )
}

export default App