import { createContext, useEffect, useState } from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import Header from "../components/header"
import Modal from "../components/modal"
import Navigation from "../components/navigation"
import useAuth from "../hooks/useAuth"
import {
  getSelfStudent,
  getSelfTeacher,
  login,
  register,
  updateProfile,
} from "../service/apiClient"
import jwtDecode from "jwt-decode"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [token, setToken] = useState(null)
  const [logout, setLogout] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loggedInStudent, setLoggedInStudent] = useState(null)
  const [loggedInTeacher, setLoggedInTeacher] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")

    if (logout) {
      localStorage.removeItem("token")
      setToken(null)
      setLogout(false)
      setUserId(null)
      navigate("/login", { state: null })
      return
    }

    if (
      !storedToken &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      const redirectState = location.state || { from: location }

      navigate("/login", {
        state: redirectState,
      })
    }

    if (storedToken && !token) {
      setToken(storedToken)
    }

    if (storedToken && token && location.state) {
      navigate(location.state.from.pathname)
    }

    if (storedToken && !userId) {
      setUserId(jwtDecode(storedToken).userId)
    }

    if (storedToken && !userRole) {
      setUserRole(jwtDecode(storedToken).userRole)
    }

    const getAndSetStudentOrTeacher = (userRole) => {
      if (userRole.toUpperCase() === "STUDENT") {
        getSelfStudent().then(setLoggedInStudent)
        return
      }
      if (userRole.toUpperCase() === "TEACHER") {
        getSelfTeacher().then(setLoggedInTeacher)
        return
      }
    }

    if (userRole && userRole !== 'TBA') {
      getAndSetStudentOrTeacher(userRole)
    }
  }, [
    location.state?.from?.pathname,
    navigate,
    logout,
    location,
    token,
    userId,
    userRole,
  ])

  const handleLogin = async (email, password) => {
    const res = await login(email, password)

    if (!res.data.token) {
      throw new Error(res.data.error)
    }

    localStorage.setItem("token", res.data.token)

    setToken(res.token)
    const redirectPath = location.state?.from?.pathname || "/"
    navigate(redirectPath)
  }

  const handleLogout = () => {
    setLogout(true)
    setToken(null)
    setUserId(null)
    setUserRole(null)
    setLoggedInStudent(null)
    setLoggedInTeacher(null)
  }

  const checkPassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(
      password
    )

    return password.length >= 8 && hasUppercase && hasNumber && hasSpecialChar
  }

  const handleRegister = async (email, password) => {
    if (checkPassword(password)) {
      const res = await register(email, password)

      setToken(res.data.token)

      navigate("/verification")
    } else {
      return false
    }
  }

  const handleCreateProfile = async (
    firstName,
    lastName,
    githubUsername,
    biography,
    email,
    mobile,
    password,
    role,
    specialism,
    cohort,
    startDate,
    endDate,
    imageUrl
  ) => {
    const { userId } = jwtDecode(token)

    await updateProfile(
      userId,
      firstName,
      lastName,
      githubUsername,
      biography,
      email,
      mobile,
      password,
      role,
      specialism,
      cohort,
      startDate,
      endDate,
      imageUrl
    )

    localStorage.setItem("token", token)
    navigate("/")
  }

  const value = {
    token,
    userId,
    loggedInStudent,
    loggedInTeacher,
    userRole,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onCreateProfile: handleCreateProfile,
    checkPassword: checkPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  const location = useLocation()

  if (!token) {
    return <Navigate to={"/login"} replace state={{ from: location }} />
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Modal />
      {children}
    </div>
  )
}

export { AuthContext, AuthProvider, ProtectedRoute }
