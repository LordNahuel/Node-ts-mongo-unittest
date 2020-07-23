import app from "./app"; 
import "./database";
import { GracefulShutdownManager } from "@moebius/http-graceful-shutdown";

app.listen(app.get('port'), () => {
    console.log("Server running on port", app.get('port'));
}); 

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
  });

// https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357