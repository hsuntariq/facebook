import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { reset, resetMail } from '../../../features/auth/authSlice'
import { toast } from 'react-toastify'
const Email = () => {
    const [email, setEmail] = useState('')
    const { isError, isSuccess, message } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            toast.success(message)
        }
        dispatch(reset())
    }, [isError, isSuccess, dispatch])
    const sendMail = () => {
        dispatch(resetMail({ email }))
        setEmail('')
    }
    return (
        <>
            <Container className='d-flex justify-content-center align-items-center' style={{
                height: '80vh'
            }}>

                <Container className='col-lg-5 mx-auto shadow p-5'>
                    <Form>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your registered email address...' />
                        <Button onClick={sendMail} className='my-2 w-100' variant="primary">
                            Send Recovery Email
                        </Button>
                    </Form>
                </Container>
            </Container>
        </>
    )
}

export default Email