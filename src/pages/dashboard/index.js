import { useState, useEffect } from "react"
import Button from "../../components/button"
import Card from "../../components/card"
import CreatePostModal from "../../components/createPostModal"
import Posts from "../../components/posts"
import useModal from "../../hooks/useModal"
import "./style.css"
import { getCohorts, getPosts, getUsers } from "../../service/apiClient"
import UsersList from "../../components/usersList"
import SearchUserAside from "../../components/searchUserAside"
import CohortList from "../../components/cohortList"
import { useTranslation } from "react-i18next"

const Dashboard = () => {
  const {t} = useTranslation()

  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
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

  const getAllUsers = () => {
    getUsers().then(setUsers)
  }
  
  const getAllCohorts = () => {
    getCohorts().then(setCohorts)
  }
  
  useEffect(getAllPosts, [])
  useEffect(getAllUsers, [])
  useEffect(getAllCohorts, [])
  
  const { openModal, setModal } = useModal()
  
  const showModal = () => {
    setModal(`${t('createAPost')}`, <CreatePostModal getAllPosts={getAllPosts} />)

    openModal()
  }
  
  const shouldRenderCohortList = () => Array.isArray(cohorts)

  const showCohorts = () => {
    if (!shouldRenderCohortList()) {
      return <></>
    }
    return (
      <Card header={t('Cohorts')}>
        <CohortList cohorts={cohorts} />
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
            <Button text={t('whatsOnYourMind')} onClick={showModal} />
          </div>
        </Card>

        <Posts posts={posts} getAllPosts={getAllPosts} />
      </main>
      <aside>
        <SearchUserAside />
        <Card header={t('My Cohort')}>
          <UsersList users={users} />
        </Card>
        {showCohorts()}
      </aside>
    </>
  )
}

export default Dashboard
