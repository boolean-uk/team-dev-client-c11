import { useCallback, useContext, useEffect, useState } from "react"
import MyExercises from "../../components/myCohortExercises"
import MyTeachers from "../../components/myCohortTeachers"
import MyCohortDetails from "../../components/myCohortDetails"
import { getStudentsByCohortId, getTeachers } from "../../service/apiClient"
import { AuthContext } from "../../context/auth"

const MyCohort = () => {
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])

  const cohortId = useContext(AuthContext).loggedInStudent?.cohortId

  const getMyClassmates = useCallback((cohortId) => {
    getStudentsByCohortId(cohortId)
      .then(setStudents)
      .catch((err) =>
        console.log("Error getting students by cohort ID", err.message)
      )
  }, [])

  const getAllTeachers = useCallback(() => getTeachers().then(setTeachers), [])

  useEffect(() => {
    getAllTeachers()

    cohortId && getMyClassmates(cohortId)
  }, [getAllTeachers, getMyClassmates, cohortId])

  return (
    <>
      <main>
        <MyCohortDetails students={students} currentCohort={cohortId ?? "0"} />
      </main>

      <aside>
        <MyTeachers teachers={teachers} />
        <MyExercises />
      </aside>
    </>
  )
}

export default MyCohort
