// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const sql = require('mysql');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

var connection = sql.createConnection({
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'bccc30f9b509b0',
  password: '1f148d97',
  multipleStatements: true
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

connection.query('USE heroku_4d2e8b4f4099a12');

connection.query('CREATE TABLE IF NOT EXISTS Services (id INT AUTO_INCREMENT PRIMARY KEY, service_name VARCHAR(255), service_price VARCHAR(255), duration VARCHAR(255), description VARCHAR(255), times_booked VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;
});

connection.query('CREATE TABLE IF NOT EXISTS Staff (id INT AUTO_INCREMENT PRIMARY KEY, staff_name VARCHAR(255), staff_avatar VARCHAR(255), staff_bio VARCHAR(255), staff_category VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;
});

connection.query('CREATE TABLE IF NOT EXISTS Merch (id INT AUTO_INCREMENT PRIMARY KEY, item_name VARCHAR(255), item_avatar VARCHAR(255), item_avatar2 VARCHAR(255), item_avatar3 VARCHAR(255), item_price VARCHAR(255), item_category VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;
});

connection.query('CREATE TABLE IF NOT EXISTS Orders (id INT AUTO_INCREMENT PRIMARY KEY, item_ordered VARCHAR(255), item_size VARCHAR(255), client_name VARCHAR(255), date_due datetime, status boolean, delivery_address VARCHAR(255), client_phone_number VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;
});

connection.query('CREATE TABLE IF NOT EXISTS Academy (id INT AUTO_INCREMENT PRIMARY KEY, applicant_name VARCHAR(255), applicant_dob datetime, applicant_gist VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;

});

connection.query('CREATE TABLE IF NOT EXISTS Bookings (id INT AUTO_INCREMENT PRIMARY KEY, staff_name VARCHAR(255), service VARCHAR(255), price VARCHAR(255), customer_name datetime, date datetime, client_phone_number VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;

});

connection.query('CREATE TABLE IF NOT EXISTS Customers (id INT AUTO_INCREMENT PRIMARY KEY, customer_name VARCHAR(255), customer_phone_number VARCHAR(255), source VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;
;
});

connection.query('CREATE TABLE IF NOT EXISTS Revenue (id INT AUTO_INCREMENT PRIMARY KEY, amount VARCHAR(255), source VARCHAR(255), week_day VARCHAR(255), date datetime, month VARCHAR(255), year VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;

});

connection.query('CREATE TABLE IF NOT EXISTS Expenses (id INT AUTO_INCREMENT PRIMARY KEY, amount VARCHAR(255), source VARCHAR(255), week_day VARCHAR(255), date datetime, month VARCHAR(255), year VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;

});

connection.query('CREATE TABLE IF NOT EXISTS Users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), full_name VARCHAR(255), title VARCHAR(255), password VARCHAR(255), last_login datetime, user_type VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;

});

connection.query('CREATE TABLE IF NOT EXISTS BarberSchedule (id INT AUTO_INCREMENT PRIMARY KEY, barber_name VARCHAR(255), week_day VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;

});

connection.query('CREATE TABLE IF NOT EXISTS MerchCategories (id INT AUTO_INCREMENT PRIMARY KEY, category_name VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;

});

connection.query('CREATE TABLE IF NOT EXISTS StaffCategories (id INT AUTO_INCREMENT PRIMARY KEY, category_name VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;

});

connection.query('CREATE TABLE IF NOT EXISTS RevenueSources (id INT AUTO_INCREMENT PRIMARY KEY, source VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;

});

connection.query('CREATE TABLE IF NOT EXISTS ExpenseSources (id INT AUTO_INCREMENT PRIMARY KEY, source VARCHAR(255), createdby VARCHAR(255), createddate datetime)', function (err, result) {
  if (err) throw err;

});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8088');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));