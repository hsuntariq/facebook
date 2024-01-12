import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap"
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { ClockLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const RegForm = ({ show, makeDate, makeYear, months, showForm }) => {


    // navigate
    const navigate = useNavigate()


    // khali btana ha k konsa function chalana ha=>useDispatch()
    const dispatch = useDispatch()
    // state maise chezain utha k lao => useSelector()
    const { isSuccess, isError, isLoading, user, message } = useSelector(state => state.auth);


    // check if user is registerd successfully

    useEffect(() => {
        if (isSuccess) {
            navigate('/home')
        }

        dispatch(reset())

    }, [isSuccess, dispatch, navigate])






    const [formFields, setFormFields] = useState({
        f_name: '', l_name: '', m_mail: '', password: '', date: '19', month: 'Jan', year: '2024', gender: ''
    });


    // destructure the fields
    const { f_name, l_name, m_mail, password, date, month, year, gender } = formFields;

    // get the onChange={handleChange} values that user types
    const handleChange = (e) => {
        setFormFields((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value
        }))
    }

    // merge date,month,year in a single state
    const [DOB, setDOB] = useState('19-jan-2021');

    // update value when date,day or month changes

    useEffect(() => {
        setDOB(`${date}-${month}-${year}`)
    }, [date, month, year])




    const handleClick = (e) => {
        e.preventDefault()
        if (!f_name || !l_name || !m_mail || !password || !date || !month || !year || !gender) {
            toast.error('Please enter all the fields')
        } else {
            const data = {
                f_name, l_name, m_mail, password, DOB, gender
            }
            dispatch(registerUser(data))
        }
    }






    return (
        <>
            {showForm &&
                <div className="reg-form d-flex justify-content-center align-items-center">

                    <Form className='bg-white shadow p-3 col-xl-3 col-lg-6 mx-auto'>
                        <RxCross1 onClick={show} className="d-block ms-auto" size={20} cursor="pointer" />
                        <h4>Sign Up</h4>
                        <p className="text-secondary">
                            It's quick and easy
                        </p>
                        <hr />
                        <div className="d-flex gap-2">
                            <Form.Control name="f_name" onChange={handleChange} value={f_name} className='my-2' type='text' placeholder='First name' />
                            <Form.Control name="l_name" onChange={handleChange} value={l_name} className='my-2' type='text' placeholder='Surname' />
                        </div>
                        <Form.Control name="m_mail" onChange={handleChange} value={m_mail} className='mb-2' type='text' placeholder='Mobile Number or email address' />
                        <Form.Control name="password" onChange={handleChange} value={password} className='my-2' type='text' placeholder='New password' />

                        <label htmlFor="">Date of Birth</label>
                        <div className="d-flex gap-2">

                            <Form.Select name="date" onChange={handleChange} value={date}>
                                {makeDate().map((date) => {
                                    return <option key={date}>{date}</option>
                                })}
                            </Form.Select>
                            <Form.Select name="month" onChange={handleChange} value={month}>
                                {months.map((month) => {
                                    return <option key={month}>{month}</option>
                                })}
                            </Form.Select>
                            <Form.Select name="year" onChange={handleChange} value={year}>
                                {makeYear().map((year) => {
                                    return <option key={year}>{year}</option>
                                })}
                            </Form.Select>

                        </div>
                        <div className="d-flex justify-content-between align-items-center gap-2 my-2">

                            <div className="d-flex align-items-center w-50 border p-2 justify-content-between ">
                                <label htmlFor="">Female</label>
                                <input onChange={handleChange} value="female" type="radio" name='gender' className='form-check align-self-center' />
                            </div>
                            <div className="d-flex align-items-center w-50 border p-2 justify-content-between ">
                                <label htmlFor="">Male</label>
                                <input onChange={handleChange} value="male" type="radio" name='gender' className='form-check align-self-center' />
                            </div>

                        </div>
                        <p className='text-secondary' style={{ fontSize: '0.8rem' }}>People who use our service may have uploaded your contact information to Facebook. Learn more.</p>
                        <p className='text-secondary' style={{ fontSize: '0.8rem' }}>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.</p>
                        <Button onClick={handleClick} style={{ background: '#00A400' }} className="w-50 mx-auto d-block border-0">Sign Up</Button>
                    </Form>
                </div>
            }

        </>

    )
}

export default RegForm