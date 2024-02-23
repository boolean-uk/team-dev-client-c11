import "./style.css"
import ProfileIcon from "../../assets/icons/profileIcon"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

const ProfileContextMenu = ({ user }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="profile-context-menu">
      <ProfileIcon />
      <div onClick={() => navigate(`/profile/${user.id}`)} className="profile-text">
        {t("profile")}
      </div>
    </div>
  )
}

export default ProfileContextMenu
