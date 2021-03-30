import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../component/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { ProductDetails } from '../actions/productActions'
import Loader from '../component/Loader'
import Message from '../component/Message'

const ProducScreen = ({ history,match }) => {

    const [pieces, setPieces] = useState(1)

    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(ProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?pieces=${pieces}`)
    }

    let beforeContent = null
    if(loading){
        beforeContent = <Loader />
    }else if (error){
        beforeContent = <Message variant='danger'>{error}</Message>
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Back to</Link>

            {beforeContent ? beforeContent :
                (
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />

                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush' >
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating}
                                        text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    description {product.description}
                                </ListGroup.Item>
                            </ListGroup>

                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>

                                        <Row>
                                            <Col>Status</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                                            </Col>
                                        </Row>
                                        </ListGroup.Item>

                                   
                                        <ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>

                                                    <Form.Control as='select' value={pieces} onChange={(e) => setPieces(e.target.value)}>
                                                       {  [...Array(Number(product.countInStock)).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))}


                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        
                                    )}
                                    </ListGroup.Item>


                                    <ListGroup.Item>
                                        <Button onClick={addToCartHandler}
                                         className='btn-block' type='button'
                                            disabled={product.countInStock === '0'}>
                                            Add to Cart
                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )}
        </>
    )
}

export default ProducScreen