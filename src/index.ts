import app from "./app"; 
import "./database";
import { GracefulShutdownManager } from "@moebius/http-graceful-shutdown";

const server = app.listen(app.get('port'), () => {
    console.log("Server running on port", app.get('port'));
}); 

const shutdownManager = new GracefulShutdownManager(server);

process.on('SIGTERM', () => {
    shutdownManager.terminate(() => {
    console.log('Server is gracefully terminated');
    });
});