import { useContext } from "react"
import { AuthContext } from "../../context/auth"

const UserName = () => {
  const loggedNow = useContext(AuthContext)
  const { loggedInStudent, loggedInTeacher } = loggedNow

  let name = ""

  if (loggedInStudent) {
    name = loggedInStudent?.firstName + " " + loggedInStudent?.lastName
  }

  if (loggedInTeacher) {
    name =
      loggedInTeacher?.profile.firstName +
      " " +
      loggedInTeacher?.profile.lastName
  }

  return <p>{name}</p>
}

export default UserName
