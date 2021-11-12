import './messenger.css';
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import React from "react";

export default function Messenger () {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessages] = useState("");
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`/conversations/${user._id}`);
                setConversations(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`/messages/${currentChat?._id}`);
                setMessages(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        };
        try {
            const res = await axios.post('/messages', message);
            setMessages([...messages, res.data]);
            setNewMessages('');
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput"/>
                        {conversations.map(c => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation key={c._id} conversation={c} currentUser={user}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                                <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div key={m._id+m.sender} ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id}/>
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="Write something..."
                                        onChange={(e) => setNewMessages(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div></> :
                                <span className="noConversation">
                                    Open a conversation to start a chat.
                                </span>
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    )
}
