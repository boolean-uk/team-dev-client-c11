import { useState, useEffect } from "react"
import Button from "../../components/button"
import Card from "../../components/card"
import CreatePostModal from "../../components/createPostModal"
import Posts from "../../components/posts"
import useModal from "../../hooks/useModal"
import "./style.css"
import { getCohorts, getPosts, getSelf, getStudentsByCohortId } from "../../service/apiClient"
import UsersList from "../../components/usersList"
import SearchUserAside from "../../components/searchUserAside"
import CohortList from "../../components/cohortList"
import { useTranslation } from "react-i18next"

const Dashboard = () => {
  const { t } = useTranslation()

  const [posts, setPosts] = useState([])
  const [myCohort, setMyCohort] = useState([])
  const [cohorts, setCohorts] = useState(null)

  const sortPosts = (fetchedPosts) => {
    const sortedPosts = fetchedPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    return sortedPosts
  }

  const getAllPosts = () => {
    getPosts()
      .then(sortPosts)
      .then(setPosts)
      .catch((error) => {
        console.error("Error get all posts sorted:", error.message)
      })
  }

  // const getAllUsers = () => {
  //   getUsers().then(setMyCohort)
  // }

  const getAllCohorts = () => {
    getCohorts().then(setCohorts)
  }

  const isInACohort = () =>
    getSelf().then((user) => {
      if (!user.cohortId) {
        throw new Error("no cohort assigned to the current user")
      }
      return user.cohortId
    })

  const getStudentsInMyCohort = () => {
    isInACohort()
      .then(
        (cohortId) => getStudentsByCohortId(cohortId),
        (error) =>
          console.error("Error getting the user's cohort:", error.message)
      )
      .then(setMyCohort)
  }

  useEffect(getAllPosts, [])
  useEffect(getStudentsInMyCohort, [])
  useEffect(getAllCohorts, [])

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
        <Card header={t("Cohorts")}>
          <CohortList cohorts={cohorts} />
        </Card>
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
      </aside>
    </>
  )
}

export default Dashboard
