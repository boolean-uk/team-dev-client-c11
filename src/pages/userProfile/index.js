import { useTranslation } from "react-i18next"
import Card from "../../components/card"
import ProfileCircle from "../../components/profileCircle"
import "./style.css"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { get } from '../../service/apiClient.js'
import Button from "../../components/button"
import BasicInfo from "../../components/basic-info"
import ContactInfo from "../../components/contactInfo"
import TrainingInfo from "../../components/trainingInfo"
import Bio from "../../components/bio"
import ProfessionalInfo from "../../components/professionalinfo"



const UserProfile = () => {
  const {id} = useParams()
  const [disabledText, setDisabledText] = useState(true)
  const [saveButton, setSave] = useState(false)
  const [isTeacher, setisTeacher] = useState(false)
  const [user, setUser] = useState({
    firstName: "Lukas",
    lastName: "Dembicki",
    githubUsername: "PeachyOmnivore",
    bio: "Hello this is my bio",
    email: "email@email.com",
    mobile: "07770777077",
    password: "Password123!",
    role: "Student",
    specialism: "Full-Stack",
    cohort: "11",
    startDate: "121212",
    endDate: "121212",
    imageUrl: "image@image.com",
  })
  const [tempUser] = useState(user)

  const initials =
  user && user.firstName && user.lastName
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : "A"

  let classes = ""
  if(saveButton === false){classes = "locked-input"}

  const splitWord = user.bio.trim(/\s+/g, "").length


  const onInput = (event) => {
    const { name, value } = event.target

    setUser({
      ...user,
      [name]: value,
    })
  }

  const { t } = useTranslation()

  
  const revert = () => {
    setUser(tempUser)
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
          <section className={`${classes}`}>
            <BasicInfo
              onInput={onInput}
              disabledText={disabledText}
              data={user}
            />
          </section>

          {isTeacher ? (
            <section className={`${classes}`}>
              <ProfessionalInfo
                onInput={onInput}
                disabledText={disabledText}
                data={user}
              />
            </section>
          ) : (
            <section className={`${classes}`}>
              <TrainingInfo
                onInput={onInput}
                disabledText={disabledText}
                data={user}
              />
            </section>
          )}

          <section className={`${classes}`}>
            <ContactInfo
              onInput={onInput}
              disabledText={disabledText}
              data={user}
            />
          </section>

          <section className={`${classes}`}>
            <Bio 

            onInput={onInput} 
            disabledText={disabledText} 
            data={user}
            splitWord={splitWord} />
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
