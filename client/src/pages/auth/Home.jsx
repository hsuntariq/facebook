import { Col, Container, Form, Row } from 'react-bootstrap'
import LogForm from './LogForm'
import '../styles/authStyles.css'
import RegForm from './RegForm'
import { useState } from 'react'
const Home = () => {
    const [showForm, setShowForm] = useState(false);
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
                        <LogForm />
                    </Col>
                </Row>
            </Container>

            <RegForm showForm={showForm} makeDate={makeDate} makeYear={makeYear} months={months} />
        </>
    )
}

export default Home