let express = require('express');
let app = express();
let parser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
var config = require("./config");
db = config.database;

/*
    Choice 0 is for using mysql.
    Choice 1 is for using mongoDB.
*/
let choice = db.dbChoice;
console.log(choice)
let users;
if(choice == 0)
    users = require('./api/users');
else {
    users = require('./api/users2');
    MongoClient.connect('mongodb://127.0.0.1:27017/jayesh', function(err, db) {
    	// console.log(err);
        if(err) throw err;
        db.collection('users').ensureIndex({name: 1}, {unique: true});
        db.close();
    });
}

app.use(express.static('public'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));

app.post('/addrecord', users.addRecord);
app.get('/getrecords', users.getRecords);
app.delete('/deleterecord', users.deleteRecord);
app.put('/updaterecord', users.updateRecord);

app.listen(4000);