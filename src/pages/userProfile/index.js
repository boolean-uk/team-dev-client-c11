import { useTranslation } from "react-i18next"
import Form from "../../components/form"
import TextInput from "../../components/form/textInput"
import ProfileIcon from "../../assets/icons/profileIcon"
import Card from "../../components/card"
import ProfileCircle from "../../components/profileCircle"
import "./style.css"
import { useEffect, useState } from "react"
import Button from "../../components/button"

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
  const { t } = useTranslation()

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
            <div className="welcome-formheader">
              <h3>{t("basicInfo")}</h3>
            </div>
            <Form className="welcome-form">
              <div className="welcome-form-profileimg">
                <p className="text-blue1">{t("photo")}</p>
                <div className="welcome-form-profileimg-input">
                  <ProfileIcon colour="#28C846" background="#64DC78" />
                  <p className="text-blue1">{t("addHeadShot")}</p>
                </div>
                <p className="welcome-form-profileimg-error">
                  {t("uploadValidImage")}
                </p>
              </div>
              <div className="welcome-form-inputs">
                <TextInput
                  disabled={disabledText}
                  name="firstName"
                  label={`${t("firstName")} *`}
                  placeholder={
                    user.firstName
                      ? user.firstName
                      : `${t("enterYourFirstName")} *`
                  }
                  required
                />
                <TextInput
                  disabled={disabledText}
                  name="lastName"
                  label={`${t("lastName")} *`}
                  placeholder={
                    user.lastName
                      ? user.lastName
                      : `${t("enterYourLastName")} *`
                  }
                  required
                />
                <TextInput
                  disabled={disabledText}
                  name="githubUsername"
                  label={`${t("githubUserName")} *`}
                  placeholder={
                    user.githubUsername
                      ? user.githubUsername
                      : `${t("enterYourGithubUser")} *`
                  }
                  required
                />
                {/* {message && <p className="input-message">{message}</p>} */}
              </div>
            </Form>
          </section>

          <section>
            <div className="welcome-formheader">
              <h3>{t("trainingInfo")}</h3>
            </div>
            <Form className="welcome-form">
              <div className="welcome-form-inputs">
                <TextInput
                  disabled={disabledText}
                  name="firstName"
                  label={`${t("firstName")} *`}
                  placeholder={
                    user.firstName
                      ? user.firstName
                      : `${t("enterYourFirstName")} *`
                  }
                  required
                />
                <TextInput
                  disabled={disabledText}
                  name="lastName"
                  label={`${t("lastName")} *`}
                  placeholder={
                    user.lastName
                      ? user.lastName
                      : `${t("enterYourLastName")} *`
                  }
                  required
                />
                <TextInput
                  disabled={disabledText}
                  name="githubUsername"
                  label={`${t("githubUserName")} *`}
                  placeholder={
                    user.githubUsername
                      ? user.githubUsername
                      : `${t("enterYourGithubUser")} *`
                  }
                  required
                />
                {/* {message && <p className="input-message">{message}</p>} */}
              </div>
            </Form>
          </section>

          <section>
            <div className="welcome-formheader">
              <h3>{t("trainingInfo")}</h3>
            </div>
            <Form className="welcome-form">
              <div className="welcome-form-inputs">
                <TextInput
                  disabled={disabledText}
                  name="firstName"
                  label={`${t("firstName")} *`}
                  placeholder={
                    user.firstName
                      ? user.firstName
                      : `${t("enterYourFirstName")} *`
                  }
                  required
                />
                <TextInput
                  disabled={disabledText}
                  name="lastName"
                  label={`${t("lastName")} *`}
                  placeholder={
                    user.lastName
                      ? user.lastName
                      : `${t("enterYourLastName")} *`
                  }
                  required
                />
                <TextInput
                  disabled={disabledText}
                  name="githubUsername"
                  label={`${t("githubUserName")} *`}
                  placeholder={
                    user.githubUsername
                      ? user.githubUsername
                      : `${t("enterYourGithubUser")} *`
                  }
                  required
                />
                {/* {message && <p className="input-message">{message}</p>} */}
              </div>
            </Form>
          </section>

          <section>
            <div className="welcome-formheader">
              <h3>{t("trainingInfo")}</h3>
            </div>
            <Form className="welcome-form">
              <div className="welcome-form-inputs">
                <TextInput
                  disabled={disabledText}
                  name="firstName"
                  label={`${t("firstName")} *`}
                  placeholder={
                    user.firstName
                      ? user.firstName
                      : `${t("enterYourFirstName")} *`
                  }
                  required
                />
                <TextInput
                  disabled={disabledText}
                  name="lastName"
                  label={`${t("lastName")} *`}
                  placeholder={
                    user.lastName
                      ? user.lastName
                      : `${t("enterYourLastName")} *`
                  }
                  required
                />
                <TextInput
                  disabled={disabledText}
                  name="githubUsername"
                  label={`${t("githubUserName")} *`}
                  placeholder={
                    user.githubUsername
                      ? user.githubUsername
                      : `${t("enterYourGithubUser")} *`
                  }
                />
                {/* {message && <p className="input-message">{message}</p>} */}
              </div>
            </Form>
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
