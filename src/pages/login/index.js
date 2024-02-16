import { useState } from "react"
import Button from "../../components/button"
import TextInput from "../../components/form/textInput"
import useAuth from "../../hooks/useAuth"
import CredentialsCard from "../../components/credentials"
import "./login.css"
import { useTranslation } from "react-i18next"

const Login = () => {
  const { onLogin } = useAuth()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loginMessage, setLoginMessage] = useState("")
  const { t } = useTranslation()

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const checkLoginErrors = async () => {
    try {
      await onLogin(formData.email, formData.password)
    } catch (error) {
      setLoginMessage(error.message)
    }
  }

  return (
    <div className="bg-blue login credentialpage">
      <CredentialsCard
        title={t("login")}
        socialLinksTitle={t("loginAlternative")}
        altButtonTitle={t("needOtherAccount")}
        altButtonLink="/register"
        altButtonText={t("signUp")}
      >
        <div className="login-form">
          <form>
            <TextInput
              value={formData.email}
              onChange={onChange}
              name="email"
              label={`${t("email")} *`}
            />
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={`${t("password")} *`}
              type={"password"}
            />
          </form>
          {loginMessage && <p className="input-message">{loginMessage}</p>}
          <Button
            text={t("logIn")}
            onClick={() => {
              checkLoginErrors()
              onLogin(formData.email, formData.password)
            }}
            classes="green width-full"
          />
        </div>
      </CredentialsCard>
    </div>
  )
}

export default Login
