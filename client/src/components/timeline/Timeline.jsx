import React, { useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosSend } from "react-icons/io";
import { postData } from '../../features/post/postSlice';
import { SyncLoader } from 'react-spinners'
const Timeline = () => {
    const { user } = useSelector(state => state.auth);
    const { postLoading } = useSelector(state => state.caption)
    const [caption, setCaption] = useState('')
    const dispatch = useDispatch()
    const postCaption = (e) => {
        e.preventDefault();
        const data = {
            user_id: user?._id, caption: caption
        }
        dispatch(postData(data))
    }

    return (
        <>
            <Card>
                <Card.Header className='d-flex align-items-center gap-4'>
                    <img width={'50px'} height={'50px'} className='rounded-circle' src="https://4.bp.blogspot.com/-23zvGymeTyA/XhV9fNzozsI/AAAAAAAAL2E/Gru5mTIARdAoiO4wVFAVOqv6K916UP89QCLcBGAsYHQ/s1600/Facebook-new-design.jpg" alt="" />

                    <Form className='w-100 d-flex align-items-center'>
                        <Form.Control value={caption} onChange={(e) => setCaption(e.target.value)} type='text' className='w-100 rounded-pill' placeholder={`What's on your mind ${user?.f_name}?`} />
                        {postLoading ? (<SyncLoader />) : (<IoIosSend onClick={postCaption} cursor='pointer' />)}

                    </Form>
                </Card.Header>
            </Card>
        </>
    )
}

export default Timeline