import { useContext } from "react";
import { AuthContext } from "../../context/auth";



const MyCohortName = () => {

const cohortContext = useContext(AuthContext)
const { loggedInStudent } = cohortContext

let cohortName = ''

if (loggedInStudent) {
cohortName = loggedInStudent?.cohort.department.name + ", " + loggedInStudent?.cohort.name
}


return (
<><small>{cohortName}</small></>
)


}

export default MyCohortName