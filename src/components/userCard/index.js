import { useState } from "react";
import OptionsIcon from "../optionsIcon";
import ProfileCircle from "../profileCircle";
import ProfileContextMenu from "../ProfileContextMenu";
import "./style.css";

const UserCard = ({ user, contextMenu }) => {
    const [triggerContextMenu, setTriggerContextMenu] = useState(false);

    if (!user.firstName || !user.lastName) {
        return;
    }

    const initials = user.firstName?.charAt(0) + user.lastName?.charAt(0);

    return (
        <>
            <section className="user">
                <ProfileCircle initials={initials} />
                <div className="user-info">
                    <div className="user-name">
                        <strong>
                            {user.firstName} {user.lastName}
                        </strong>
                    </div>
                    <div className="user-title">{user.title}</div>
                </div>
                <div className="options-icon-wrapper">
                    <OptionsIcon
                        trigger={() =>
                            setTriggerContextMenu(!triggerContextMenu)
                        }
                    />
                    {triggerContextMenu ? <ProfileContextMenu user={user} /> : ""}
                </div>
            </section>
            
        </>
    );
};

export default UserCard;
