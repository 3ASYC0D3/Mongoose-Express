const port = 3000;
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs');
const methodOverride = require('method-override');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true})
    .then(() => {
        console.log('connected')
    })
    .catch(()=> {
        console.log('connection err')
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.listen(port);

const categories = ['fruit', 'vegetable', 'diary']

app.get('/products', async (req, res) => {
    let { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        category = 'All';
        const products = await Product.find({})
        res.render('products/index', { products, category }) 
    }     
});

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })
    res.redirect(`/products/${newProduct.id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', {product, categories} )
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product.id}`)
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});



