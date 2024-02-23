import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import ProfileCircle from "../profileCircle";


const LoggedInUser = () => {

    const loggedNow = useContext(AuthContext)
    const { loggedInStudent, loggedInTeacher } = loggedNow

    let initials = ''

    if (loggedInStudent) {
        initials = loggedInStudent?.firstName.charAt(0) + loggedInStudent?.lastName.charAt(0)
    }

    if (loggedInTeacher) {
        initials = loggedInTeacher?.user.profile.firstName.charAt(0) + loggedInTeacher?.user.profile.lastName.charAt(0)
    }

    return (
        <>
        <ProfileCircle initials={initials}/>
        </>
    )
}


export default LoggedInUser

