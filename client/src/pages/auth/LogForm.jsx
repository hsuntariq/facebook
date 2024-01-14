import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { login } from '../../features/auth/authSlice'
const LogForm = ({ show }) => {
    const { isError, message } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState({
        m_mail: '', password: ''
    })
    // destructure
    const { m_mail, password } = formFields;

    const handleChange = (e) => {
        setFormFields((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }

    const handleLogin = (e) => {

        if (!m_mail || !password) {
            toast.error('Please enter the fields')
        } else {
            const userData = {
                m_mail, password
            }
            dispatch(login(userData))
        }

    }



    return (
        <>
            <Form className='col-lg-8 mx-auto p-4 bg-white shadow rounded-3'>
                <Form.Control onChange={handleChange} name='m_mail' value={m_mail} className='my-2' type='text' placeholder='Email address or phone number' />
                <Form.Control onChange={handleChange} name='password' value={password} className='my-2' type='password' placeholder='password' />
                <Button onClick={handleLogin} className='w-100 fw-bold p-2'>
                    Log In
                </Button>
                <a href="" className='text-primary text-decoration-none d-block mx-auto my-2 text-center'>Forgotten Password?</a>
                <hr />
                <Button onClick={show} style={{ background: '#36A420' }} className='border-0 fw-medium py-2 px-2 d-block mx-auto'>
                    Create New Account
                </Button>
            </Form>
        </>
    )
}

export default LogForm