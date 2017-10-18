let express = require('express');
let app = express();
let pool = require('../db/mysqlDB');

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
        case requestType.UPDATE_REQUEST: if(typeof body.name != "string" || typeof body.date_of_birth != "string" || typeof Date.parse(body.date_of_birth) != "number" || Date.parse(body.date_of_birth) > (new Date()) || typeof body.role != "string" || typeof body.is_active != "boolean" || typeof body.id != "number")
                                            return false;
                                         else
                                            return true;
        case requestType.DELETE_REQUEST: if(typeof body.id != "number")
                                                return false;
                                         else
                                                return true;
    }
}

exports.addRecord = function(req, res) {
    if(validateRequest(req.body, requestType.ADD_REQUEST))
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query('insert into user_details(name, date_of_birth, role, is_active) values(?,?,?,?)', [req.body.name, req.body.date_of_birth.substr(0,10), req.body.role, req.body.is_active],
            function(err, result){
                if(err && err.errno == 1062) {
                    res.send({success: false, cause: "Duplicate Name"});
                }
                else if(err){
                  console.log(err); 
                  res.send({success: false});  
                } 
                else res.send({success: true});
        });
    });
    else
        res.send({success: false, cause: "Validation Failed"});
};

exports.deleteRecord = function(req, res) {
    if(validateRequest(req.body, requestType.DELETE_REQUEST))
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query('delete from user_details where id = ?', [req.body.id],
            function(err, result){
                if(err) res.send({success: false});
                else res.send({success: true});
        });
    });
    else
        res.send({success: false, cause: "Validation Failed"});
}

exports.updateRecord = function(req, res) {
    if(validateRequest(req.body, requestType.UPDATE_REQUEST))
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query('update user_details set date_of_birth = ?,role = ?, is_active = ? where id = ?', [req.body.date_of_birth.substr(0,10), req.body.role, req.body.is_active, req.body.id],
            function(err, result){  
                if(err && err.errno == 1062) {
                    res.send({success: false, cause: "Duplicate Name"});
                }
                else if(err) res.send({success: false});
                else res.send({success: true});
        });
    });
    else
        res.send({success: false, cause: "Validation Failed"});
};

exports.getRecords = function(req, res) {
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query("select id, name,DATE_FORMAT(CONVERT_TZ(date_of_birth,'+00:00','+05:30'),'%Y-%m-%d') as date_of_birth, role, is_active from user_details",
            function(err, result){
                if(err) res.send({success: false});
                else res.send({success: true, data: result});
        });
    });
};
