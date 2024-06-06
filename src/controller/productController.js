const Product = require('../models/productModel');

const createProduct = async (req, res) => {
    const { name, description } = req.body;
    const productData = { name, description };
    
    try {
        const newProduct = await Product.createProduct(productData);
        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const getProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.getProduct(productId);
        if (product) {
            res.status(200).json({
                message: 'success',
                product
            });
        } else {
            res.status(404).json({
                message: 'Product not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description } = req.body;
    const productData = { name, description };

    try {
        const updatedProduct = await Product.updateProduct(productId, productData);
        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        await Product.deleteProduct(productId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.status(200).json({
            message: 'success',
            products
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

module.exports = { createProduct, getProduct, updateProduct, deleteProduct, getAllProducts };
