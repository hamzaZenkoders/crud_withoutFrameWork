const { getPets,  createPet,deletePet,updatePet } = require('../controllers/controller');
const pets = require("../data/petsData");


module.exports = (server) => {
    server.on('request', (req, res) => {
        const { method, url } = req;

        if (method === 'GET' && url === '/petData') {
            getPets(req, res);
        }
         else  if (method === 'POST' && url === '/petData') {
            createPet(req,res);
        }else if (method === 'DELETE' && url.startsWith('/petData/')){
            const id = parseInt(url.substring(9), 10);
            deletePet(req,res,id);
        } else if (method === 'PUT' && url.startsWith('/petData/')) {
       
            const id = parseInt(url.substring(9), 10);
            updatePet(req, res, id);
        }
        else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'Route not found' }));
        }
    });
};
