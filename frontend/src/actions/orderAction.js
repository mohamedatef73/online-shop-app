import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
} from "../constants/orderConstants"
import { logout } from "./userActions"

import axios from "axios"

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    //  dispatch({
    //    type: CART_CLEAR_ITEMS,
    //    payload: data,
    //  })
    //  localStorage.removeItem("cartItems")
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    //  const message =
    //    error.response && error.response.data.message
    //      ? error.response.data.message
    //      : error.message
    //  if (message === "Not authorized, token failed") {
    //    dispatch(logout())
    //  }
  }
}
