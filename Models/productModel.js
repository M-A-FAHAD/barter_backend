const mongose = require('mongoose')

const ProductModel = mongose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        divition: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    connectionReq: []

}, {
    timestamps: true
})
const PRODUCT = mongose.model('Products', ProductModel)
module.exports = {
    PRODUCT
}
