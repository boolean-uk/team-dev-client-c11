import FullLogo from "../../assets/fullLogo";
import { NavLink } from "react-router-dom";
import SocialLinks from "../socialLinks";
import "./credentials.css";
import Card from "../card";
import LanguageSelect from "../languageSelect";

const CredentialsCard = ({
  title,
  socialLinksTitle,
  altButtonTitle,
  altButtonLink,
  altButtonText,
  children,
}) => {
  return (
    <div className="credentials">
      <Card boxShadow={true}>
        <div className="credentials-logo">
          <FullLogo />
        </div>
        <h1 className="credentials-title h3">{title && title}</h1>
        {children}
        <div className="credentials-sociallinks">
          <p>{socialLinksTitle && socialLinksTitle}</p>
          <div className="credentials-sociallinks-links">
            <SocialLinks />
          </div>
        </div>
        <div className="credentials-bottom">
          <div className="credentials-altbutton">
            <p>{altButtonTitle && altButtonTitle}</p>
            <NavLink to={altButtonLink} className="button offwhite">
              {altButtonText}
            </NavLink>
          </div>
          <LanguageSelect />
        </div>
      </Card>
    </div>
  );
};

export default CredentialsCard;
