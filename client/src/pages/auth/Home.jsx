import { Col, Container, Form, Row } from 'react-bootstrap'
import LogForm from './LogForm'
import '../styles/authStyles.css'
import RegForm from './RegForm'
import { useEffect, useState } from 'react'
import { ClockLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const { user, isLoading, isError, message } = useSelector(state => state.auth);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/home')
        }
    }, [user, navigate])



    const showReg = () => {
        setShowForm(!showForm);
    }

    const makeDate = () => {
        let dates = [];
        let i = 1;
        while (i <= 31) {
            dates.push(i);
            i++;
        }
        return dates;
    }
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const makeYear = () => {
        const date = new Date();
        const years = [];
        let currentYear = date.getFullYear();
        let i = currentYear;
        while (i > 1905) {
            years.push(i);
            i--;
        }
        return years;
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
    }, [isError, message])


    if (isLoading) {

        return <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
            <ClockLoader color='#0D6EFD' />
        </div>

    }



    return (
        <>
            <Container style={{ height: '80vh' }} className='d-flex align-items-center justify-content-center'>

                <Row>
                    <Col lg={6}>
                        <img style={{
                            width: '300px',
                            marginLeft: '-4%'
                        }} src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="" />
                        <p className="fs-3">
                            Facebook helps you connect and share with the people in your life.
                        </p>
                    </Col>
                    <Col lg={6}>
                        <LogForm show={showReg} />
                    </Col>
                </Row>
            </Container>

            <RegForm show={showReg} showForm={showForm} makeDate={makeDate} makeYear={makeYear} months={months} />
        </>
    )
}

export default Home