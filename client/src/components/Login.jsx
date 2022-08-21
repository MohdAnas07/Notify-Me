import React from 'react'

export default function Login({
    setUser,
    setUsername,
    username,
}) {

    // console.log(username)

    return (
        <div className='login'>
            <div className="container">
                <input type="text" placeholder='Enter username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <button onClick={() => setUser(username)}>Login</button>
            </div>
        </div>
    )
}
