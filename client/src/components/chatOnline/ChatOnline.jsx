import './chatOnline.css';
import {useEffect, useState} from "react";
import axios from "axios";

export default function ChatOnline ({ onlineUsers, currentId, setCurrentChat }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`/users/friends/${currentId}`);
            setFriends(res.data);
        };

        getFriends();
    }, [currentId]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);

    const handleClick = async (onlineFriend) => {
        try {
            const res = await axios.get(`/conversations/find/${currentId}/${onlineFriend._id}`);
            setCurrentChat(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="chatOnline">
            {onlineFriends.map((o) => (
                <div key={o?._id} className="chatOnlineFriend" onClick={() => {handleClick(o)}}>
                    <div className="chatOnlineImgContainer">
                        <img
                            className="chatOnlineImg"
                            src={
                                o?.profilePicture
                                    ? PF + o.profilePicture
                                    : PF + 'person/noAvatar.png'
                            }
                            alt="Online friend img"
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o?.username}</span>
                </div>
            ))}
        </div>
    );
}
