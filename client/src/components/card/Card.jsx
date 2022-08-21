import React, { useState, useEffect } from 'react'
import './card.css'
import Heart from '../../img/heart.svg'
import Comment from '../../img/comment.svg'
import Share from '../../img/share.svg'
import Info from '../../img/info.svg'
import HeartFilled from '../../img/heartFilled.svg'
import Save from '../../img/save.svg'
import Send from '../../img/send.png'
import { Posts } from '../../data.js'


const Card = ({ post, socket, user }) => {
    const [like, setLike] = useState(false)
    const [openComment, setOpenComment] = useState(false)
    const [commentText, setCommentText] = useState('')

    // const [notifications, setNotifications] = useState([])

    // useEffect(() => {
    //     socket.off("getNotification").on("getNotification", (data) => {
    //         setNotifications((prev) => [...prev, data.commentText])
    //     })
    // }, [socket])

    // console.log(notifications);



    const handleNotification = (type) => {
        type === 1 && setLike(true)

        let userImg = Posts.find((post) => {
            return post.username === user
        }).userImg

        if (like !== true || (type === 2 && commentText.length > 0) || type === 3) {
            socket.emit("sendNotification", {
                senderName: user,
                receiverName: post.username,
                type,
                commentText,
                userImg
            });
        }
    }


    const handleComment = (e, userImg) => {
        handleNotification(2, userImg)
        setCommentText('')
    }
    console.log(commentText);

    return (
        <div className="card">
            <div className="info">
                <a href={post.profile}><img src={post.userImg} alt="user img" className="user-img" /></a>
                <span className="user-name">{post.fullname}</span>
                <img src={Info} alt="" className="card-icon info-icon" />
            </div>
            <img src={post.postImg} alt="" className="post-img" />
            <div className="interaction">
                <div className="like" onClick={() => handleNotification(1, post.userImg)} >
                    {like ? (<img src={HeartFilled} alt="" className="card-icon" />) :
                        (<img src={Heart} alt="" className="card-icon" />)}
                </div>

                <div className="comment-section">
                    <img src={Comment} alt="" className="card-icon" onClick={() => setOpenComment(p => !p)} />
                    {openComment &&
                        <div className="comment-box">

                            <input type="text" value={commentText} placeholder='Do comment on post...' onChange={(e) => setCommentText(e.target.value)} />

                            <button className='' onClick={(e) => handleComment(e)} ><img src={Send} alt="send" /></button>
                        </div>}
                </div>

                <img src={Share} alt="" className="card-icon" onClick={() => handleNotification(3, post.userImg)} />

                <a href={post.postImg} download="PostImg">
                    <img src={Save} alt="" className="card-icon info-icon" />
                </a>
            </div>
        </div>
    )
}
export default Card


// {notifications && <div className="comments">
//                                 {
//                                     notifications.map((comment) =>
//                                         <span>{comment}</span>
//                                     )
//                                 }
//                             </div>}