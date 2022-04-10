//si lo exportamos como objeto podemos acceder a sus propiedad
const Rescuer = require('./rescuer.model');
const ObjectId = require('mongodb').ObjectId;
const rescuerController = {

    getAll: (req, res) => {

        const rescuer = new Rescuer();
        rescuer.getAll().then((results) => {
            res.send(results);
        });
    },
    getById: (req, res) =>{       
        var id = new ObjectId(req.params.id);
        const rescuer = new Rescuer();
        rescuer.getById(id).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(404); //not found
            }
        });
    },
    create: (req, res)=>{
        const rescuer = new Rescuer();
        rescuer.create(req.body).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(400);
            }
        });
    },
    update: (req, res)=>{
        var id = new ObjectId(req.params.id);
        const rescuer = new Rescuer();
        console.log(id);
        console.log(req.body);
        rescuer.update(id, req.body).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(404); //not found
            }
        });
    },
    delete: (req, res)=>{
        var id = new ObjectId(req.params.id);
        const rescuer = new Rescuer();
        rescuer.delete(id).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(404); //not found
            }
        });
    }
};

module.exports = rescuerController;