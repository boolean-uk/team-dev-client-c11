import { useCallback, useContext, useEffect, useState } from "react"
import MyExercises from "../../components/myCohortExercises"
import MyTeachers from "../../components/myCohortTeachers"
import MyCohortDetails from "../../components/myCohortDetails"
import { getStudentsByCohortId, getTeachers } from "../../service/apiClient"
import { AuthContext } from "../../context/auth"

const MyCohort = () => {
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])

  const loggedInStudent = useContext(AuthContext).loggedInStudent

  const getMyClassmates = useCallback((cohortId) => {
    getStudentsByCohortId(cohortId).then(setStudents)
  }, [])

  const getAllTeachers = useCallback(() => getTeachers().then(setTeachers), [])

  useEffect(() => {
    getAllTeachers()

    if (loggedInStudent) {
      getMyClassmates(loggedInStudent.cohortId)
    }
  }, [getAllTeachers, getMyClassmates, loggedInStudent])

  return (
    <>
      <main>
        <MyCohortDetails
          students={students}
          currentCohort={loggedInStudent ? loggedInStudent.cohortId : "0"}
        />
      </main>

      <aside>
        <MyTeachers teachers={teachers} />
        <MyExercises />
      </aside>
    </>
  )
}

export default MyCohort
