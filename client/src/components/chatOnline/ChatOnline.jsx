import './chatOnline.css';

export default function ChatOnline () {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img
                        className="chatOnlineImg"
                        src="https://archziner.com/wp-content/uploads/2020/07/air-jordan-hoodie-worn-by-man-wearing-purge-mask-with-neon-lights-super-cool-wallpapers-holding-pink-smoke-bomb.jpg"
                        alt="Online friend img"
                    />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Kiki Mikky</span>
            </div>
        </div>
    );
}
