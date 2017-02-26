var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var clientLogic = require("./clientLogic.js")


router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));

//Peticiones GET 

router.get('/', function(req, res, next) {
  console.log("llega a antes de imprimir");

  res.send('HOLA');
  console.log("sale de  imprimir");
  res.end();

});


module.exports = router;
