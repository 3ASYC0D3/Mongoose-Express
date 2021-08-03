const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true})
    .then(() => {
        console.log('connected')
    })
    .catch(()=> {
        console.log('connection err')
    });

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price:  1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit' 
    },
    {
        name: 'Organic Celery',
        price: 3.99,
        category: 'vegetable' 
    },
    {
        name: 'Watermelon',
        price: 2.99,
        category: 'fruit' 
    },
    {
        name: 'Whole Milk',
        price: 2.59,
        category: 'diary' 
    },
]

// Product.insertMany(seedProducts)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e => {
//             console.log(e)
//         })
//     })

// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log('Err', e)
//     })