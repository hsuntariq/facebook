import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

const Home = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <>
            <Header />
        </>

    )
}

export default Home