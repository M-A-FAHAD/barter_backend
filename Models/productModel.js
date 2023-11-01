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
    location: {
        division: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        }
    },
    price: {
        type: Number,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    connectionReq: []

}, {
    timestamps: true
})
const PRODUCT = mongose.model('Products', ProductModel)
module.exports = {
    PRODUCT
}
