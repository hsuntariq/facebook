import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostData } from '../../features/post/postSlice';
import 'react-loading-skeleton/dist/skeleton.css'
import { Card } from 'react-bootstrap';
import Loader from './Loader';
import { getUserData } from '../../features/auth/authSlice';
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";

const Posts = () => {
    const dispatch = useDispatch();
    const { allUsers, isLoading } = useSelector(state => state.auth)
    const { posts, postLoading, postImages } = useSelector(state => state.caption)
    useEffect(() => {
        dispatch(getUserData())
        dispatch(getPostData())
    }, [postImages])

    if (postLoading && isLoading) {
        return <Loader />
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
                                    </div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <img width={'100%'} height={'400px'} style={{
                                    objectFit: 'contain'
                                }} src={post?.image} alt="" />
                            </Card.Body>
                            <div className="row p-0 m-0 text-center">
                                <div className="col-4 border p-2"><FaRegHeart size={30} /></div>
                                <div className="col-4 border p-2"><FaRegCommentDots size={30} /></div>
                                <div className="col-4 border p-2"><RiShareForwardLine size={30} /></div>
                            </div>
                        </Card>
                    </>
                )
            })}
        </>
    )
}

export default Posts