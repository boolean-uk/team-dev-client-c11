import "./App.css"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Login from "./pages/login"
import Register from "./pages/register"
import Loading from "./pages/loading"
import Verification from "./pages/verification"
import { AuthProvider, ProtectedRoute } from "./context/auth"
import { ModalProvider } from "./context/modal"
import Welcome from "./pages/welcome"
import MyCohort from "./pages/myCohort"
import Cohorts from "./pages/cohorts"
import UserSearchResult from "./pages/UserSearchResult"
import UserProfile from "./pages/userProfile"


const App = () => {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="loading" element={<Loading />} />
            <Route path="verification" element={<Verification />} />

            <Route
              path="profile/:id"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="my-cohort"
              element={
                <ProtectedRoute>
                  <MyCohort />
                </ProtectedRoute>
              }
            />
            <Route
              path="cohorts"
              element={
                <ProtectedRoute>
                  <Cohorts />
                </ProtectedRoute>
              }
            />

            <Route
              path="results"
              element={
                <ProtectedRoute>
                  <UserSearchResult />
                </ProtectedRoute>
              }
            />
            <Route
              path="welcome"
              element={
                <ProtectedRoute disabledNav={true}>
                  <Welcome />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </>
  )
}

export default App
