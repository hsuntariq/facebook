import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostData, getPostLikes, reset, sharedPost } from '../../features/post/postSlice';
import 'react-loading-skeleton/dist/skeleton.css'
import { Card } from 'react-bootstrap';
import Loader from './Loader';
import { getUserData } from '../../features/auth/authSlice';
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
const Posts = ({ caption, image }) => {
    const dispatch = useDispatch();
    const { allUsers, isLoading, user } = useSelector(state => state.auth)
    const { posts, postLoading, postImages, postSuccess, shared } = useSelector(state => state.caption)
    useEffect(() => {
        dispatch(getUserData())
        dispatch(getPostData())

    }, [postImages])

    useEffect(() => {
        if (shared) {
            toast.success('Shared Post Successfull!!!')
        }

        dispatch(reset())
    }, [shared])

    if (postLoading && isLoading) {
        return <Loader />
    }

    const updateLikes = (u_id, p_id) => {
        const likeData = {
            user_id: u_id, post_id: p_id
        }
        dispatch(getPostLikes(likeData))
    }



    const sharePost = (user_id, caption, image) => {
        const data = {
            user_id, caption, image
        }

        dispatch(sharedPost(data))
    }

    return (
        <>
            {posts.map((post) => {
                const userData = allUsers.find((user) => {
                    return user?._id === post?.user
                })
                return (
                    <>
                        <Card key={post?._id} className='my-2'>
                            <Card.Header>
                                <div className="d-flex gap-4 align-items-center">
                                    <div className="img">
                                        <img style={{ borderRadius: '50%' }} height={70} width={70} src={userData?.image ? userData?.image : 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'} />
                                    </div>
                                    <div className="user-data">
                                        <h5>{userData?.f_name}</h5>
                                        <p className="text-secondary">
                                            {
                                                new Date(post?.createdAt).toLocaleTimeString('en-US', {
                                                    hour12: true,
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                })
                                            }
                                        </p>
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Link to={`/single-post/${post?._id}`}>
                                    <img width={'100%'} height={'400px'} style={{
                                        objectFit: 'contain'
                                    }} src={post?.image} alt="" />
                                </Link>

                            </Card.Body>
                            <div className="d-flex">
                                <p className="text-secondary ms-4">
                                    {post?.likes.length} likes
                                </p>
                            </div>
                            <div className="row p-0 m-0 text-center">
                                {
                                    post?.likes?.includes(user?._id) ? (<div onClick={() => updateLikes(user?._id, post?._id)} className="col-4 border p-2"><BsFillHeartFill color='red' size={30} /></div>) : (
                                        <div onClick={() => updateLikes(user?._id, post?._id)} className="col-4 border p-2"><FaRegHeart size={30} /></div>
                                    )
                                }
                                <div className="col-4 border p-2"><FaRegCommentDots size={30} /></div>
                                <div onClick={() => sharePost(user?._id, caption, post?.image)} className="col-4 border p-2"><RiShareForwardLine size={30} /></div>
                            </div>
                        </Card>
                    </>
                )
            })}
        </>
    )
}

export default Posts