import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
} from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { logout } from "../actions/userActions"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const history = useHistory()

  const logoutHandler = () => {
    dispatch(logout("login"))
  }

  useEffect(() => {
    if (logoutHandler) {
      history.push("/")
    }
  }, [history])

  const userAcc = userInfo ? (
    <NavDropdown title={userInfo.name} id="username">
      <LinkContainer to="/profile">
        <NavDropdown.Item> Profile </NavDropdown.Item>
      </LinkContainer>

      <NavDropdown.Item onClick={logoutHandler}>
        {" "}
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  ) : (
    <LinkContainer to="/login">
      <Nav.Link>
        <i className="fas fa-user"></i>Sign In
      </Nav.Link>
    </LinkContainer>
  )

  const userProfile = userInfo ? (
    <Link to="#">
      <img className="profile" src="https://s.gravatar.com/avatar/" />
    </Link>
  ) : null

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>

              <Form>{userAcc}</Form>
              <Form>{userProfile}</Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
