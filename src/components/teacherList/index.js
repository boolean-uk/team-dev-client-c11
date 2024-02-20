import UserCard from "../userCard"

const TeacherList = ({ teachers }) => {
  return teachers.map((teacher, index) => {
    const user = {
      firstName: teacher.user.profile.firstName,
      lastName: teacher.user.profile.lastName,
      title: teacher.user.profile.title,
    }

    return <UserCard key={`teacherCard${index}`} user={user} />
  })
}

export default TeacherList
