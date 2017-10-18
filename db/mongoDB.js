var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://127.0.0.1:27017/accionLabsDb';

module.exports = function(callback, req) {
    MongoClient.connect(mongoUrl, function(err, db){
        if(err) throw err;
        else callback(db, req);
    });
}