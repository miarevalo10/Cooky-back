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

router.get('/existsClient', function(req, res, next) {
  console.log("llega a antes de imprimir");

  if (req.body.length > 1e6) { 
    //1mb
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }

  var newClient = req.body;
  console.log("creating client: "+ JSON.stringify(newClient.nickName));
  var respuesta = clientLogic.existsClientNickName(newClient.nickName);
  res.send(respuesta)// true, false o error
  console.log("sale de  imprimir");
  res.end();

});










//peticiones POST

router.post('/createClient', function(req, res, next) {
  console.log("llega a antes de imprimir");

  if (req.body.length > 1e6) { 
    //1mb
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }

  var newClient = req.body;
  console.log("creating client: "+ JSON.stringify(newClient.nickName));
  var creado = clientLogic.createClient(newClient);
  if(creado === "OK")
  {
      res.send('OK');
  }
  else
  {
    res.send('Ocurrio un problema');
  }
  console.log("sale de  imprimir");
  res.end();

});


module.exports = router;
