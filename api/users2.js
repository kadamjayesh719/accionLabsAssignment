let express = require('express');
let app = express();
let mongoDB = require('../db/mongoDB');
let ObjectID = require('mongodb').ObjectID;

let requestType = {
    ADD_REQUEST: 1,
    UPDATE_REQUEST: 2,
    DELETE_REQUEST: 3,
    GET_REQUEST: 4
};

function validateRequest(body, type) {
    switch (type) {
        case requestType.ADD_REQUEST: if(typeof body.name != "string" || typeof body.date_of_birth != "string" || isNaN(Date.parse(body.date_of_birth)) || Date.parse(body.date_of_birth) > (new Date()) || typeof body.role != "string" || typeof body.is_active != "boolean")
                                            return false;
                                      else
                                            return true;
        case requestType.UPDATE_REQUEST: if(typeof body.name != "string" || typeof body.date_of_birth != "string" || typeof Date.parse(body.date_of_birth) != "number" || Date.parse(body.date_of_birth) > (new Date()) || typeof body.role != "string" || typeof body.is_active != "boolean" || typeof body.id != "string")
                                            return false;
                                         else
                                            return true;
        case requestType.DELETE_REQUEST: if(typeof body.id != "string")
                                                return false;
                                         else
                                                return true;
    }
}

exports.addRecord = function(req, res) {
    if(validateRequest(req.body, requestType.ADD_REQUEST))
    mongoDB(function(db){
        db.collection('users').insertOne({name: req.body.name, role: req.body.role, is_active: req.body.is_active, date_of_birth: new Date(req.body.date_of_birth)}, function(err, result){
            if(err && err.code == 11000) res.send({success: false, cause: "Duplicate Name"});
            else if(err) res.send({success: false, data: err.code});
            else res.send({success: true});
            db.close();
        });
    }, req);
    else
        res.send({success: false, cause: "Validation Failed"});
};

exports.deleteRecord = function(req, res) {
    if(validateRequest(req.body, requestType.DELETE_REQUEST))
    mongoDB(function(db){
        db.collection('users').deleteOne({_id: ObjectID(req.body.id)}, function(err, result){
            if(err) res.send({success: false});
            else res.send({success: true, data: result});
            
            db.close();
        });
    }, req);
    else
        res.send({success: false, cause: "Validation Failed"});
}

exports.updateRecord = function(req, res) {
    if(validateRequest(req.body, requestType.UPDATE_REQUEST))
    mongoDB(function(db){if(err) res.send({success: false});
    else res.send({success: true, data: result});
        db.collection('users').updateOne({_id: ObjectID(req.body.id)}, {$set: {role: req.body.role, is_active: req.body.is_active, date_of_birth: new Date(req.body.date_of_birth)}}, function(err, result){
            if(err && err.code == 11000) res.send({success: false, cause: "Duplicate Name"});
            else if(err) res.send({success: false});
            else res.send({success: true, data: result});
            db.close();
        });
    }, req);
    else
        res.send({success: false, cause: "Validation Failed"});
};

exports.getRecords = function(req, res) {
    mongoDB(function(db){
        db.collection('users').find({}).toArray(function(err, result){
            if(err) res.send({success: false});
            else {
                let resultNew = [];
                for(let i = 0; i < result.length; i++) {
                    let date = new Date(result[i].date_of_birth);
                    resultNew.push({id: result[i]._id, name: result[i].name, date_of_birth: date.getFullYear() + '-' + ("0" + date.getMonth()).slice(-2) + '-' + ("0" + date.getDate()).slice(-2), role: result[i].role, is_active: result[i].is_active});
                }                
                res.send({success: true, data: resultNew});
            }
            db.close();
        });
    }, req);
};
