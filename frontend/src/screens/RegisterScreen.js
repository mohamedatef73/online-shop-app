import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import FormContainer from '../component/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { register } from '../actions/userActions'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


const LoginScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)

    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            Swal.fire({
                    title: 'Error!',
                    text: 'password dose not match !!',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })

        } else {
            dispatch(register(name, email, password))

        }
    }


    const errMessage = error ? (<Message variant='warning'>{error}</Message>) : null
    const loadData = loading ? (<Loader />) : null


    return (
        <FormContainer>
            <h1>Sign Up</h1>

            {errMessage}
            {loadData}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>name </Form.Label>
                    <Form.Control
                        placeholder='please type your name'
                        value={name} type='name'
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

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

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>confirm Password </Form.Label>
                    <Form.Control placeholder='please confirm your password'
                        value={confirmPassword} type='password'
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Button variant='primary' type='submit'> Sign up </Button>

            </Form>


            <Row className='py-3'>
                <Col>
                    Have An Account?
                <Link to={redirect ? `/login?redirect=${redirect}`
                        : '/login'}>Login</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen


