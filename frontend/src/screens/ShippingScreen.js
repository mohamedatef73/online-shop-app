import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import FormContainer from "../component/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from "../actions/cartAction"
import CheckOutScreen from "./CheckOutScreen"

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode
  )
  const [country, setContry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({ address, city, postalCode, country })
    )
    history.push("/payment")
  }
  return (
    <FormContainer>
      <CheckOutScreen step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>address </Form.Label>
          <Form.Control
            placeholder="please type your name"
            value={address}
            type="text"
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>city Address</Form.Label>
          <Form.Control
            placeholder="your City"
            value={city}
            type="text"
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            placeholder="please type your email"
            value={postalCode}
            type="text"
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>country</Form.Label>
          <Form.Control
            placeholder="please type your country"
            value={country}
            type="text"
            onChange={(e) => setContry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
