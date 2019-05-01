const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MOONGODB_URI);

module.exports = {
    mongoose
}