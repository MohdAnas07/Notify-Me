import React from 'react'
import './nav.css'
import message from '../../img/message.svg'
import settings from '../../img/settings.svg'
import Notification from '../../img/notification.jsx'
import { useEffect, useState } from 'react'

const Navbar = ({ socket }) => {

    const [notifications, setNotifications] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        socket.off("getNotification").on("getNotification", (data) => {
            setNotifications((prev) => [...prev, data])
        })
    }, [socket])

    console.log(notifications);

    const displayNotifications = ({ senderName, type, commentText, userImg }) => {
        let action;
        if (type === 1) {
            action = 'liked'
        } else if (type === 2) {
            action = `comment "${commentText}" on`
        } else {
            action = 'shared'
        }

        return (
            <div className='notification-content'>
                <img className='notification-userImg' src={userImg} alt="userImg" />
                <span className="notification"> <span className='notification-user'>{senderName}</span> {`${action} your post`} </span>
            </div>
        )
    }

    const seenNotifications = () => {
        setNotifications([])
        setOpen(false)
    }

    return (
        <div className='navbar'>
            <div className="logo">Notify Me</div>
            <div className="icons">
                <div className="icon">
                    <Notification open={open} setOpen={setOpen} />
                    {notifications.length > 0 && <div className="counter">{notifications.length}</div>}
                </div>

                <div className="icon">
                    <img src={message} alt="" className="imgIcon" />
                </div>
                <div className="icon">
                    <img src={settings} alt="" className="imgIcon" />
                </div>
            </div>

            {notifications.length > 0 && open && <div className="notifications">
                {notifications.map(n => displayNotifications(n))}
                <button className="nButton" onClick={seenNotifications}>mark as read</button>
            </div>}

        </div>
    )
}

export default Navbar
