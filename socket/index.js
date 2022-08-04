import { Server } from "socket.io";

const io = new Server({ 
    cors:{
        origin: "http://localhost:3000",
    }
 });

let onlineUsers = [];

const addNewUser = (username, socketId) =>{
    // some နဲ့စစ်ထားတာဆိုတော့ list ထဲ့မှာ parameter ထဲက username ရှိရင် false ပြန်မှာပေါ့ ဒါပေမဲ့ && နဲ့စစ်ထားတာဆိုတော့ ! ခံပြီးတော့ true ဆိုရင် RHS  ကကောင် လုပ်ဆိုတဲ့ ပုံစံမျိုးလုပ်ထားတာ
    // စစချင်းမှာ မရှိဘူး အာ့ဆို false ပြန်မယ် ! ခံလိုက်တော့ true ဖြစ်သွားမယ် ဟော ညာဘက်ကကောင်လုပ်သွားပြီပေါ့
    !onlineUsers.some((user)=> user.username === username) && onlineUsers.push({username, socketId})
}

const removeUser = (socketId) => {
    // onlineUsers ထဲကကောင်ကို filter နဲ့စစ်မယ် parameter ထဲက socketId နဲ့ မတူတဲ့ကောင်တွေစစ်ထုတ်ပြီးထားခဲ့မှာ တူတဲ့ကောင်ကတော့ remove ခံသွားရတာပေါ့
    onlineUsers = onlineUsers.filter((user)=>user.socketId !== socketId)
}

const getUser = (username) => {
    // onlineUsers ထဲက parameter က username နဲ့ တူတဲ့ကောင် ကို ဆွဲထုတ်တာမျိူးပေါ့
    return onlineUsers.find((user) => user.username === username);
};
io.on("connection", (socket) => {
    // socket.on က client ဆီက လှမ်းယူတဲ့ကောင် 
    // newUser က event name, action မှာ username ကို parameter အနေနဲ့ယူပြီး addNewUser  ကို ဖြတ်ခိုင်းမယ် 
    //socketId ကို တော့ connection event ကနေရမှာပေါ့ socket.id ဆိုပြီး
    // connection ပွင့်တာနဲ့ onlineUsers မှာ update ဖြစ်သွားမယ်
    socket.on("newUser", (username)=> addNewUser(username, socket.id))
   
    // sendNotification နဲ့ပို့ထားတဲ့ကောင်ကို ဒီမှာလာဖမ်းတယ်
    // ဘာတေလည်းဆိုတော့ parameter ကကောင်တေကို 
    socket.on("sendNotification", ({ senderName, receiverName, type }) => {
        // onlineUsers ထဲကမှ parameter အနေနဲ့ပို့လိုက်တဲ့ receiverName ဆိုတဲ့ကောင်ရှိမရှိကို စစ်ပြီး သူ့ကို receiver အနေနဲ့ထားလိုက်တာ
        const receiver = getUser(receiverName);

        // private client ဆီကို getNotification ဆို့တဲ့ event ကို ပြန်ပို့ပေးမယ်
        // getNotification event ထဲမှာ {senderName, type} ဆိုတဲ့ object လေးပါသွားမယ်
        io.to(receiver.socketId).emit("getNotification", {
            senderName,
            type
        })

    })
//socket.on က client ဆီက လှမ်းယူတဲ့ကောင်  သူ့ရဲ့ event name က disconnect
 socket.on("disconnect", ()=> {
    // disconnect ဖြစ်တာနဲ့ socketIdနဲ့တိုက်ပြီးတော့ onlineUsers ကနေဖယ်ထုတ်လိုက်တာပေါ့ 
    // browser ကို close လိုက်တာနဲ့ onlineUsers ဖြစ်ကနေရပ်စဲ
    removeUser(socket.id)
 })
});

io.listen(5000);


 // server ကနေပြီးတော့မှ client တိုင်းဆီကိုပို့တာ့ io.emit
    // first parameter က event name, second parameter က action ဆိုပါတော့
//   io.emit("firstEvent", "Hello this is test!")
