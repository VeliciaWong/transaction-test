const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser')
var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "pma",
//   password: ""
// });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const payments = []

app.use(bodyParser.json())

app.get('/api/transactionList', (req, res) => {
    res.json(payments);
})

app.post('/api/addNewTransaction', (req, res) => {
    const { murid_id, pembayaran, periode, tglbayar, bank_id } = req.body;
    const newPayment = {
      murid_id,
      pembayaran,
      periode,
      tglbayar,
      bank_id,
    };
    payments.push(newPayment);
    res.status(201).json(newPayment);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})