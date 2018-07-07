const express = require('express');
const router = express.Router();
var sql = require('mysql');

var connection = sql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    multipleStatements: true
});

connection.query('USE gentsoflagos');

/* GET api listing. */
router.get('/', (req, res) => {
    console.log(res.send);
    var bito = {'api': 'izz working'}
    res.send(bito);
});

router.get('/dashboard', (req,res)=>{    
    var query = "Select * from orders; Select * from bookings";
    connection.query(query, function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(result);
        }
    })
})

router.get('/revenue/history', (req,res) => {

    var query = "SELECT * from revenue";
    connection.query(query, function (err, result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })

});

router.get('/expenses/history', (req, res) => {

    var query = "SELECT * from expenses";
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })

});

router.get('/bookings-orders/history', (req, res) => {
    var query = "SELECT * from bookings; SELECT * from orders where status = 0";
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});

router.get('/profit-loss/history', (req, res) => {
    var query = "SELECT * from revenue; SELECT * from expenses";
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});

router.get('/staff-list', (req, res) => {
   var query = "SELECT * from staff; SELECT * from revenue where source =?";
   connection.query(query, [req.body.source] ,function(err, result) {
       if(err){
           res.send(err);
       }else{
           res.send(result);
       }
   })
})

router.get('/academy/applications', (req, res) => {

    var query = "SELECT * from academy where status = 0";
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })

});

router.get('/customer-list', (req, res) => {
    var query = "SELECT * from customers";
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })

});

router.post('/staff/create-new', (req, res) => {
    var query = "INSERT INTO staff (staff_name, staff_avatar, staff_bio, staff_category, createdby, createddate) values ('" + req.body.name + "', '" + req.body.avatar + "', '" + req.body.bio + "', '" + req.body.category + "', '" + req.body.createdby + "', '" + req.body.createddate + "') ";
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            var message = { "message": "Success" };
            res.send(message);
        }
    })
})

router.post('/staff/delete', (req, res) => {
    var query = "DELETE FROM staff where id = ?";
    connection.query(query, [req.body.id] , function (err, result) {
        if (err) {
            res.send(err);
        } else {
            var message = { "message": "Success" };
            res.send(message);
        }
    })
})

router.post('/academy/application-status/update', (req, res) => {
    var query = "UPDATE academy set status=? where id=?";
    connection.query(query, [req.body.status, req.body.application_id], function (err, result) {
        if (err) {
            res.send(err);
        } else {
            var message = { "message": "Success" };
            res.send(message);
        }
    })
})

router.post('/order/status/update', (req,res) => {
    var query = "UPDATE orders set status=? where id=?";
    connection.query(query, [req.body.status, req.body.order_id], function (err, result){
        if(err){
            res.send(err);
        }else{
            var message = { "message": "Success" };
            res.send(message);
        }  
    })
})

router.post('/revenue/new', (req, res) => {
    var query = "INSERT INTO revenue (amount, source, week_day, date, month, year, createdby, createddate) values ('" + req.body.amount + "', '" + req.body.source + "', '" + req.body.week_day + "', '" + req.body.date + "', '" + req.body.month + "', '" + req.body.year + "', '" + req.body.createdby + "', '" + req.body.createddate + "')";

    connection.query(query, function(err,result){
        if(err){
            res.send(err);
        }else{
            var message = {"message": "Success"};
            res.send(message);      
        }
    })
});

router.post('/expenses/new', (req, res) => {
    var query = "INSERT INTO expenses (amount, source, week_day, date, month, year, createdby, createddate) values ('" + req.body.amount + "', '" + req.body.source + "', '" + req.body.week_day + "', '" + req.body.date + "', '" + req.body.month + "', '" + req.body.year + "', '" + req.body.createdby + "', '" + req.body.createddate + "')";
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            var message = { "message": "Success" };
            res.send(message);
        }
    })
});

router.post('/login', (req, res) => {

    var query = "Select * from users where username = ?"
    connection.query(query, [req.body.username], function (err, result) {
        if (err) {
            console.log(err)
            res.send(err);
        } else {
            if (result.length == 0) {
                var message = { "message": "User not found" }
                res.send(message);
            } else {
                if (req.body.password == result[0].password) {
                    var time = new Date();
                    var update = "UPDATE users set last_login = ? where username = '" + req.body.username + "' ";
                     connection.query(update, [time]); 
                    res.send(result);
                } else {
                    var message = { "message": "Incorrect information supplied" }
                    res.send(message);
                }
            }

        }
    })

});

module.exports = router;