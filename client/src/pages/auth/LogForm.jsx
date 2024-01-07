import React from 'react'
import { Button, Form } from 'react-bootstrap'

const LogForm = ({ show }) => {
    return (
        <>
            <Form className='col-lg-8 mx-auto p-4 bg-white shadow rounded-3'>
                <Form.Control className='my-2' type='text' placeholder='Email address or phone number' />
                <Form.Control className='my-2' type='password' placeholder='password' />
                <Button className='w-100 fw-bold p-2'>
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