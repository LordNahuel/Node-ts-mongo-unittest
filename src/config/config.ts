export default {
    jwtsecret: process.env.JWT_TOKEN || 'somesecrettoken', 
    DB: {
        URI: process.env.MONGO_URI || 'mongodb://localhost/node-ts-jwt', 
        USER: process.env.MONGODB_USER, 
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}