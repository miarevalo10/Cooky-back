var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var clientLogic = require("./clientLogic.js")


router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));






router.get('/', function(req, res, next) {
  console.log("llega a antes de imprimir");

  res.send('HOLA');
  console.log("sale de  imprimir");
  res.end();

});



router.post('/createClient', function(req, res, next) {
  console.log("llega a antes de imprimir");

  var newClient = req.body;
  console.log("creating client: "+ JSON.stringify(newClient));
/**
  var resp = baseDatos.agregar(objeto);
  res.send(JSON.stringify(resp));*/


  console.log("sale de  imprimir");
  res.end();

});

router.get('/leer', function(req, res, next) {
  console.log("llega a antes de imprimir");

  var resp = baseDatos.leerTodo();

  res.send(JSON.stringify(resp));
  console.log("sale de  imprimir");
  res.end();

});

module.exports = router;
