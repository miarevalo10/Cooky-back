var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var clientLogic = require("./clientLogic.js")

// se usa /users/


router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));


router.get('/existsClient', function(req, res, next) {
  console.log("ENTRA exist client?");
  if (req.body.length > 1e6) { 
    //1mb
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }

  var newClient = req.body;
  console.log("verifying client "+ JSON.stringify(newClient.nickName));
  clientLogic.existsClientNickName(newClient.nickName , function(respuesta){
	  	res.send(respuesta);// true, false o error
	    console.log("TERMINA exist client?");
	    res.end();
  });
  
});


router.get('/getClient', function(req, res, next) {
  console.log("ENTRA Get client");

  if (req.body.length > 1e6) { 
    //1mb
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }

  var client = req.body;
  console.log("retrieving client: "+ JSON.stringify(client));
  clientLogic.existsClientNickName(client, function(respuesta){
  		console.log(JSON.stringify(respuesta));
  		res.send(JSON.stringify(respuesta));// true, false o error
  		console.log("TERMINA get client");
  		res.end();
  });
  
});








//peticiones POST

router.post('/createClient', function(req, res, next) {
  console.log("ENTRA createClient");

  if (req.body.length > 1e6) { 
    //1mb
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }

  var newClient = req.body;
  console.log("creating client: "+ JSON.stringify(newClient.nickName));
  clientLogic.createClient(newClient, function (creado){
    //mando esta funcion como callback para que todo sea sincronico
    if(creado)//devuelve boolean
    {
        console.log("paso final, ya se esta creando en paralelo");
        res.send('OK');
    }
    else
    {
      console.log("paso final, no se agrega nada porque nickname repetido");
      res.send('Ocurrio un problema');
    }
    console.log("TERMINA createClient");
    res.end();
  });
});


module.exports = router;
