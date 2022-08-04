import "./navbar.css";
import Notification from "../../img/notification.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";
import { useEffect, useState } from "react";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  // getNotification event ကို Navbar မှာ useEffect အနေနဲ့ ပြန်ဖမ်း socket မှာ update ဖြစ်တာနဲ့ update ဖြစ်မှာ ဆိုတာမျိုး
  useEffect(() => {
    // server က event ကိုဖမ်းမယ် socket.on နဲ့
    socket.on("getNotification", (data) => {
      // အရင် က notification ထဲမှာ ရှိတဲ့ကောင် နဲ့ ခု data နဲ့ ကို concactenate လုပ်လိုက်တယ်
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log(notifications);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span
        key={senderName}
        className="notification"
      >{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };
  return (
    <div className="navbar">
      <span className="logo">Ngasa App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
      </div>

      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Message} className="iconImg" alt="" />
        </div>
      </div>

      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Settings} className="iconImg" alt="" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
