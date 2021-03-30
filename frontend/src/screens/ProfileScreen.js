import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { profileUser, updateProfileUser } from '../actions/userActions'
import Swal from 'sweetalert2'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { logout } from '../actions/userActions'






const LoginScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')



    const dispatch = useDispatch()

    const userProfile = useSelector(state => state.userProfile)

    const { loading, error, user } = userProfile

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)

    const { success } = userUpdateProfile





    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(profileUser('/profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [dispatch, history, userInfo, user, success])

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
            dispatch(updateProfileUser({
                id: user._id,
                name, email, password, success
            }
            ))

        }
    }

    const errMessage = error ? (<Message variant='danger'>{error}</Message>) : null
    const loadData = loading ? (<Loader />) : null
    const successMessage = success ? (<Message variant='success'>Profile Updated</Message>) : null


    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
        <Row>
            <Col md={6}>

                <h1>Profile User</h1>

                {errMessage}
                {loadData}
                {successMessage}


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


                    <Button variant='primary' type='submit'> Update </Button>

                </Form>
            </Col>


            <Col md={6}>
                <Form className='float-right'>
                    <h1>My Orders</h1>

                    <Button className='btn btn-secondary' onClick={logoutHandler}>
                        <h3>
                            Logout
                        </h3>
                    </Button>
                </Form>


            </Col>
        </Row>
    )
}

export default LoginScreen


