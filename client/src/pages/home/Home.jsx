import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
const Home = () => {
    const dispatch = useDispatch()
    return (
        <>
            <h1>Welcome to the home page</h1>
            <button onClick={dispatch(logout())}>Logout</button>
        </>

    )
}

export default Home