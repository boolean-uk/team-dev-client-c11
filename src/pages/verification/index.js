import Button from "../../components/button";
import TickIcon from "../../assets/tickIcon";
import "./verification.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Verification = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onContinueClick = () => {
    navigate("/welcome");
  };

  return (
    <div className="bg-blue verify credentialpage">
      <div className="bg-white verify-card">
        <TickIcon />
        <h1 className="h3">{t("welcome")}</h1>
        <div className="text-blue1">
          <p className="text-medium">
            {t("emailSent")}
          </p>
          <br />
          <p className="text-medium">
            {t("followLinkToLogin")}
          </p>
        </div>
        <div className="verify-card-buttons">
          <Button text={t("resendEmail")} classes="offwhite" />
          <Button text={t("continue")} onClick={onContinueClick} classes="green" />
        </div>
      </div>
    </div>
  );
};

export default Verification;
