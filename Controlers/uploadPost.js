const { PRODUCT } = require('../Models/productModel');

const uploadPost = async (req, res) => {
    const { name, title, description, divition, city, price, image, owner, category, phoneNumber } = req.body;

    console.log("This is post details", divition);

    try {
        if (!name) {
            return res.status(400).json({ error: 'All fields are required' });
        } else {
            await PRODUCT.create({
                name: name,
                title: title,
                category: category,
                description: description,
                location: {
                    divition: divition,
                    city: city
                },
                price: price,
                image: image,
                owner: owner,
                contact: phoneNumber,
                connectionReq: []
            });
            console.log('This is post detals')
            return res.status(201).json({ success: 'Post uploaded successfully' });
        }
    } catch (err) {
        console.error('Error in uploadPost:err');
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    uploadPost
};
