import './App.css';
import {useState , useEffect} from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:5011");
const userName = nanoid(4);

function App(){
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);
  
  const SendChat = (e) => {
    e.preventDefault();
    socket.emit("chat" , {msg , userName});
    setMsg("");
  }
    
  useEffect(() => {
    socket.on("chat" ,(payload)=>{
      setChat([...chat , payload]);
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty App</h1>
        <form onSubmit={SendChat}>
          {chat.map((payload , index)=>{
             return(
                  <p key={index}>{payload.msg}
                  <span> id : {payload.userName}</span>
                  </p>
                )
          })}

          <input type="text" name="chat" placeholder="sendtext" value={msg} onChange={(e)=>{
            setMsg(e.target.value)
          }} />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
