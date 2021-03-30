import asyncHandler from 'express-async-handler'
import Product from '../models/orderModel.js'

// get the API products to homeScreen
const getProducts = asyncHandler(async (req,res)=>{
    const products = await Product.find({})

    res.json(products)
})

// get the API products:id to productScreen

const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }

})


export {
    getProducts,
    getProductById
}



