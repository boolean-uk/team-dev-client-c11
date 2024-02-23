import { useState, useEffect, useCallback, useContext } from "react"
import Button from "../../components/button"
import Card from "../../components/card"
import CreatePostModal from "../../components/createPostModal"
import Posts from "../../components/posts"
import useModal from "../../hooks/useModal"
import "./style.css"
import {
  getCohorts,
  getPosts,
  getTeachers,
  getStudents,
  getStudentsByCohortId,
} from "../../service/apiClient"
import UsersList from "../../components/usersList"
import SearchUserAside from "../../components/searchUserAside"
import CohortList from "../../components/cohortList"
import { useTranslation } from "react-i18next"
import TeacherList from "../../components/teacherList"
import StudentsList from "../../components/studentsList"
import { AuthContext } from "../../context/auth"
import LoggedInUser from "../../components/loggedInUser"

import useAuth from "../../hooks/useAuth"

const Dashboard = () => {
  const { t } = useTranslation()
  const cohortId = useContext(AuthContext).loggedInStudent?.cohortId
  const { userRole } = useAuth()

  const [posts, setPosts] = useState(null)
  const [myCohort, setMyCohort] = useState(null)
  const [cohorts, setCohorts] = useState(null)
  const [teachers, setTeachers] = useState(null)
  const [students, setStudents] = useState(null)

  const sortPosts = (fetchedPosts) => {
    const sortedPosts = fetchedPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    return sortedPosts
  }

  const getAllPosts = useCallback(() => {
    getPosts()
      .then(sortPosts)
      .then(setPosts)
      .catch((error) => {
        console.error("Error get all posts sorted:", error.message)
      })
  }, [])

  const getMyCohort = useCallback((cohortId) => {
    getStudentsByCohortId(cohortId)
      .then(setMyCohort)
      .catch((error) => {
        console.error("Error getting my cohort:", error)
      })
  }, [])

  const getAllCohorts = useCallback(() => {
    getCohorts().then(setCohorts)
  }, [])

  const getAllTeachers = useCallback(() => {
    getTeachers().then(setTeachers)
  }, [])

  const getAllStudents = useCallback(() => {
    getStudents().then(setStudents)
  }, [])

  useEffect(() => {
    if (userRole === "STUDENT" && cohortId) {
      getMyCohort(cohortId)
    }

    if (userRole === "TEACHER") {
      getAllCohorts()
      getAllTeachers()
      getAllStudents()
    }

    getAllPosts()
  }, [
    getAllPosts,
    getMyCohort,
    getAllCohorts,
    getAllTeachers,
    getAllStudents,
    cohortId,
    userRole,
  ])

  const { openModal, setModal } = useModal()

  const showModal = () => {
    setModal(
      `${t("createAPost")}`,
      <CreatePostModal getAllPosts={getAllPosts} />
    )

    openModal()
  }

  const showMyCohort = () => {
    return (
      <Card header={t("myCohort")}>
        <UsersList users={myCohort} />
      </Card>
    )
  }

  const showAllCohorts = () => {
    return (
      <Card header={t("Cohorts")}>
        <CohortList cohorts={cohorts} />
      </Card>
    )
  }

  const showAllStudents = () => {
    return (
      <Card header={t("Students")}>
        <StudentsList students={students} />
      </Card>
    )
  }

  const showAllTeachers = () => {
    return (
      <Card header={t("Teachers")}>
        <TeacherList teachers={teachers} />
      </Card>
    )
  }

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon">
             <LoggedInUser/>
            </div>
            <Button text={t("whatsOnYourMind")} onClick={showModal} />
          </div>
        </Card>

        {posts ? (
          <Posts posts={posts} getAllPosts={getAllPosts} />
        ) : (
          <p>Loading...</p>
        )}
      </main>
      <aside>
        <SearchUserAside />

        {cohorts && showAllCohorts()}
        {students && showAllStudents()}
        {myCohort && showMyCohort()}
        {teachers && showAllTeachers()}
      </aside>
    </>
  )
}

export default Dashboard
