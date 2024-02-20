import { useState } from "react"
import Stepper from "../../components/stepper"
import useAuth from "../../hooks/useAuth"
import StepOne from "./stepOne"
import StepTwo from "./stepTwo"
import StepThree from "./stepThree"
import StepFour from "./stepFour"
import "./style.css"
import { useTranslation } from "react-i18next"

const Welcome = () => {
  const [canProgress, setCanProgress] = useState(false)
  const [message, setMessage] = useState("")
  const { t } = useTranslation()

  const { onCreateProfile } = useAuth()

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

  const onChange = (event) => {
    const { name, value } = event.target

    setProfile({
      ...profile,
      [name]: value,
    })
  }

  const onComplete = () => {
    onCreateProfile(
      profile.photoUrl,
      profile.firstName,
      profile.lastName,
      profile.githubUsername,
      profile.bio,
      profile.mobile,
      profile.email,
      profile.password,
      profile.role,
      profile.specialism,
      profile.cohort,
      profile.startDate,
      profile.endDate
    )
  }

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">{t("welcome")}</h1>
        <p className="text-blue1">{t("getStarted")}</p>
      </div>

      <Stepper
        setMessage={setMessage}
        header={<WelcomeHeader />}
        onComplete={onComplete}
        canProgress={canProgress}
        setCanProgress={setCanProgress}
      >
        <StepOne
          setMessage={setMessage}
          message={message}
          data={profile}
          setData={onChange}
          setCanProgress={setCanProgress}
        />
        <StepTwo
          setMessage={setMessage}
          message={message}
          data={profile}
          setData={onChange}
          setCanProgress={setCanProgress}
        />
        <StepThree
          setMessage={setMessage}
          message={message}
          data={profile}
          setData={onChange}
          setCanProgress={setCanProgress}
        />
        <StepFour data={profile} setData={onChange} />
      </Stepper>
    </main>
  )
}

const WelcomeHeader = () => {
  const { t } = useTranslation()
  return (
    <div className="welcome-cardheader">
      <h2>{t("createProfile")}</h2>
      <p className="text-blue1">{t("aboutSelf")}</p>
    </div>
  )
}

export default Welcome
