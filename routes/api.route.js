const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')

//initialize prisma client
const prisma = new PrismaClient();

router.get('/products', async(req, res, next) => {
    try {
        const products = await prisma.product.findMany({
            include: { category: true }
        });
        const categories = await prisma.category.findMany({
            include: { products: true }
        });
        res.json({ products, categories });
    } catch (error) {
        next(error);
    }
})
router.get('/products/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(product)
    } catch (error) {
        next(error)
    }
});

router.post('/products', async(req, res, next) => {
    try {
        const data = req.body;
        const product = await prisma.product.create({
            data
        });
        res.json(product);
    } catch (error) {
        next(error)
    }
});

router.delete('/products/:id', async(req, res, next) => {
    res.send({ message: 'Ok api is working 🚀' });
});

router.patch('/products/:id', async(req, res, next) => {
    res.send({ message: 'Ok api is working 🚀' });
});


module.exports = router;