 const http = require('http');
require("dotenv").config();
const routes = require('./routes/routes');

const PORT = process.env.PORT;


const server = http.createServer();

routes(server);

server.listen(PORT, err => {
 
 console.log(`listening on port ${PORT}`)
}) 