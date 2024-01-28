import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosSend } from "react-icons/io";
import { postData, postImage } from '../../features/post/postSlice';
import { SyncLoader } from 'react-spinners'
import { BiImages } from "react-icons/bi";
import Posts from './Posts';
const Timeline = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageLoading, setImageLoading] = useState(false)
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
        if (!postLoading) {
            setCaption('')
        }
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImagePreview(url);
        setImage(file);
    }



    const uploadImage = async (e) => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'xola95pc');
        try {
            setImageLoading(true)
            const response = await fetch('https://api.cloudinary.com/v1_1/dyxoufsb0/image/upload', {
                method: 'POST',
                body: data
            })

            const imageData = await response.json();
            setImageLoading(false)
            return imageData.url
        } catch (error) {
            console.log(error)
        }


    }


    const handleClick = async () => {
        const imageURL = await uploadImage(image)
        const data = {
            user: user?._id, caption: caption, image: imageURL
        }



        dispatch(postImage(data))

        setImagePreview(null);
        setImage(null)

    }



    return (
        <>
            <Card>
                <Card.Header className='d-flex bg-white align-items-center gap-4'>
                    <img width={'50px'} height={'50px'} className='rounded-circle' src="https://4.bp.blogspot.com/-23zvGymeTyA/XhV9fNzozsI/AAAAAAAAL2E/Gru5mTIARdAoiO4wVFAVOqv6K916UP89QCLcBGAsYHQ/s1600/Facebook-new-design.jpg" alt="" />

                    <Form className='w-100 d-flex align-items-center'>
                        <Form.Control value={caption} onChange={(e) => setCaption(e.target.value)} type='text' className='w-100 bg-light rounded-pill' placeholder={`What's on your mind ${user?.f_name}?`} />
                        {postLoading ? (<SyncLoader />) : (<IoIosSend onClick={postCaption} cursor='pointer' />)}
                    </Form>
                </Card.Header>
                {postLoading ? <SyncLoader /> : <Card.Body>

                    <div className="d-flex align-items-center gap-2 position-relative">
                        <input type="file" onChange={handleImageChange} className='position-absolute' style={{
                            opacity: '0',
                            cursor: 'pointer'
                        }} name="" id="" />
                        <BiImages cursor='pointer' color='#41BE5E' size={40} />
                        <h5>Photo/Video</h5>
                    </div>
                    {imagePreview && <div className="image-preview">
                        <img width={'200px'} height={'200px'} style={{ objectFit: 'cover' }} src={imagePreview} alt="" />
                    </div>}

                    <Button onClick={handleClick} variant="success">
                        {imageLoading ? <SyncLoader color='#0266FF' /> : 'Upload '}
                    </Button>
                </Card.Body>}

            </Card>
            <Posts caption={caption} image={image} />
        </>
    )
}

export default Timeline