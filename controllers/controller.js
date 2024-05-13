const fs = require('fs');
const path = require('path');
const pets = require("../data/petsData");


const petsFilePath = 'C:\\Users\\zenkoders\\crud\\data\\pets.json';


const getPets = async (req, res) => {
    try {
    
        fs.readFile(petsFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
                return;
            }
        
            const petsData = JSON.parse(data);
           
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(petsData));
        });
    } catch(err) {
        console.log(err);
    }
}

const createPet = async (req, res) => {
    try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newPet = JSON.parse(body);
            
            fs.readFile(petsFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ message: 'Internal Server Error' }));
                    return;
                }
                
             
                pets.push(newPet);
                
                fs.writeFile(petsFilePath, JSON.stringify(pets, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ message: 'Internal Server Error' }));
                        return;
                    }
                    res.writeHead(201, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(newPet));
                });
            });
        });
    } catch (err) {
        console.log(err);
    }
}

const deletePet = async (req, res, id) => {
    try {
       
        fs.readFile(petsFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'Internal Server Error' }));
                return;
            }
        
            let pets = JSON.parse(data);
         
            const index = pets.findIndex(pet => pet.id === id);
            if (index !== -1) {
               
                pets.splice(index, 1);
               
                fs.writeFile(petsFilePath, JSON.stringify(pets, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error(err);
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ message: 'Internal Server Error' }));
                        return;
                    }
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ message: `Pet with ID ${id} deleted successfully` }));
                });
            } else {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: `Pet with ID ${id} not found` }));
            }
        });
    } catch (err) {
        console.log(err);
    }
}

const updatePet = async (req, res, id) => {
    try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedPet = JSON.parse(body);
           
            fs.readFile(petsFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ message: 'Internal Server Error' }));
                    return;
                }
                
                let petsData = JSON.parse(data);
               
                const index = petsData.findIndex(pet => pet.id === id);
                if (index !== -1) {
                  
                    petsData[index] = { ...petsData[index], ...updatedPet };
                   
                    fs.writeFile(petsFilePath, JSON.stringify(petsData, null, 2), 'utf8', (err) => {
                        if (err) {
                            console.error(err);
                            res.writeHead(500, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({ message: 'Internal Server Error' }));
                            return;
                        }
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ message: `Pet with ID ${id} updated successfully` }));
                    });
                } else {
                    res.writeHead(404, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ message: `Pet with ID ${id} not found` }));
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getPets,
    createPet,
    deletePet,
    updatePet
}
