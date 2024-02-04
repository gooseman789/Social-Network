const { connect, connection } = require('mongoose')

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB'

connect(connectionString)

connection.once('open', () => {
    console.log('Connected to MongoDB');
});

connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

module.exports = connection