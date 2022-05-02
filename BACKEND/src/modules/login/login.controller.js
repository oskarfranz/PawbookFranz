//si lo exportamos como objeto podemos acceder a sus propiedad
const dotenv = require("dotenv").config();
const LoginModel = require('./login.model');
const jwt = require('jsonwebtoken');
const AdminController = {

    login: (req, res) =>{       
        var email = req.body.email;
        const model = new LoginModel();
        model.getByEmail(email).then((results) => {
            if(results){
                if(req.body.password == results.password){
                    console.log("Authentication Succeded!!");
                    const token = jwt.sign({id: results._id}, process.env.PRIVATEKEY, {expiresIn: 30 * 60});
                    res.status(200).send(token);
                }else {
                    res.sendStatus(401);
                }
            }else{
                res.sendStatus(404);
            }
        });
    }
};

module.exports = AdminController;