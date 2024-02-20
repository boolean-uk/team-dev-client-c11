import UserCard from "../userCard"

const StudentsList = ({ students }, user) => {


    return students.map((student, index) => {
        const user = {
          firstName: student.firstName,
          lastName: student.lastName,
          title: student.title
        }
    
        return <UserCard key={`studentsCard${index}`} user={user} />
      })
}



export default StudentsList