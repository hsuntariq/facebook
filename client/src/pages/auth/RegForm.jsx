import { Form } from "react-bootstrap"

const RegForm = ({ makeDate, makeYear, months, showForm }) => {
    return (
        <>
            {showForm &&
                <div className="reg-form d-flex justify-content-center align-items-center">
                    <Form className='bg-white shadow p-3 col-lg-3 mx-auto'>
                        <h4>Sign Up</h4>
                        <p className="text-secondary">
                            It's quick and easy
                        </p>
                        <hr />
                        <div className="d-flex gap-2">
                            <Form.Control className='my-2' type='text' placeholder='First name' />
                            <Form.Control className='my-2' type='text' placeholder='Surname' />
                        </div>
                        <Form.Control className='mb-2' type='text' placeholder='Mobile Number or email address' />
                        <Form.Control className='my-2' type='text' placeholder='New password' />
                        <label htmlFor="">Date of Birth</label>
                        <div className="d-flex gap-2">

                            <Form.Select>
                                {makeDate().map((date) => {
                                    return <option key={date}>{date}</option>
                                })}
                            </Form.Select>
                            <Form.Select>
                                {months.map((month) => {
                                    return <option key={month}>{month}</option>
                                })}
                            </Form.Select>
                            <Form.Select>
                                {makeYear().map((year) => {
                                    return <option key={year}>{year}</option>
                                })}
                            </Form.Select>

                        </div>
                        <div className="d-flex justify-content-between align-items-center gap-2 my-2">

                            <div className="d-flex align-items-center w-50 border p-2 justify-content-between ">
                                <label htmlFor="">Female</label>
                                <input type="radio" name='gender' className='form-check align-self-center' />
                            </div>
                            <div className="d-flex align-items-center w-50 border p-2 justify-content-between ">
                                <label htmlFor="">Male</label>
                                <input type="radio" name='gender' className='form-check align-self-center' />
                            </div>

                        </div>
                        <p className='text-secondary' style={{ fontSize: '0.8rem' }}>People who use our service may have uploaded your contact information to Facebook. Learn more.</p>
                        <p className='text-secondary' style={{ fontSize: '0.8rem' }}>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p>
                    </Form>
                </div>
            }

        </>

    )
}

export default RegForm