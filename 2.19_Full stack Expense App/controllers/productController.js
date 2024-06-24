const { Product } = require('../models/index');

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Product.update(req.body, { where: { id: productId } });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.destroy({ where: { id: productId } });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
};
