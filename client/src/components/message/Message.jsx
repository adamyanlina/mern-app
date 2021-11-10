import './message.css';

export default function Message ({own}) {
    return (
        <div className="message own">
            <div className="messageTop">
                <img
                    className="messageImg"
                    src="https://i.pinimg.com/474x/c1/08/29/c10829350e4f3339603f13220e737944.jpg"
                    alt="send some img"
                />
                <p className="messageText">Lorem ipsum lorem...Lorem ipsum lorem, ist okay!!</p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    )
}
