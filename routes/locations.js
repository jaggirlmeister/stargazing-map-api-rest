const crudLocations = (app) =>{
    const Location = require('../models/locations.js');

    //Funciones de endpoints
    //GET - Devuelve todas las cervecerías
    findAllLocations = (req, res) => {
        Location.find((err, locations) =>{
            if(!err){
                console.log('GET /locations');
                res.send(locations);
            }
        })
     }
     //URLS
     app.get('/locations', findAllLocations);
}
module.exports = crudLocations;

//POST - Insert a new register in the DB
addLocation = function (req, res) {
    console.log('POST');
    console.log(req.body);
    var location = new Location({
    id: req.body.id,
    lat: req.body.lat,
    lng: req.body.lng,
    name: req.body.name,
    country: req.body.country,
    img: req.body.img,
    link: req.body.link,
    description: req.body.description,
    type: req.body.type
    });

    location.save(function (err) {
        if (!err) {
            console.log('Created');
        } else { 
            console.log('ERROR: ' + err);
        }
        });
    res.send(location);
};

//PUT - Update a register already exists in the DB
modifyLocations = function (req, res) {
    Location.findById(req.params.id, function (err, location) {
        Location.id = req.body.id;
        Location.lat = req.body.lat;
        Location.lng = req.body.lng;
        Location.name = req.body.name;
        Location.country = req.body.country;
        Location.img = req.body.img;
        Location.link = req.body.link;
        Location.description = req.body.description;
        Location.type = req.body.type;

        Location.save(function (err) {
            if (!err) {
                console.log('Updated');
            } else {
                console.log('ERROR: ' + err);
            }
            res.send(location);
        });
    });
}

//DELETE - Delete a register with specified ID
deleteLocation = function (req, res) {
    Location.findById(req.params.id, function (err, location) {
        Location.remove(function (err) {
        if (!err) {
            console.log('Removed');
        } else { 
            console.log('ERROR: ' + err);
        }
        res.send(location);
        })
    });

//Rutas de la API, asociadas a una función
    app.get('/locations', findAllLocations);
    app.post('/locations', addLocation);
    app.put('/locations/:id', modifyLocations);
    app.delete('/locations/:id', deleteLocation);

}