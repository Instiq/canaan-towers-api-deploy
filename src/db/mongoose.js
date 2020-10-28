const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongoDB is connected to ${connect.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}


module.exports = connectDB

