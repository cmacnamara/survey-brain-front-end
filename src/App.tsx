// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Surveys from './pages/Surveys/Surveys'
import CreateSurvey from './pages/CreateSurvey/CreateSurvey'
import TakeSurvey from './pages/TakeSurvey/TakeSurvey'
import EditSurvey from './pages/EditSurvey/EditSurvey'
import SurveyResults from './pages/SurveyResults/SurveyResults'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as surveyService from './services/surveyService'

// styles
import './App.css'

// types
import { User, Survey } from './types/models'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [surveys, setSurveys] = useState<Survey[]>([])
  const navigate = useNavigate()

  useEffect((): void => {
    const fetchSurveys = async (): Promise<void> => {
      try {
        const surveyData: Survey[] = await surveyService.getAllSurveys()
        setSurveys(surveyData)
      } catch (error) {
        console.log(error);
      }
    }
    user ? fetchSurveys() : setSurveys([])
  }, [user])
  
  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/surveys"
          element={
            <ProtectedRoute user={user}>
              <Surveys 
                surveys={surveys}
                setSurveys={setSurveys}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/surveys/create"
          element={
            <ProtectedRoute user={user}>
              <CreateSurvey
                surveys={surveys} 
                setSurveys={setSurveys}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/surveys/:surveyId/edit"
          element={
            <ProtectedRoute user={user}>
              <EditSurvey
                surveys={surveys}
                setSurveys={setSurveys} 
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/surveys/:surveyId/results"
          element={
            <ProtectedRoute user={user}>
              <SurveyResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/surveys/:surveyId"
          element={<TakeSurvey />}
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
