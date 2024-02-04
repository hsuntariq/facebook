import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosSend } from "react-icons/io";
import { postData, postImage, reset } from '../../features/post/postSlice';
import { SyncLoader } from 'react-spinners'
import { BiImages } from "react-icons/bi";
import Posts from './Posts';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
const Timeline = () => {
    const [images, setImages] = useState([]);
    const [load, setLoad] = useState(false)
    const [imagePreviews, setImagePreviews] = useState([]);
    const [imageLoading, setImageLoading] = useState(false)
    const { user } = useSelector(state => state.auth);
    const { postLoading, postSuccess } = useSelector(state => state.caption)
    const [caption, setCaption] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        if (postSuccess) {
            setImagePreviews([])
        }
        dispatch(reset())
    }, [postSuccess])
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
        const file = e.target.files;
        const files = Array.from(file);
        setImagePreviews(files);
    }

    // username:dyxoufsb0
    // preset: xola95pc


    const uploadMultipleImages = async () => {

        const promises = imagePreviews.map(async (img) => {
            try {

                setLoad(true)
                const data = new FormData();
                data.append('file', img);
                data.append('upload_preset', 'xola95pc');
                const res = await fetch('https://api.cloudinary.com/v1_1/dyxoufsb0/image/upload', {
                    method: "POST",
                    body: data
                })

                const imageData = await res.json();
                setLoad(false)
                return imageData.url;
            }
            catch (error) {
                console.log(error)
            }
        })

        try {
            const imageURls = await Promise.all(promises);
            return imageURls
        } catch (error) {
            console.log(error)
        }


    }



    const handleClick = async () => {

        const URLs = await uploadMultipleImages(imagePreviews)

        URLs.map((img) => {
            const postData = {
                caption, image: img, user: user?._id
            }
            dispatch(postImage(postData))
        })


    }

    if (postLoading && load) {
        return <>
            <Skeleton height={20} width={200} />
            <Skeleton width={30} height={20} />
        </>
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
                        <input multiple type="file" onChange={handleImageChange} className='position-absolute' style={{
                            opacity: '0',
                            cursor: 'pointer'
                        }} name="" id="" />
                        <BiImages cursor='pointer' color='#41BE5E' size={40} />
                        <h5>Photo/Video</h5>
                    </div>
                    {imagePreviews.length > 0 && <div className="d-flex">
                        {imagePreviews.map((image) => {
                            return (
                                <>
                                    <div className="col-3">
                                        <div className="card p-2">
                                            <img width={'100%'} height={200} src={
                                                URL.createObjectURL(image)
                                            } alt="" />
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                    </div>}


                    <Button onClick={handleClick} variant="success">
                        {imageLoading ? <SyncLoader color='#0266FF' /> : 'Upload '}
                    </Button>
                </Card.Body>}

            </Card>
            <Posts caption={caption} images={images} />
        </>
    )
}

export default Timeline