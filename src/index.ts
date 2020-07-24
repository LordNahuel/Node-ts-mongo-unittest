import app from "./app"; 
import "./database";

// Start listening app
app.listen(app.get('port'), () => {
    console.log("Server running on port", app.get('port'));
}); 

// Kill all process listening on the server. See Gracefully shutting down
process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(1);
});
