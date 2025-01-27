import { NavLink } from "react-router-dom"
import CohortIcon from "../../assets/icons/cohortIcon"
import HomeIcon from "../../assets/icons/homeIcon"
import ProfileIcon from "../../assets/icons/profileIcon"
import "./style.css"
import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { AuthContext } from "../../context/auth"

const Navigation = () => {
  const { t } = useTranslation()
  const userId = useContext(AuthContext).userId

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            <HomeIcon colour="#000046" />
            <p>{t("home")}</p>
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${userId}`}>
            <ProfileIcon />
            <p>{t("profile")}</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-cohort">
            <CohortIcon />
            <p>{t("cohort")}</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
