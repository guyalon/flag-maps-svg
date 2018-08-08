const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const publicDirectory = path.join(__dirname, '../../');
const flagsDirectoryPath = path.join(__dirname, '../../assets/img/flags/4x3');


app.use(express.static('../../assets'));

app.get('/api/list',function(req,res){
    fs.readdir(flagsDirectoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        var mapArr = [];

        //creating a list of all flags in the folder by convention
        files.forEach(function (file) {
            var fileName = file.split(".")[0]
            mapArr.push({map_url:'assets/img/maps/all/'+fileName+"/vector.svg",flag_url:'assets/img/flags/4x3/'+file})
        });

        res.send(mapArr);
    });

});


app.use('/', express.static(publicDirectory));

app.listen(8080, () => console.log('Listening on port 8080!'));
