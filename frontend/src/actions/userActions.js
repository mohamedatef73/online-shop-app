import axios from "axios"
import Swal from "sweetalert2"
import * as actions from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {

    try{
        dispatch({
            type:actions.USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/login',
        {email, password},
        config
        )

        dispatch({
            type: actions.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))

    }
    catch(error){
        dispatch({
            type: actions.USER_LOGIN_FAIL,

            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
}

export const register = (name, email, password) => async (dispatch) => {

    try{
        dispatch({
            type:actions.USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post('/api/users',
        {name,email, password},
        config
        )

        dispatch({
            type: actions.USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: actions.USER_LOGIN_SUCCESS,
            payload: data
        })


        localStorage.setItem('userInfo',JSON.stringify())

    }
    catch(error){
        dispatch({
            type: actions.USER_REGISTER_FAIL,

            payload: 
            error.response && error.response.data.message ?
            error.response.data.message : error.message


        })

        Swal.fire({
            title: 'Error!',
            text: error.response && error.response.data.message ?
            error.response.data.message : error.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }
}

export const profileUser = (id) => async (dispatch, getState) => {

    try{
        dispatch({
            type:actions.USER_DETAILS_REQUEST
        })

        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/${id}`,
        config
        )

        dispatch({
            type: actions.USER_DETAILS_SUCCESS,
            payload: data
        })

    }
    catch(error){
        dispatch({
            type: actions.USER_DETAILS_FAIL,

            payload: 
            error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
}


export const updateProfileUser = (user) => async (dispatch, getState) => {

    try{
        dispatch({
            type:actions.USER_UPDATE_PROFILE_REQUEST
        })

        const {
            userLogin : {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/profile`,
        user,
        config
        )

        dispatch({
            type: actions.USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: actions.USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }
    catch(error){
        const message =
        error.response && error.response.data.message ?
        error.response.data.message : error.message
            
            if(message === 'Not authorized, token failed'){
                dispatch(logout())
            }
    }
}




export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type : actions.USER_LOGOUT})
}
