import React from "react"
import { Container } from "react-bootstrap"
import Header from "./component/Header"
import Footer from "./component/Footer"
import HomeScreen from "./screens/HomeScreen"
import { BrowserRouter as Router, Route } from "react-router-dom"
import ProducScreen from "./screens/ProducScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProducScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route
            ShippingScreen
            path="/shipping"
            component={ShippingScreen}
          />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
