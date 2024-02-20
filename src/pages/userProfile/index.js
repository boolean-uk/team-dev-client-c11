import { useTranslation } from "react-i18next"
import Card from "../../components/card"
import ProfileCircle from "../../components/profileCircle"
import "./style.css"
import { useEffect, useState } from "react"
import Button from "../../components/button"
import BasicInfo from "../../components/basic-info"
import ContactInfo from "../../components/contactInfo"
import TrainingInfo from "../../components/trainingInfo"
import Bio from "../../components/bio"
import ProfessionalInfo from "../../components/professionalinfo"


const user = {
  firstName: "Lukas",
  lastName: "Dembicki",
  title: "Software Developer",
  bio: "Hello I am a coder",
  githubUsername: "PeachyOmnivore",
}

const initials =
  user && user.firstName && user.lastName
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : "A"

const UserProfile = () => {
  const [disabledText, setDisabledText] = useState(true)
  const [saveButton, setSave] = useState(false)
  const [isTeacher, setisTeacher] = useState(false)

  const { t } = useTranslation()

  const userGet = () => {
    
  }

  const revert = () => {
    console.log("revert")
    return
  }

  const save = () => {
    console.log("save")
    return
  }

  useEffect(() => {
    console.log("useEffect")
  }, [])

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
              {user.firstName} {user.lastName}
            </h4>
            <p>{user.title}</p>
          </section>
        </div>

        <div className="profile-container">
          <section>
            <BasicInfo disabledText={disabledText} data={user} />
          </section>

          {isTeacher ? (
            <section>
              <ProfessionalInfo disabledText={disabledText} data={user} />
            </section>
          ) : (
            <section>
              <TrainingInfo disabledText={disabledText} data={user} />
            </section>
          )}

          <section>
            <ContactInfo disabledText={disabledText} data={user} />
          </section>

          <section>
            <Bio disabledText={disabledText} data={user} />
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
