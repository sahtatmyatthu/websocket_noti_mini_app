import { useEffect, useState } from "react";
import "./app.css";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { posts } from "./data";
import { io } from "socket.io-client";

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(()=>{
    setSocket(io("http://localhost:5000"));
    //this is the client side
   
  }, [])

   // အောက်က log က client ကနေပြီးတော့မှ server ဆီက ယူတာ - socket.on
    // firstEvent က event name ကိုဆိုလို
    // console.log(socket.on("firstEvent", (msg)=>{
    //   console.log(msg);
    // }));

  useEffect(() => {
   
    // send event to the server - socket.emit
    // client ဆီကနေ socket.emit လုပ်တာကို server ကနေပြီးတော့မှ socket.on နဲ့ဖမ်း
    // ? မပါရင် null pointer တက်မယ်, ပထမအကြိမ်မှာတော့ null ဖြစ်နေမှာပဲ ? နဲ့ရှောင်ထားတဲ့သဘော
    socket?.emit("newUser", user)
    // 
  }, [socket, user])
  
  

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
          
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
