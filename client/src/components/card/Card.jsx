import "./card.css"
import Heart from "../../img/heart.svg";
import Comment from "../../img/comment.svg";
import Share from  "../../img/share.svg";
import Info from "../../img/info.svg";
import HeartFilled from "../../img/heartFilled.svg";
import { useState } from "react";



const Card = ({post, socket, user}) => {

  const [liked, setLiked] = useState(false);

  // Heart, Comment, Share, Info ကိုထိတာနဲ့ handleNotification က ထပြီးအလုပ်လုပ်မှာ 
  const handleNotification = (type) => {
    setLiked(true);

    // sendNotification ဆိုတဲ့ event name နဲ့ client ကနေserver ကနေ server ကိုပို့မယ်
    socket.emit("sendNotification", {
      // လက်ရှိ browser ကို ဖွင့်ထားတဲ့ကောင် ရဲ့နာမည်
      senderName: user,
      // browser ပေါ်က post ရေးထားတဲ့ကောင် (post တင်ထားတဲ့ကောင် ရဲ့နာမည်)
      receiverName: post.username,
      // type ဆိုတာကတော့ handleNotification ကနေပြီးတော့မှ parameter အနေနဲ့ ပါလာမယ့်ကောင်
      type,
    } )
    
    
  } 

  console.log(liked);
  return (
    <div className='card'>
        <div className="info">
          <img src={post.userImg} alt="" className="userImg" />
          <span>{post.fullname}</span>
        </div>
        <img src={post.postImg} className="postImg" alt="" />
        <div className="interaction">
          {liked ? ( <img src={HeartFilled} alt="" className="cardIcon"  />) : (

            <img src={Heart} alt="" className="cardIcon" onClick={()=>handleNotification(1)} />
            )}
          <img src={Comment} alt="" className="cardIcon" onClick={()=>handleNotification(2)} />
          <img src={Share} alt="" className="cardIcon" onClick={()=>handleNotification(3)} />
          <img src={Info} alt="" className="cardIcon infoicon" />
        </div>
    </div>
  )
}

export default Card