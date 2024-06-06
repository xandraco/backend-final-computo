class ProductInterface {
    static async createProduct(productData) {}
    static async getProduct(productId) {}
    static async updateProduct(productId, productData) {}
    static async deleteProduct(productId) {}
    static async getAllProducts() {}
}

module.exports = ProductInterface;
