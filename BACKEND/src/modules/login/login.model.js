const res = require('express/lib/response');
const Database = require('../../core/database');

class Login {
    collection;
    constructor(){
        //set collection
        this.collection = Database.collection('users');
    }

    getByEmail(emailParam){
        return new Promise((success, reject) =>{
            this.collection.find({email: emailParam}).toArray((err, result) =>{
                if(err) reject(err);
                else success(result[0]);
            });
        })
    }
}

//nos conviene que sea clase por la herencia
module.exports = Login;