import mongoose, { ConnectionOptions } from "mongoose"; 
import config from "./config/config"; 
import { connect } from "mongodb";

const dbOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}; 

mongoose.connect(config.DB.URI, dbOptions); 

const connection = mongoose.connection; 

connection.once('open', () => {
    console.log("Mongodb connection established");
});

connection.on('error', (err) => {
    console.log(err);
    process.exit(0);
});