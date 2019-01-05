const express = require('express');
const app = express();
const router = express.Router();

var sql = require('mysql');
var path = require('path');

var multer = require('multer');

var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads';

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename:  (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
});
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({storage: storage});

app.use('./upload/*', express.static(path.join('./upload/*')));

var connection = sql.createConnection({
  host     : 'b8rg15mwxwynuk9q.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
  user     : 's4i091wurpcyf4ob',
  password : 'aob6bzsq38b021ri',
  port : '3306',
  multipleStatements: true

});



connection.query('use h9fm1o7pm244m15o');


/* GET api listing. */
router.get('/', (req, res) => {
    console.log(res.send);
    var bito = {'api': 'izz working'}
    res.send(bito);
});

router.get('/dashboard', (req,res)=>{    
    var query = "Select * from orders where status = '0'; Select * from bookings where status = '0'; Select * from academy where status = '0'; Select * from revenuesources; Select * from expensesources; Select * from staff";
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

router.get('/services', (req, res) => {
  var query = "Select * from services;";
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
    var query = "SELECT * from revenue; SELECT * from revenuesources";
    connection.query(query, function (err, result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
});

router.get('/expenses/history', (req, res) => {
    var query = "SELECT * from expenses;  SELECT * from expensesources";
    connection.query(query, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })

});

router.get('/bookings-orders/history', (req, res) => {
    var query = "SELECT * from bookings where status < 1; SELECT * from orders where status < 3";
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
   var query = "SELECT * from staff; SELECT * from revenue where source ='Hair Cut'";
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

    var query = "SELECT * from academy where status < 2";
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

router.get('/public/merch/all', (req, res) => {
  var query = "SELECT * from merch where item_quantity > 0";
  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

router.get('/business/merch/all', (req, res) => {
  var query = "SELECT * from merch";
  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

router.get('/business/merch/categories', (req, res) => {
  var query = "SELECT * from merchcategories";
  connection.query(query, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

router.get('/business/staff/categories', (req, res) => {
  var query = "SELECT * from staffcategories";
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

router.post('/expenses/new', (req, res) => {
  var createddate = new Date();
  var query = "INSERT INTO expenses (amount, source, week_day, month, year, createdby, createddate) values ('" + req.body.amount + "', '" + req.body.source + "', '" + req.body.week_day + "', '" + req.body.month + "', '" + req.body.year + "', '" + req.body.createdby + "', '" + createddate + "')";
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

router.post('/revenue/new', (req, res) => {
  var createddate = new Date();
  var query = "INSERT INTO revenue (amount, source, staff , week_day, month, year, createdby, createddate) values ('" + req.body.amount + "', '" + req.body.source + "',  '" + req.body.staff + "', '" + req.body.week_day + "', '" + req.body.month + "', '" + req.body.year + "', '" + req.body.createdby + "', '" + createddate + "')";
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
  req.body.applicant_contact = '+234' + req.body.applicant_contact;
  var createddate = new Date();
  var query = "INSERT INTO academy (applicant_name, applicant_dob, applicant_gist, applicant_contact, status, createdby, createddate  ) values ('" + req.body.applicant_name + "', '" + req.body.applicant_dob + "',  '" + req.body.applicant_gist + "', '" + req.body.applicant_contact + "', '0', 'Gents', '"+ createddate +"')";
  console.log('Got Here');
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(result)
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



router.post('/bookings/new', (req, res) => {
  
  var query = 'SELECT * from bookings where staff_name = ? and date = ? and time = ?';
  connection.query(query, [req.body.staff_name, req.body.date, req.body.time] ,(err, result) => {
    if(err){
      res.send(err);
    }else if(result.length == 0){
      var createddate = new Date();
      var insert = "INSERT INTO bookings (staff_name, service, price, customer_name, date, time, client_phone_number, status, createdby ,createddate) value ('" + req.body.staff_name + "', '" + req.body.service + "', '" + req.body.price + "', '" + req.body.customer_name + "', '" + req.body.date + "', '" + req.body.time + "', '" + req.body.client_phone_number + "', '" + req.body.status + "', 'Gents', '" + createddate + "' )";
      connection.query(insert, (err, result) => {
        if(err){
          res.send(err);
        }else{

          var message = {
            "message": "Success"
            };
            res.send(message);

          var customerCheck = 'Select * from customers where customer_phone_number = ?';
          connection.query(customerCheck, [req.body.client_phone_number], (err, result) =>{
            if(err){
              res.send(err)
            }else if(result.length == 0){
              var customer = "INSERT INTO customers (customer_name, customer_phone_number, source) values ('" + req.body.customer_name + "', '" + req.body.client_phone_number + "', 'Bookings')";
              connection.query(customer);
            }
          })

          var serviceUpdate = 'Select * from services where service_name=?'
          connection.query(serviceUpdate, [req.body.service], (err,result) => {
            if(err){
              console.log(err)
              res.send(err);
            }else{
              console.log(result);
              var times_booked = result[0].times_booked;
              times_booked = +times_booked + 1;
              console.log(times_booked);
              var updateBookingNo = 'UPDATE services set times_booked=? where service_name=?';
              connection.query(updateBookingNo, [times_booked, req.body.service])
            }
          })

          
        }
      })
    }else{
      var message = {
        "message": "Invalid"
      };
      res.send(message);
    }
  })

});

router.post('/checkAvailability', (req, res) => {

  var key;

  switch (req.body.item_size) {
    case 'small':
        key = 'small_size_quantity'
      break;
    case 'medium':
        key = 'medium_size_quantity'
      break;
    case 'large':
        key = 'large_size_quantity'
      break;
    case 'extra_large':
        key = 'extra_large_size_quantity'
      break;
  
    default:
      break;
  }

  var check = 'SELECT * from merch where item_name=? and item_color=?';
  console.log(req.body);
  connection.query(check, [req.body.item_ordered, req.body.item_color], (err, result) => {
    if(err){
      res.send(err);
    }else{

      console.log(result[0][key], req.body.item_quantity);
      
      if(result[0][key] >= req.body.item_quantity){
        var message = {
          'status': '1'
        }
        res.send(message);
      }else{
        var message = {
          'status': '0'
        }
        res.send(message);
      }
    }

  })
  
   
  
})

router.post('/orders/new', (req, res) => {
  
  req.body.client_phone_number = '+234' + req.body.client_phone_number;
  var createddate = new Date();

  var query = "INSERT INTO orders (item_ordered, item_color, item_quantity ,item_size, client_name, date_due, status, delivery_address, client_phone_number , transaction_ref, createddate) values ('" + req.body.item_ordered + "', '" + req.body.item_color + "' , '" + req.body.item_quantity + "' ,  '" + req.body.item_size + "', '" + req.body.customer_name + "', '" + req.body.date_due + "', '" + req.body.status + "', '" + req.body.delivery_address + "', '" + req.body.client_phone_number + "', '" + req.body.transaction_ref + "', '"+ createddate+"')";
  connection.query(query,  (err, result) => {
    if (err) {
      res.send(err);
    } else {

      var inventory = 'SELECT * from merch where item_name=? and item_color=?';
      connection.query(inventory, [req.body.item_ordered, req.body.item_color], (err, result) => {
        switch (req.body.item_size) {
          case 'small':
              var newQuantity = +result[0].small_size_quantity - +req.body.item_quantity;
              var newSold = +result[0].small_size_quantity_sold + +req.body.item_quantity;
              var item_quantity = +result[0].item_quantity - +req.body.item_quantity;
              var quantity_sold = +result[0].quantity_sold + +req.body.item_quantity;
              
              var update = "UPDATE merch set item_quantity=?,quantity_sold=?,small_size_quantity=?,small_size_quantity_sold=? where item_name=? and item_color=?";
              connection.query(update, [item_quantity, quantity_sold, newQuantity, newSold, req.body.item_ordered, req.body.item_color]);
            break;
          case 'medium':
              var newQuantity = +result[0].medium_size_quantity - +req.body.item_quantity;
              var newSold = +result[0].medium_size_quantity_sold + +req.body.item_quantity;
              var item_quantity = +result[0].item_quantity - +req.body.item_quantity;
              var quantity_sold = +result[0].quantity_sold + +req.body.item_quantity;
              
              var update = "UPDATE merch set item_quantity=?,quantity_sold=?,medium_size_quantity=?,medium_size_quantity_sold=? where item_name=? and item_color=?";
              connection.query(update, [item_quantity, quantity_sold, newQuantity, newSold, req.body.item_ordered, req.body.item_color]);
            break;
          case 'large':
              var newQuantity = +result[0].large_size_quantity - +req.body.item_quantity;
              var newSold = +result[0].large_size_quantity_sold + +req.body.item_quantity;
              var item_quantity = +result[0].item_quantity - +req.body.item_quantity;
              var quantity_sold = +result[0].quantity_sold + +req.body.item_quantity;
              
              var update = "UPDATE merch set item_quantity=?,quantity_sold=?,large_size_quantity=?,large_size_quantity_sold=? where item_name=? and item_color=?";
              connection.query(update, [item_quantity, quantity_sold, newQuantity, newSold, req.body.item_ordered, req.body.item_color]);
            break;
          case 'extra_large':
              var newQuantity = +result[0].extra_large_size_quantity - +req.body.item_quantity;
              var newSold = +result[0].extra_large_size_quantity_sold + +req.body.item_quantity;
              var item_quantity = +result[0].item_quantity - +req.body.item_quantity;
              var quantity_sold = +result[0].quantity_sold + +req.body.item_quantity;
              
              var update = "UPDATE merch set item_quantity=?,quantity_sold=?,extra_large_size_quantity=?,extra_large_size_quantity_sold=? where item_name=? and item_color=?";
              connection.query(update, [item_quantity, quantity_sold, newQuantity, newSold, req.body.item_ordered, req.body.item_color]);
            break;
        
          default:
            break;
        }
      })

      var revenueEntry = "INSERT INTO revenue (amount, source, staff , week_day, month, year, createdby, createddate) values ('" + req.body.amount + "', 'Merch Sales',  'Orders', '" + req.body.week_day + "', '" + req.body.month + "', '" + req.body.year + "', 'Gents', '" + createddate + "')";
      connection.query(revenueEntry);
      var customerCheck = 'Select * from customers where customer_phone_number = ?';
      connection.query(customerCheck, [req.body.client_phone_number], (err, result) =>{
        if(err){
          res.send(err)
        }else if(result.length == 0){
          var customer = "INSERT INTO customers (customer_name, customer_phone_number, source) values ('" + req.body.customer_name + "', '" + req.body.client_phone_number + "', 'orders')";
          connection.query(customer);
        }
      })
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })

  
});

router.post('/order/status/update', (req, res) => {
  var query = "UPDATE orders set status=? where id=?";
  connection.query(query, [req.body.status, req.body.id], function (err, result) {
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

router.post('/booking/status/update', (req, res) => {
  var query = "UPDATE bookings set status=? where id=?";
  connection.query(query, [req.body.status, req.body.id], function (err, result) {
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

router.post('/staff/create-new', upload.single('staff_avatar') ,(req, res) => {
  var date = new Date();
  var query = "INSERT INTO staff (staff_name, staff_avatar, staff_bio, staff_category, commission_rate, contact ,createdby, createddate) values ('" + req.body.staff_name + "', 'uploads/" + req.file.filename + "', '" + req.body.staff_bio + "', '" + req.body.staff_category + "', '"+req.body.commission_rate+"', '"+req.body.contact+"',  '" + req.body.createdby + "', '"+date+"') ";
  connection.query(query,  (err, result) => {
        if (err) {
            res.send(err);
        } else {
          console.log(result);
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

router.post('/categories/staff-delete', (req, res) => {
    var query = "DELETE FROM staffcategories where id = ?";
    connection.query(query, [req.body.id] , function (err, result) {
        if (err) {
            res.send(err);
        } else {
            var message = { "message": "Success" };
            res.send(message);
        }
    })
});

router.post('/categories/merch-delete', (req, res) => {
    var query = "DELETE FROM merchcategories where id = ?";
    connection.query(query, [req.body.id] , function (err, result) {
        if (err) {
            res.send(err);
        } else {
            var message = { "message": "Success" };
            res.send(message);
        }
    })
});

router.post('/sources/revenue-delete', (req, res) => {
    var query = "DELETE FROM revenuesources where id = ?";
    connection.query(query, [req.body.id] , function (err, result) {
        if (err) {
            res.send(err);
        } else {
            var message = { "message": "Success" };
            res.send(message);
        }
    })
});

router.post('/sources/expenses-delete', (req, res) => {
    var query = "DELETE FROM expensesources where id = ?";
    connection.query(query, [req.body.id] , function (err, result) {
        if (err) {
            res.send(err);
        } else {
            var message = { "message": "Success" };
            res.send(message);
        }
    })
});

router.post('/services/delete', (req, res) => {
    var query = "DELETE FROM services where id = ?";
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
    connection.query(query, [req.body.status, req.body.id], function (err, result) {
        if (err) {
            res.send(err);
        } else {
            var message = { "message": "Success" };
            res.send(message);
        }
    })
})

router.post('/merch/restock', (req, res) => {
  var update = "UPDATE merch set item_quantity=?,small_size_quantity=?,medium_size_quantity=?, large_size_quantity=?, extra_large_size_quantity=? where id=?";
  connection.query(update, [req.body.item_quantity, req.body.small_size_quantity, req.body.medium_size_quantity, req.body.large_size_quantity, req.body.extra_large_size_quantity, req.body.id], function (err, result) {
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

router.post('/merch/create-new', upload.array('images',3), (req, res, err) => {  
 
  console.log('Sight-Seeing',req.body, req.files[0]);
  
      var query = "INSERT INTO merch (item_name, item_color, item_avatar, item_avatar2, item_avatar3, item_quantity, item_price, item_category, quantity_sold, small_size_quantity, large_size_quantity, medium_size_quantity, extra_large_size_quantity, small_size_quantity_sold, large_size_quantity_sold, medium_size_quantity_sold, extra_large_size_quantity_sold ,createdby) values ('" + req.body.item_name + "', '" + req.body.item_color + "' , 'uploads/" + req.files[0].filename + "', 'uploads/" + req.files[1].filename + "', 'uploads/" + req.files[2].filename + "', '" + req.body.item_quantity + "', '" + req.body.item_price + "', '" + req.body.item_category + "', '0' ,  '" + req.body.small_size_quantity + "', '" + req.body.medium_size_quantity + "' , '" + req.body.large_size_quantity + "' , '" + req.body.extra_large_size_quantity + "' , '" + req.body.small_size_quantity_sold + "' ,  '" + req.body.medium_size_quantity_sold + "',  '" + req.body.large_size_quantity_sold + "',  '" + req.body.extra_large_size_quantity_sold + "' , '" + req.body.createdby + "') ";
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
      
      connection.query("INSERT INTO staffcategories(category_name, createdby) values ('" + req.body.category_name + "', '" + req.body.username + "',  '"+time+"') ")
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
      
      connection.query("INSERT INTO merchcategories(category_name, createdby) values ('" + req.body.category_name + "', '" + req.body.username + "',  '"+time+"') ")
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
      connection.query("INSERT INTO revenuesources(source, createdby, createddate) values ('" + req.body.source + "', '" + req.body.username + "', '"+time+"') ")
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
      
      connection.query("INSERT INTO expensesources(source, createdby) values ('" + req.body.source + "', '" + req.body.username + "',  '"+time+"') ")
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
      connection.query("INSERT INTO services(service_name, service_price, duration, description, times_booked, createdby, createddate) values ('" + req.body.service_name + "', '" + req.body.service_price + "', '" + req.body.duration + "', '" + req.body.description + "' , '0' , '" + req.body.username + "', '"+time+"') ")
      var message = {
        "message": "Success"
      };
      res.send(message);
    }
  })
})



module.exports = router;