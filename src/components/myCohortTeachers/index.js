import UserCard from "../userCard"
import Card from "../card"
import "./style.css"
import { useTranslation } from "react-i18next"

const MyTeachers = ({ teachers }) => {
  const { t } = useTranslation()

  return (
    <Card>
      <h3 className="my-cohort-teachers--header">{t("teachers")}</h3>
      <ul className="my-cohort-teachers--list">
        {teachers.map((user, idx) => (
          <UserCard user={user.user.profile} key={idx} />
        ))}
      </ul>
    </Card>
  )
}

export default MyTeachers
