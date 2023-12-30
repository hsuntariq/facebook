const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_LINK);
    console.log(`database connected on host:${mongoose.connection.host.cyan}`);
}

module.exports = connectDB;