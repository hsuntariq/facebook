import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../timeline/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getSinglePostData } from '../../features/post/postSlice'
import { Card } from 'react-bootstrap'
import Likes from './Likes'
const SinglePost = () => {
    const { id } = useParams()
    const { allUsers } = useSelector(state => state.auth)
    const { posts, postLoading } = useSelector(state => state.caption)
    const [open, setOpen] = useState(false)


    return (
        <>
            <div className="col-lg-6 mx-auto">
                {posts?.map((post) => {
                    const likes = post?.likes?.map((like) => {
                        const users = allUsers.find((user) => {
                            return user?._id === like
                        })
                        return users
                    })



                    if (post?._id === id) {
                        return (

                            <>
                                <Card key={post?._id} className='my-2 position-relative'>
                                    <Likes likes={likes} open={open} setOpen={setOpen} />
                                    <Card.Body>

                                        <img width={'100%'} height={'400px'} style={{
                                            objectFit: 'contain'
                                        }} src={post?.image} alt="" />

                                    </Card.Body>
                                    <div className="d-flex">
                                        <p onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="text-secondary ms-4">
                                            {post?.likes.length} likes
                                        </p>
                                    </div>
                                    {/* <div className="row p-0 m-0 text-center">
                                        {
                                            post?.likes?.includes(user?._id) ? (<div onClick={() => updateLikes(user?._id, post?._id)} className="col-4 border p-2"><BsFillHeartFill color='red' size={30} /></div>) : (
                                                <div onClick={() => updateLikes(user?._id, post?._id)} className="col-4 border p-2"><FaRegHeart size={30} /></div>
                                            )
                                        }
                                        <div className="col-4 border p-2"><FaRegCommentDots size={30} /></div>
                                        <div className="col-4 border p-2"><RiShareForwardLine size={30} /></div>
                                    </div> */}
                                </Card>
                            </>
                        )
                    }
                })}
            </div>
        </>
    )
}

export default SinglePost