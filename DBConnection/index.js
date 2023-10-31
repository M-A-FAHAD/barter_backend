const mongoose = require('mongoose');

DBConnection = async (url) => {
    mongoose.connect(url)
}

module.exports = { DBConnection }