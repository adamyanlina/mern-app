import './conversation.css';
import {useEffect, useState} from "react";
import axios from "axios";

export default function Conversation ({conversation, currentUser}) {
    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversation.members.find(mId => mId !== currentUser._id);

        const getUser = async () => {
            try {
                const res = await axios.get(`/users?userId=${friendId}`);
                setUser(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={user?.profilePicture ? user.profilePicture : `${PF}person/noAvatar.png`}
                alt={`${user?.username} avatar`}
            />
            <span className="conversationName">{ user?.username }</span>
        </div>
    );
}
