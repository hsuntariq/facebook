import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { reset, updatedPass } from '../../../features/auth/authSlice'
import { useNavigate, useParams } from 'react-router-dom'

const Reset = () => {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const { isError, isSuccess, message, isLoading } = useSelector(state => state.auth)
    const { token } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            toast.success(message)
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, dispatch])

    const handleClick = (e) => {
        e.preventDefault();

        if (password !== confirm) {
            toast.error('Password do not match')
        } else {
            const data = {
                token, password
            }

            dispatch(updatedPass(data))
        }

        setConfirm('')
        setPassword('')
    }

    return (
        <>
            <Container className='d-flex justify-content-center align-items-center' style={{
                height: '80vh'
            }}>

                <Container className='col-lg-5 mx-auto shadow p-5'>
                    <Form>
                        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} className='my-2 w-100' type="password" placeholder='Enter new password' />
                        <Form.Control value={confirm} onChange={(e) => setConfirm(e.target.value)} className=' w-100' type="password" placeholder='Confirm password' />
                        <Button onClick={handleClick} className='my-2 w-100' variant="primary">
                            Update Password
                        </Button>
                    </Form>
                </Container>
            </Container>
        </>
    )
}

export default Reset