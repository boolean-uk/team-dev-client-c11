import FullLogo from "../../assets/fullLogo"
import useAuth from "../../hooks/useAuth"
import "./style.css"
import Card from "../card"
import ProfileIcon from "../../assets/icons/profileIcon"
import CogIcon from "../../assets/icons/cogIcon"
import LogoutIcon from "../../assets/icons/logoutIcon"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import LanguageSelect from "../languageSelect"
import LoggedInUser from "../loggedInUser"
import UserName from "../userName"

const Header = () => {
  const { t } = useTranslation()
  const { token, onLogout } = useAuth()
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const onClickProfileIcon = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  if (!token) {
    return null
  }

  return (
    <header>
      <div className="header-logo">
        <FullLogo />
      </div>
      <div className="header-text-logo">
        <h3 style={{ color: "white", fontSize: "30px", display: "block" }}>
          Cohort Manager
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "10px",
        }}
      >
        <LanguageSelect />
        <div className="profile-icon" onClick={onClickProfileIcon}>
        <LoggedInUser/>
        </div>
      </div>
      {isMenuVisible && (
        <div className="user-panel">
          <Card>
            <section className="post-details">
              <div className="profile-icon">
               <LoggedInUser/>
              </div>
              <div className="post-user-name">
               <UserName/>
                <small>Software Developer, Cohort 3</small>
              </div>
            </section>

            <section className="user-panel-options border-top">
              <ul>
                <li>
                  <NavLink to="/">
                    <ProfileIcon /> <p>{t("profile")}</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <CogIcon />{" "}
                    <p>
                      {t("settings")} &amp; {t("privacy")}
                    </p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" onClick={onLogout}>
                    <LogoutIcon /> <p>{t("logOut")}</p>
                  </NavLink>
                </li>
              </ul>
            </section>
          </Card>
        </div>
      )}
    </header>
  )
}

export default Header
