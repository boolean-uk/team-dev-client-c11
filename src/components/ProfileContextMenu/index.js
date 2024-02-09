import "./style.css";
import ProfileIcon from "../../assets/icons/profileIcon";
import { useNavigate } from "react-router-dom";

const ProfileContextMenu = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="menu-wrapper">
            <div
                onClick={navigate(`/users/${user.id}`)}
                className="profile-context-menu"
            >
                <ProfileIcon />
                <div className="profile-text">Profile</div>
            </div>
        </div>
    );
};

export default ProfileContextMenu;
