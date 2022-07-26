const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path')
const port = process.env.PORT || 3001;

app.use('', express.static(path.join(__dirname, 'dist', 'my-app')));

app.get('*', (req, res) =>{
    
    res.sendFile(path.join(__dirname, 'dist', 'my-app', 'index.html'));
});



app.listen(port, () =>{
    console.log('App is running on port ' + port);
})
