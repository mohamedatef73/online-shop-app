import express from 'express'
import { getProductById, getProducts } from '../controllers/productController.js'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()


// router.route('/').get(getProducts)

// router.route('/:id').get(getProductById)

router.get(
    '/',
    asyncHandler(async(req,res)=>{
        const products = await Product.find({})

        res.json(products)
    })
)

router.get(
    '/:id',
    asyncHandler(async(req,res)=>{
        const product = await Product.findById(req.params.id)

        if(product){
            console.log(product)
            res.json(product)
        }else{
            res.status(404)
            throw new Error('Product not found')
        }
    })
)

export default router
