import './message.css';
import {format} from "timeago.js";

export default function Message ({message, own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src="https://i.pinimg.com/474x/c1/08/29/c10829350e4f3339603f13220e737944.jpg"
                    alt="send some img"
                />
                <p className="messageText">
                    {message.text}
                </p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}
