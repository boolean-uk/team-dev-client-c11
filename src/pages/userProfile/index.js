import { useTranslation } from "react-i18next"
import Form from "../../components/form"
import TextInput from "../../components/form/textInput"
import ProfileIcon from "../../assets/icons/profileIcon"

const UserProfile = () => {
  const { t } = useTranslation()
  return (
    <main>
      <div className="welcome-formheader">
        <h3>{t("profile")}</h3>
      </div>
      <div className="profile-container">
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
              name="firstName"
              label={`${t("firstName")} *`}
              placeholder={`${t("enterYourFirstName")} *`}
              required
            />
            <TextInput
              name="lastName"
              label={`${t("lastName")} *`}
              placeholder={`${t("enterYourLastName")} *`}
              required
            />
            <TextInput
              name="githubUsername"
              label={`${t("githubUserName")} *`}
              placeholder={`${t("enterYourGithubUser")} *`}
              required
            />
            {/* {message && <p className="input-message">{message}</p>} */}
            <p className="text-blue1">{`*${t("required")}`}</p>
          </div>
        </Form>

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
              name="firstName"
              label={`${t("firstName")} *`}
              placeholder={`${t("enterYourFirstName")} *`}
              required
            />
            <TextInput
              name="lastName"
              label={`${t("lastName")} *`}
              placeholder={`${t("enterYourLastName")} *`}
              required
            />
            <TextInput
              name="githubUsername"
              label={`${t("githubUserName")} *`}
              placeholder={`${t("enterYourGithubUser")} *`}
              required
            />
            {/* {message && <p className="input-message">{message}</p>} */}
            <p className="text-blue1">{`*${t("required")}`}</p>
          </div>
        </Form>

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
                name="firstName"
                label={`${t("firstName")} *`}
                placeholder={`${t("enterYourFirstName")} *`}
                required
              />
              <TextInput
                name="lastName"
                label={`${t("lastName")} *`}
                placeholder={`${t("enterYourLastName")} *`}
                required
              />
              <TextInput
                name="githubUsername"
                label={`${t("githubUserName")} *`}
                placeholder={`${t("enterYourGithubUser")} *`}
                required
              />
              {/* {message && <p className="input-message">{message}</p>} */}
              <p className="text-blue1">{`*${t("required")}`}</p>
            </div>
          </Form>
      </div>
    </main>
  )
}

export default UserProfile
