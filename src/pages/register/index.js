import { useState } from "react";
import Button from "../../components/button";
import TextInput from "../../components/form/textInput";
import useAuth from "../../hooks/useAuth";
import CredentialsCard from "../../components/credentials";
import "./register.css";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { onRegister, checkPassword } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { t } = useTranslation()

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-blue register credentialpage">
      <CredentialsCard
        title={t("register")}
        socialLinksTitle={t("signUpAlternative")}
        altButtonTitle={t("userExist")}
        altButtonLink="/login"
        altButtonText={t("logIn")}
      >
        <div className="register-form">
          <form>
            <TextInput
              value={formData.email}
              onChange={(event) => onChange(event)}
              type="email"
              name="email"
              label={`${t('email')} *`}
            />
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={`${t('password')} *`}
            type={"password"}
            />
          </form>
          <p>{checkPassword(formData.password) ? t('passwordOk') : t('invalidPassword')}</p>
          <Button
            text={t('signUp')}
            onClick={() => checkPassword(formData.password) ? onRegister(formData.email, formData.password) : false }
            classes="green width-full"
          />
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Register;
