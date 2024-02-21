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
  getStudentsByCohortId
} from "../../service/apiClient"
import UsersList from "../../components/usersList"
import SearchUserAside from "../../components/searchUserAside"
import CohortList from "../../components/cohortList"
import { useTranslation } from "react-i18next"
import TeacherList from "../../components/teacherList"
import StudentsList from "../../components/studentsList"
import { AuthContext } from "../../context/auth"

const Dashboard = () => {
  const { t } = useTranslation()
  const loggedInStudent = useContext(AuthContext).loggedInStudent

  const [posts, setPosts] = useState([])
  const [myCohort, setMyCohort] = useState([])
  const [cohorts, setCohorts] = useState(null)
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])

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
    getStudentsByCohortId(cohortId).then(setMyCohort)
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
    getAllPosts()
    loggedInStudent && getMyCohort(loggedInStudent.cohortId)
    getAllCohorts()
    getAllTeachers()
    getAllStudents()
  }, [getAllPosts, getMyCohort, getAllCohorts, getAllTeachers, getAllStudents, loggedInStudent])

  const { openModal, setModal } = useModal()

  const showModal = () => {
    setModal(
      `${t("createAPost")}`,
      <CreatePostModal getAllPosts={getAllPosts} />
    )

    openModal()
  }

  const shouldRenderList = (list) => Array.isArray(list)

  const showAllCohortsOrMine = () => {
    if (shouldRenderList(cohorts)) {
      return (
      <>
        <Card header={t("Cohorts")}>
          <CohortList cohorts={cohorts} />
        </Card>
        <Card header={t("Students")}>
         <StudentsList students={students}/>
       </Card>
      </>
      )
    }
    return (
      <Card header={t("myCohort")}>
        <UsersList users={myCohort} />
      </Card>
    )
  }

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon">
              <p>AJ</p>
            </div>
            <Button text={t("whatsOnYourMind")} onClick={showModal} />
          </div>
        </Card>

        <Posts posts={posts} getAllPosts={getAllPosts} />
      </main>
      <aside>
        <SearchUserAside />
        {showAllCohortsOrMine()}
        <Card header={t("Teachers")}>
          <TeacherList teachers={teachers} />
        </Card>
      </aside>
    </>
  )
}

export default Dashboard