//si lo exportamos como objeto podemos acceder a sus propiedad
const Admin = require('./admin.model');
const ObjectId = require('mongodb').ObjectId;
const AdminController = {

    getAll: (req, res) => {

        const admin = new Admin();
        admin.getAll().then((results) => {
            res.send(results);
        });
    },
    getById: (req, res) =>{       
        var id = new ObjectId(req.params.id);
        const admin = new Admin();
        admin.getById(id).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(404); //not found
            }
        });
    },
    create: (req, res)=>{
        const admin = new Admin();
        admin.create(req.body).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(400);
            }
        });
    },
    update: (req, res)=>{
        var id = new ObjectId(req.params.id);
        const admin = new Admin();
        console.log(id);
        console.log(req.body);
        admin.update(id, req.body).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(404); //not found
            }
        });
    },
    delete: (req, res)=>{
        var id = new ObjectId(req.params.id);
        const admin = new Admin();
        admin.delete(id).then((results) => {
            if(results){
                res.send(results);
            }else{
                res.sendStatus(404); //not found
            }
        });
    }
};

module.exports = AdminController;