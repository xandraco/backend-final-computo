const admin = require('../config/firebase');
const firestore = admin.firestore();
const ProductInterface = require('../interfaces/productInterface');

class Product extends ProductInterface {
    constructor(id, data) {
        super();
        this.id = id;
        this.data = data;
    }

    static async createProduct(productData) {
        try {
            const productRef = await firestore.collection('products').add(productData);
            return new Product(productRef.id, productData);
        } catch (error) {
            console.error('Error creating product: ', error);
            throw error;
        }
    }

    static async getProduct(productId) {
        try {
            const productDoc = await firestore.collection('products').doc(productId).get();
            if (productDoc.exists) {
                return new Product(productId, productDoc.data());
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting product: ', error);
            throw error;
        }
    }

    static async updateProduct(productId, productData) {
        try {
            const productRef = firestore.collection('products').doc(productId);
            await productRef.update(productData);
            return new Product(productId, productData);
        } catch (error) {
            console.error('Error updating product: ', error);
            throw error;
        }
    }

    static async deleteProduct(productId) {
        try {
            const productRef = firestore.collection('products').doc(productId);
            await productRef.delete();
        } catch (error) {
            console.error('Error deleting product: ', error);
            throw error;
        }
    }

    static async getAllProducts() {
        try {
            const productsSnapshot = await firestore.collection('products').get();
            const products = [];
            productsSnapshot.forEach(doc => {
                products.push(new Product(doc.id, doc.data()));
            });
            return products;
        } catch (error) {
            console.error('Error getting all products: ', error);
            throw error;
        }
    }
}

module.exports = Product;
