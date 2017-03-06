"use strict";
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var recipeLogic = require("./recipeLogic.js")

// se usa /recipes/


router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));



router.post('/addRecipe', function(req, res, next) {
  console.log("ENTRA add recipe");
  if (req.body.length > 1e6) { 
    //1mb
    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }
  var format = req.body;
  var name = format.nickName;
  var pass = format.password;
  var folder = format.folder;
  var recipe = format.recipe;
  console.log("creando receta: "+ JSON.stringify(format));
  recipeLogic.createRecipe(name, pass, folder, recipe, function(sePuedeAgregar){
        //se asume que nada sale mal guardando entonces crea
        res.send(sePuedeAgregar);
        console.log("TERMINA add recipe");
        res.end();
  });
});


router.post('/like', function(req, res, next) {
  console.log("ENTRA dar like");
  if (req.body.length > 1e6) { 
    //1mb FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }
  var receta = req.body;
  console.log("dar like al client "+ receta.nickName+ " y receta "+receta.title);
  recipeLogic.likeRecipe(receta.nickName, receta.title);
  res.send("OK");
  console.log("TERMINA dar like");
  res.end();
});


router.post('/getRecipeByType', function(req, res, next) {
  console.log("ENTRA get by type");
  if (req.body.length > 1e6) { 
    //1mb FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }
  var tipo = req.body;
  console.log("verifying type "+ tipo.type);
  recipeLogic.getRecipeByType(tipo.type , function(respuesta){
	  	res.send(respuesta);//la lista
      console.log("\n Mejores por tipo \n"+ respuesta);
	    console.log("TERMINA get by type");
	    res.end();
  });
  
});


router.post('/getRecipesByUser', function(req, res, next) {
  console.log("ENTRA get by user");
  if (req.body.length > 1e6) { 
    //1mb FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }
  var user = req.body;
  console.log("verifying user "+ user.nickName);
  recipeLogic.getRecipeByUser(user.nickName,user.password , function(respuesta){
      res.send(respuesta);//la lista
      console.log("TERMINA get by user");
      res.end();
  });
  
});


router.post('/recipeIngredients', function(req, res, next) {
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




router.post('/deleteRecipe', function(req, res, next) {
  console.log("ENTRA delete recipe");

  if (req.body.length > 1e6) { 
    //1mb FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
    req.connection.destroy();
  }
  var recipe = req.body;
  console.log("deleting recipe: "+ recipe.title + " of client "+ recipe.nickName);
  recipeLogic.deleteRecipe(recipe, function (borrado){
    //mando esta funcion como callback para que todo sea sincronico
    if(borrado)//devuelve boolean
    {
        console.log("paso final, ya se esta borrando en paralelo si el password era correcto");
        res.send('BORRADO si el password era correcto');
    }
    else
    {
      console.log("paso final, no se borra porque no hay un registro así");
      res.send('NO');
    }
    console.log("TERMINA delete");
    res.end();
  });
});


module.exports = router;
