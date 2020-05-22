const crudLocations = (app) =>{
    const Location = require('../models/locations.js');

    //Funciones de endpoints
    //GET - Devuelve todas las locations
    findAllLocations = (req, res) => {
        Location.find((err, locations) =>{
            if(!err){
                console.log('GET /locations');
                res.send(locations);
            }
        })
     }

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
                console.log('Created', req.body);
            } else { 
                console.log('ERROR: ' + err);
            }
        });
        res.send(location);
    };

    //PUT - Update a register already exists in the DB
    modifyLocation = function (req, res) {
        Location.findById(req.params.id, function (err, location) {
            location.id = req.body.id;
            location.lat = req.body.lat;
            location.lng = req.body.lng;
            location.name = req.body.name;
            location.country = req.body.country;
            location.img = req.body.img;
            location.link = req.body.link;
            location.description = req.body.description;
            location.type = req.body.type;

            location.save(function (err) {
                if (!err) {
                    console.log('Updated', req.body);
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
            location.remove(function (err) {
            if (!err) {
                console.log('Removed', req.body);
            } else { 
                console.log('ERROR: ' + err);
            }
            res.send(location);
        })
    });
    }

//Rutas de la API, asociadas a una función
    app.get('/locations', findAllLocations);
    app.post('/locations', addLocation);
    app.put('/location/:id', modifyLocations);
    app.delete('/location/:id', deleteLocation);

}

module.exports = crudLocations;