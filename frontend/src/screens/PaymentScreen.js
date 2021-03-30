import React, { useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
import FormContainer from "../component/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import { savePaymentMethod } from "../actions/cartAction"
import CheckOutScreen from "./CheckOutScreen"

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push("/shipping")
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeorder")
  }
  return (
    <FormContainer>
      <CheckOutScreen step1 step2 step3 />
      <h1>Pyment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PyPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type="radio"
              label="Strip"
              id="Strip"
              name="paymentMethod"
              value="Strip"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
