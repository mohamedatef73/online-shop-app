import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import FormContainer from '../component/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { login } from '../actions/userActions'
import { Link } from 'react-router-dom'
// import SweetAlert from 'sweetalert2-react';



const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    const errMessage = error ? (<Message variant='danger'>{error}</Message>) : null

    // const errMessage = error ?
    //     (
    //         <div>
    //             <SweetAlert
    //                 show={`error`}
    //             >
    //             </SweetAlert>
    //         </div>)
    //     : null

    const loadData = loading ? (<Loader />) : null

    return (
        <FormContainer>
            <h1>Sign In</h1>

            {errMessage}
            {loadData}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        placeholder='please type your email'
                        value={email} type='email'
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label> Password </Form.Label>
                    <Form.Control placeholder='please enter your password'
                        value={password} type='password'
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button variant='primary' type='submit'>Login</Button>

            </Form>


            <Row className='py-3'>
                <Col>
                    New User?
                <Link to={redirect ? `/register?redirect=${redirect}`
                        : '/register'}>Register</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen


