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

let config = {
    user: 'postgres',
    database: 'ubuntu',
    host: 'localhost',
    password: 'abcd@123456'
};

let app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

let pool = new Pool(config);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'home.html'));
});

app.get('/Desktop', function (req, res) {
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
    let dirpath = "./ui/" + req.body.path;
    let type = "";
    if(req.body.name.includes(".")) {
        type = "file";
        fs.closeSync(fs.openSync(dirpath, 'w'));
    }
    else {
        type = "folder";
        mkdirp(dirpath, function(err) {
            if (err) {
                console.log(err);
                res.status(500).send("Something went wrong!");
            }
            console.log("Successfully created test directory");
        });
    }
    pool.query('INSERT INTO "fileSystem" (name, path, status, type) VALUES ($1, $2, $3, $4)', [req.body.name, dirpath, 0, type], function (err, result) {
        if (err) {
            console.log("Something went wrong while inserting!");
        } else {
            console.log("Successfully inserted in fileSystem table.");
        }
    });
    res.status(200).send("Successfully created!");
});

app.post('/rename', function (req, res) {
    let currentPath = './ui/' + req.body.currentPath;
    let newPath = './ui/' + req.body.newPath;
    let currentName = req.body.currentName;
    let newName = req.body.newName;
    fs.rename(currentPath, newPath, function(err) {
        if ( err ) {
            console.log('ERROR: ' + err);
            res.status(500).send("Something went wrong!");
        }
    });
    pool.query('UPDATE "fileSystem" SET name = ($1), path = ($2) WHERE name = ($3) AND path = ($4)', [newName, newPath, currentName, currentPath], function (err, result) {
        if (err) {
            console.log("Something went wrong while updating!");
        } else {
            console.log("Successfully updated!");
        }
    });
    res.status(200).send("Successfully changed!");
});

app.post('/moveToTrash', function (req, res) {
    let currentPath = './ui/' + req.body.currentPath;
    let newPath = './ui/Desktop/trash/' + req.body.fname;
    fsextra.move(currentPath, newPath, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("success!");
        }
    });
    pool.query('UPDATE "fileSystem" SET status = ($1), path = ($2) WHERE name = ($3) AND path = ($4)', [1, newPath, req.body.fname, currentPath], function (err, result) {
        if (err) {
            console.log("Something went wrong while updating!");
        } else {
            console.log("Successfully updated!");
        }
    });
    res.status(200).send("Successfully moved to trash!");
});

app.listen(9090, function () {
    console.log('App listening on port 9090!');
});
