import './App.css';
// import Login from './components/Login';
import React, { useState, useEffect } from 'react'
import Navbar from './components/nav/Navbar'
import Card from './components/card/Card'
import { Posts } from './data'
import { io } from "socket.io-client";

function App() {

  const [user, setUser] = useState('')
  const [username, setUsername] = useState('');
  const [socket, setSocket] = useState(null)


  useEffect(() => {
    setSocket(io("http://localhost:5000"))
  }, [])


  useEffect(() => {
    socket?.emit("newUser", user)
  }, [socket, user])

  user && localStorage.setItem('username', user)

  return (
    <div className="App-container">
      {
        user ? (
          <div className='app-content'>
            <Navbar username={username} socket={socket} />

            <div className="content">
              {Posts && Posts.map((post, index) =>
                <Card key={post.id} post={post} socket={socket} user={user} />
              )}
              <span className='username'> {user} </span></div>
          </div>
        )
          : (
            <div className='login'>
              <div className="container">
                <h1>Notify Me</h1>
                <div className="login-container">
                  <input type="text" placeholder='Enter username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                  <button onClick={() => setUser(username)}>Login</button></div>
              </div>
            </div>
          )
      }
    </div>
  );
}

export default App;
