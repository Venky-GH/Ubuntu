let express = require('express');
let morgan = require('morgan');
let path = require('path');
let Pool = require('pg').Pool;
let bodyParser = require('body-parser');
let getBootstrapNode = require('bootstrap-node');
let bootstrapNode = getBootstrapNode();
let mkdirp = require('mkdirp');
let fs = require('fs');
let fsextra = require('fs-extra');

var config = {
    user: 'postgres',
    database: 'ubuntu',
    host: 'localhost',
    password: 'abcd@123456'
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'home.html'));
});

app.get('/images/:fileName', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'images', req.params.fileName));
});

app.get('/css/:fileName', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'css', req.params.fileName));
});

app.get('/js/:fileName', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'js', req.params.fileName));
});

app.post('/listDirectory', function (req, res) {
    let fpath = "./ui/" + req.body.dir_name;

    fs.readdir(fpath, (err, files) => {
        let content = [];
        files.forEach(file => {
            let filename = file.toString();
            let obj = {name : filename};
            if(filename.includes('.')) {
                obj['type'] = "file";
            }
            else {
                obj['type'] = "folder";
            }
            content.push(obj);
        });
        res.status(200).send(JSON.stringify(content));
    });
});

app.post('/create', function (req, res) {
    let dirpath = "./ui/" + req.body.directory_name;
    mkdirp(dirpath, function(err) {
        if (err) console.log(err);
        console.log("Successfully created test directory");
    });
    res.status(200).send("Successfully created!");
});

app.post('/rename', function (req, res) {
    let currentPath = './ui/' + req.body.currentPath;
    let newPath = './ui/' + req.body.newPath;
    fs.rename(currentPath, newPath, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });
    res.status(200).send("Successfully changed!");
});

app.post('/moveToTrash', function (req, res) {
    let currentPath = './ui/' + req.body.currentPath;
    let newPath = './ui/Desktop/trash/' + req.body.fname;
    fsextra.move(currentPath, newPath, function (err) {
        if (err) return console.error(err)
        console.log("success!")
    })
    res.status(200).send("Successfully moved to trash!");
});

app.listen(9090, function () {
    console.log('App listening on port 9090!');
});
