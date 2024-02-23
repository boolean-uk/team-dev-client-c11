import { useTranslation } from "react-i18next"
import Card from "../../components/card"
import ProfileCircle from "../../components/profileCircle"
import "./style.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  getUserById,
  getUserProfileById,
  updateProfile,
} from "../../service/apiClient.js"
import Button from "../../components/button"
import BasicInfo from "../../components/basic-info"
import ContactInfo from "../../components/contactInfo"
import TrainingInfo from "../../components/trainingInfo"
import Bio from "../../components/bio"
import ProfessionalInfo from "../../components/professionalinfo"

const UserProfile = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [disabledText, setDisabledText] = useState(true)
  const [saveButton, setSave] = useState(false)
  const [isTeacher] = useState(true)
  const [user, setUser] = useState()
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    githubUsername: "",
    bio: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
    specialism: "",
    cohort: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
  })
  const [tempUser, setTempUser] = useState(profile)

  useEffect(() => {
    getUserProfileById(id).then((profile) => {
      setProfile(profile.data.profile)
      setTempUser(profile.data.profile)
    })

    getUserById(id).then((user) => {
      setUser(user.data.user)
    })
  }, [id])

  console.log("ID....", id)
  console.log("TEMP USER....", tempUser)
  console.log("Profile....", profile)
  console.log("User....", user)


  const initials =
    profile && profile.firstName && profile.lastName
      ? `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`
      : "A"

  let classes = ""
  if (saveButton === false) {
    classes = "locked-input"
  }

  // const splitWord = profile.bio.trim(/\s+/g, "").length

  const onInput = (event) => {
    const { name, value } = event.target

    setProfile({
      ...profile,
      [name]: value,
    })
  }


  const revert = () => {
    setProfile(tempUser)
    console.log("revert")
    return
  }

  const save = () => {
    updateProfile(
      id,
      profile.firstName,
      profile.lastName,
      profile.githubUsername,
      profile.bio,
      profile.email,
      profile.mobile,
      profile.password,
      profile.role,
      profile.specialism,
      profile.cohort,
      profile.startDate,
      profile.endDate,
      profile.imageUrl
    )
    setTempUser(profile)
    console.log("save")
    return
  }

  return (
    <main>
      <div className="welcome">
        <h2>{t("profile")}</h2>
      </div>

      <Card>
        <div className="profile-information">
          <ProfileCircle initials={initials} />
          <section>
            <h4>
              {profile.firstName} {profile.lastName}
            </h4>
            {/* <p>{user.title}</p> */}
          </section>
        </div>

        <div className="profile-container">
          <section className={`${classes}`}>
            <BasicInfo
              onInput={onInput}
              disabledText={disabledText}
              data={profile}
            />
          </section>

          {isTeacher ? (
            <section className={`${classes}`}>
              <ProfessionalInfo
                onInput={onInput}
                disabledText={disabledText}
                data={profile}
              />
            </section>
          ) : (
            <section className={`${classes}`}>
              <TrainingInfo
                onInput={onInput}
                disabledText={disabledText}
                data={profile}
              />
            </section>
          )}

          <section className={`${classes}`}>
            <ContactInfo
              onInput={onInput}
              disabledText={disabledText}
              data={profile}
            />
          </section>

          <section className={`${classes}`}>
            <Bio
              onInput={onInput}
              disabledText={disabledText}
              data={profile}
              // splitWord={splitWord}
            />
          </section>
        </div>

        <p className="text-blue1">{`*${t("required")}`}</p>

        <div className="profile-buttons">
          <Button
            text={t("cancel")}
            onClick={() => {
              setSave(false)
              setDisabledText(true)
              revert()
            }}
          />

          {saveButton ? (
            <Button
              classes="saveButton"
              text={t("save")}
              onClick={() => {
                setSave(false)
                setDisabledText(true)
                save()
              }}
            />
          ) : (
            <Button
              text={t("edit")}
              onClick={() => {
                setSave(true)
                setDisabledText(false)
              }}
            />
          )}
        </div>
      </Card>
    </main>
  )
}

export default UserProfile
