//Cargamos dependencias
const express= require('express');
const Database = require('./src/core/database');
const path = require('path');
const apiRoutes = require('./src/routes/routes');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const multer = require('multer');

//incializamos app
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', apiRoutes);

// Manejo de archivos con multer
const multerOptions = {
    destination: (req, file, cb)=>{
        cb(null, 'storage/images'); //error first callback
    },
    filename: (req, file, cb)=>{
        const extension = file.originalname.split('.').pop(); //extraigo la extension
        const fileName = file.originalname.split('.')[0];
        cb(null, fileName+'.'+extension); //nombre con el que lo quiero guardar
    }
}
const allowExtensions = ['jpg', 'png', 'jpeg', 'gif']; //como es para fotos de pets solo permitimos ciertas extensiones

const fileFilter = (req, file, cb)=>{
    console.log(file);
    const extension = file.originalname.split('.').pop().toLowerCase();
    const flag = file.mimetype.startsWith('image/');
    cb(null, flag);
}

const multerStorage = multer.diskStorage(multerOptions);

const upload = multer({storage: multerStorage, fileFilter: fileFilter}); //creamos el middleware dond eespecificamos el storage

app.post('/file', upload.single('archivo'),(req, res)=>{
    console.log("Archivo: ", req.file);
    if(!req.file){
        console.log("no hay archivo");
    }else{
        res.status(200).send("subida de archivo");
    }
});

//endopoints
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'src/views/', 'index.html');
    res.sendFile(indexPath);
});
const port = process.env.PORT || 3000;

//Swagger Configuration
const swaggerOptions = {
    swaggerDefinition:{
        swagger : '2.0',
        info: {
            title: 'ITESO PawBook',
            description: 'A live chat web application',
            version: '1.0.0', //version, cambios, fixes
            //en este ejemplo, version 1, sin cambios menores, sin fixes
            servers: ['http://localhost:'+port]
        }
    },
    apis: ['./src/modules/**/*.routes.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
Database.connect().then((client) =>{
    //Listen to port
    const server = app.listen(port, ()=>{
        console.log('App is running in port '+port+'...');
    });

    const io = socketIo(server, {
        cors: {
            origin: 'http://localhost:4200',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowHeaders: ['*'],
            credentials: true
        }
    });
    
});