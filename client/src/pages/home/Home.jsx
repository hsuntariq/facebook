import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import { Col, Row } from 'react-bootstrap'
import Sidebar from '../../components/sidebar/Sidebar'
import Timeline from '../../components/timeline/Timeline'

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
            <Row>
                <Col xl={3}>
                    <Sidebar />
                </Col>
                <Col xl={6}>
                    <Timeline />
                </Col>
            </Row>
        </>

    )
}

export default Home