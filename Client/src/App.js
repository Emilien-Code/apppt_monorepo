import { io } from "socket.io-client";
import "./asset/styles/utils/root.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Channel from "./pages/Channel.jsx";
import Home from "./pages/Home.jsx";

//👇🏻 http://localhost:4000 is where the server host URL.
const socket = io.connect("localhost:4000");
// const socket = io.connect("http://localhost:4000");

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home socket={socket}/>} />
                <Route path='/channel/:id' element={<Channel socket={socket} />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
