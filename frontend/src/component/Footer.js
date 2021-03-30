import React from 'react'
import {Container, Col, Row} from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        CopyRight &copy; Online Shop
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
