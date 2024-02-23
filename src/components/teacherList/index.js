import UserCard from "../userCard"

const TeacherList = ({ teachers }) => {
  return teachers.map((teacher, index) => {
    const user = {
      firstName: teacher.profile.firstName,
      lastName: teacher.profile.lastName,
      title: teacher.profile.title,
    }

    return <UserCard key={`teacherCard${index}`} user={user} />
  })
}

export default TeacherList
