const express = require('express');
const router = express.Router();
var sql = require('mysql');

var connection = sql.createConnection({
  host: 'b8rg15mwxwynuk9q.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
  user: 's4i091wurpcyf4ob',
  password: 'd8466sslfhbyo5r3',
  port: '3306',
  multipleStatements: true
});


connection.query('USE h9fm1o7pm244m15o');

/* GET api listing. */
router.get('/', (req, res) => {
    console.log(res.send);
    var bito = {'api': 'izz working'}
    res.send(bito);
});

router.get('/dashboard', (req,res)=>{    
    var query = "Select * from orders where status < 2; Select * from bookings order by date; Select * from revenuesources; Select * from expensesources; Select * from staff";
    connection.query(query, function (err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(result);
        }
    })
})

router.get('/pre-booking', (req, res) => {
  var query = "Select * from services; Select * from staff; Select * from barberschedule";
  connection.query(query, function (err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
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
    var query = "SELECT * from bookings; SELECT * from orders";
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

router.get('/maintenance', (req, res) => {
  var query = "SELECT * from users; SELECT * from staffcategories; SELECT * from merchcategories; SELECT * from revenuesources; SELECT * from expensesources; SELECT * from services";
  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
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

router.get('/carousel/images', (req, res) => {
  var query = "SELECT * from carouselimages";
  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

router.get('/merch/all', (req, res) => {
  var query = "SELECT * from merch where item_quantity > 0";
  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

//--POST APIS--//

router.post('/login', (req, res) => {

  var query = "Select * from users where username = ?"
  connection.query(query, [req.body.username], function (err, result) {
    if (err) {
      console.log(err)
      res.send(err);
    } else {
      if (result.length == 0) {
        var message = {
          "message": "User not found"
        }
        res.send(message);
      } else {
        if (req.body.password == result[0].password) {
          var time = new Date();
          var update = "UPDATE users set last_login = ? where username = '" + req.body.username + "' ";
          connection.query(update, [time]);
          res.send(result);
        } else {
          var message = {
            "message": "Incorrect information supplied"
          }
          res.send(message);
        }
      }
    }
  })

});

router.post('/revenue/new', (req, res) => {
  var query = "INSERT INTO revenue (amount, source, staff , week_day, date, month, year, createdby, createddate) values ('" + req.body.amount + "', '" + req.body.source + "',  '" + req.body.staff + "', '" + req.body.week_day + "', '" + req.body.date + "', '" + req.body.month + "', '" + req.body.year + "', '" + req.body.createdby + "')";

  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
});

router.post('/academy/new', (req, res) => {
  var query = "INSERT INTO revenue (applicant_name, applicant_dob, applicant_gist, applicant_contact, createdby, createddate) values ('" + req.body.applicant_name + "', '" + req.body.applicant_dob + "',  '" + req.body.applicant_gist + "', '" + req.body.applicant_contact + "', '" + req.body.createdby + "')";

  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
});

router.post('/carousel/new', (req, res) => {
    var query = "INSERT INTO carouselimages (image, createdby, createddate) value ('" + req.body.image + "', '" + req.body.createdby + "')";
    connection.query(query, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        var message = {
          "message": "Success"
        };
        res.send(message);
      }
    })
});

router.post('/expenses/new', (req, res) => {
  var query = "INSERT INTO expenses (amount, source, week_day, date, month, year, createdby, createddate) values ('" + req.body.amount + "', '" + req.body.source + "', '" + req.body.week_day + "', '" + req.body.date + "', '" + req.body.month + "', '" + req.body.year + "', '" + req.body.createdby + "')";
  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
});

router.post('/bookings/new', (req, res) => {
  var query = "INSERT INTO bookings (staff_name, service, price, customer_name, date, client_phone_number, createdby, createddate) values ('" + req.body.staff_name + "', '" + req.body.service + "', '" + req.body.price + "', '" + req.body.customer_name + "', '" + req.body.date + "', '" + req.body.client_phone_number + "', '" + req.body.createdby + "')";
  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var customer = "INSERT INTO customers (customer_name, customer_phone_number, source, createdby, createddate) values ('" + req.body.customer_name + "', '" + req.body.client_phone_number + "', 'bookings', '" + req.body.createdby + "')";
      connection.query(customer);
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
});

router.post('/orders/new', (req, res) => {
  var query = "INSERT INTO orders (item_ordered, item_size, client_name, date_due, status, delivery_address, client_phone_number , createdby, createddate) values ('" + req.body.item_ordered + "', '" + req.body.item_size + "', '" + req.body.client_name + "', '" + req.body.date_due + "', '" + req.body.status + "', '" + req.body.delivery_address + "', '" + req.body.client_phone_number + "', '" + req.body.createdby + "')";
  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var customer = "INSERT INTO customers (customer_name, customer_phone_number, source, createdby, createddate) values ('" + req.body.customer_name + "', '" + req.body.client_phone_number + "', 'orders', '" + req.body.createdby + "')";
      connection.query(customer);
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
});

router.post('/order/status/update', (req, res) => {
  var query = "UPDATE orders set status=? where id=?";
  connection.query(query, [req.body.status, req.body.order_id], function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
})

router.post('/bookings/status/update', (req, res) => {
  var query = "UPDATE bookings set status=? where id=?";
  connection.query(query, [req.body.status, req.body.order_id], function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
})

router.post('/user/account/update', (req, res) => {
  var query = "UPDATE users set password=? where id=?";
  connection.query(query, [req.body.password, req.body.user_id], function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
})

router.post('/staff/create-new', (req, res) => {
    var query = "INSERT INTO staff (staff_name, staff_avatar, staff_bio, staff_category, createdby, createddate) values ('" + req.body.name + "', '" + req.body.avatar + "', '" + req.body.bio + "', '" + req.body.category + "', '" + req.body.createdby + "') ";
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            var message = { "message": "Success" };
            res.send(message);
        }
    })
})

router.post('/user/create-new', (req, res) => {
  console.log(req.body);
  req.body.createddate = new Date(req.body.createddate).getTime();
  var query = "INSERT INTO users (username, full_name, title, password, user_type, createdby) values ('" + req.body.username + "', '" + req.body.full_name + "', '" + req.body.title + "', '" + req.body.password + "', '" + req.body.usertype + "', '" + req.body.createdby + "') ";
  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
})

router.post('/user/delete', (req, res) => {
  var query = "DELETE FROM users where id = ?";
  connection.query(query, [req.body.id], function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
});

router.post('/carousel/image/delete', (req, res) => {
  var query = "DELETE FROM carouselimages where id = ?";
  connection.query(query, [req.body.id], function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
});

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
});

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

router.post('/merch/delete', (req, res) => {
  var query = "DELETE FROM merch where id = ?";
  connection.query(query, [req.body.id], function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
})

router.post('/merch/create-new', (req, res) => {
  var query = "INSERT INTO merch (item_name, item_avatar, item_avatar2, item_avatar3, item_quantity, item_price, item_category , createdby, createddate) values ('" + req.body.name + "', '" + req.body.avatar + "', '" + req.body.avatar2 + "', '" + req.body.avatar3 + "', '" + req.body.quantity + "', '" + req.body.price + "', '" + req.body.category + "', '" + req.body.createdby + "') ";
  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
})

router.post('/categories/staff-new', (req, res) => {
  var query = "SELECT * from staffcategories where category_name = ?";
  connection.query(query, [req.body.category_name] ,function (err, result) {
    if (err) {
      res.send(err);
    } else if(result.length > 0){
      var message = {
        "message": "THIS CATEGORY ALREADY EXISTS"
      };
      res.send(message);
    }else{
      var time = new Date();
      req.body.createddate = time;
      connection.query("INSERT INTO staffcategories(category_name, createdby) values ('" + req.body.category_name + "', '" + req.body.username + "') ")
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
})

router.post('/categories/merch-new', (req, res) => {
  var query = "SELECT * from merchcategories where category_name = ?";
  connection.query(query, [req.body.category_name], function (err, result) {
    if (err) {
      res.send(err);
    } else if (result.length > 0) {
      var message = {
        "message": "THIS CATEGORY ALREADY EXISTS"
      };
      res.send(message);
    } else {
      var time = new Date();
      req.body.createddate = time;
      connection.query("INSERT INTO merchcategories(category_name, createdby) values ('" + req.body.category_name + "', '" + req.body.username + "') ")
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
})

router.post('/sources/revenue-new', (req, res) => {
  var query = "SELECT * from revenuesources where source = ?";
  connection.query(query, [req.body.source], function (err, result) {
    if (err) {
      res.send(err);
    } else if (result.length > 0) {
      var message = {
        "message": "THIS SOURCE ALREADY EXISTS"
      };
      res.send(message);
    } else {
      var time = new Date();
      req.body.createddate = time;
      connection.query("INSERT INTO revenuesources(source, createdby) values ('" + req.body.source + "', '" + req.body.username + "') ")
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
})

router.post('/sources/expenses-new', (req, res) => {
  var query = "SELECT * from expensesources where source = ?";
  connection.query(query, [req.body.source], function (err, result) {
    if (err) {
      res.send(err);
    } else if (result.length > 0) {
      var message = {
        "message": "THIS SOURCE ALREADY EXISTS"
      };
      res.send(message);
    } else {
      var time = new Date();
      req.body.createddate = time;
      connection.query("INSERT INTO expensesources(source, createdby) values ('" + req.body.source + "', '" + req.body.username + "') ")
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
})

router.post('/services/create-new', (req, res) => {
  var query = "SELECT * from services where service_name = ?";
  connection.query(query, [req.body.service_name], function (err, result) {
    if (err) {
      res.send(err);
    } else if (result.length > 0) {
      var message = {
        "message": "THIS SERVICE ALREADY EXISTS"
      };
      res.send(message);
    } else {
      var time = new Date();
      req.body.createddate = time;
      connection.query("INSERT INTO services(service_name, service_price, duration, description ,createdby, createddate) values ('" + req.body.service_name + "', '" + req.body.service_price + "', '" + req.body.duration + "', '" + req.body.description + "' , '" + req.body.username + "') ")
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
})



module.exports = router;