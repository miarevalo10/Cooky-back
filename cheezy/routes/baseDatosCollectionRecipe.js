var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/cheezyDataBase';

// Use connect method to connect to the server
// se ejecuta apenas se abre el servidor
var conectarBD = MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to data base Collection recipe"+url);

  db.close();
});


var crearReceta = function(recipe){
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto sincrono 
        console.log('1 crear receta base datos');
        crearRecetaDB(recipe, db,  function(booleanAgrego)
        {
          console.log('2 crear receta base datos');
          console.log('este es el callback! resultado, agrego la receta '+booleanAgrego);
          
          db.close();
        });
        console.log('3 crear receta base datos');//no se hace hasta que se haga el callback
      });
}
var crearRecetaDB = function(recipe, db, callback) {
    var collection = db.collection('recipeCollection');
    console.log("creando receta  a "
      +recipe.nickName+ " en carpeta "+recipe.carpetas[0].folder+
       " receta "+recipe.carpetas[0].recetasDelFolder[0].title);
    
    collection.find({nickName:recipe.nickName,
                    carpetas.folder:recipe.carpetas[0].folder}).toArray(function(err, results){
    //supone que el cliente ya tiene el folder
          if(err) {
              console.log('error occured: ' + err);
              callback(false);
          }
          else
          {
            console.log("Found the following records para el cliente "+JSON.stringify(results[0]));
            //docs es la respuesta a la query
            if(results.length === 0)
            { 
              // si no hay carpeta para ese cliente.. existe el cliente?
                              collection.find({nickName:recipe.nickName}).toArray(function(err, results)
                              {
                                            if(err) {
                                                console.log('error occured: ' + err);
                                                callback(false);
                                            }
                                            else
                                            {
                                              console.log("Found the following records para el cliente "
                                                +JSON.stringify(results[0]));
                                              //docs es la respuesta a la query
                                              if(results.length === 0)
                                              {
                                                // si no hay nada de este cliente
                                                var writeResponse = collection.insert(recipe);
                                                callback(true);
                                              }
                                              else
                                              {
                                                //no esta el folder pero si el cliente
                                                var writeResponse = collection
                                                .update({nickName:recipe.nickName}, 
                                                { 
                                                  //agrega a la lista de folders el nuevo folder
                                                    $push: { carpetas: recipe.carpetas[0] } 
                                                });
                                                callback(true);
                                              }
                                            }
                              });
            }
            else
            {
              //ya hay ese folder y ese cliente (lo más probable)
              var writeResponse = collection.update({nickName:recipe.nickName}, 
              { 
                //agrega a la lista de recetas la nueva receta dentro del folder
                 $push: { recetasDelFolder: recipe.carpetas[0].recetasDelFolder[0] } 
              });
              callback(true);
            }
          }
     }); 
}












var traerCliente = function(nickName, password, coneccionConResponse){
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto sincrono 
        console.log('1 traer cliente base datos');
        traerClienteDB(nickName, password, db,  function(booleanTrajo, objetoCliente)
        {
          console.log('2 traer cliente base datos');
          console.log('este es el callback! resultado, agrego al cliente '+booleanTrajo);
          db.close();
          coneccionConResponse(objetoCliente);
        });
        console.log('3 traer cliente base datos');
      });
}
var traerClienteDB = function(nickNameC, passwordC, db,  callback) {
    // Get the clients collection
    var collection = db.collection('clientCollection');
    // Find some clients
    console.log("trayendo a "+nickNameC + " con password "+ passwordC);
    collection.find({nickName:nickNameC, password:passwordC}).toArray(function(err, results){
          if(err) {
              console.log('error occured: ' + err);
              callback(false);
          }
          else
          {
            console.log("Found the following records para el cliente "+JSON.stringify(results[0]));
            //docs es la respuesta a la query
            if(results.length === 0)
            {
              callback(false , null);
            }
            else
            {
              callback(true , results); //lo encontro
            }
          }
          
     }); 

}












var modificarCliente = function(cliente){
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto sincrono 
        console.log('1 modificar cliente base datos');
        modificarClienteDB(cliente, db,  function(booleanM)
        {
          console.log('2 modificar cliente base datos');
          console.log('este es el callback! resultado, modifico al cliente '+booleanM);
          db.close();
        });
        console.log('3 modificar cliente base datos');
      });
}
var modificarClienteDB = function(cliente, db,  callback) {
    // Get the clients collection
    var collection = db.collection('clientCollection');
    // Find some clients
    console.log("trayendo a "+cliente.nickName + " con password "+ cliente.password);
    
    var writeResponse = collection.update({nickName:cliente.nickName, password:cliente.password}, 
                                          { 
                                            $set: { 
                                                      picture: cliente.picture,
                                                      description: cliente.description 
                                                  } 
                                          });

    console.log("Response "+writeResponse);
    //docs es la respuesta a la query
    if(writeResponse.writeConcernError === undefined)
    {
      callback(true);//modifico
    }
    else
    {
      callback(false); //no modifico
    }

}



module.exports = {
  createRecipe: crearReceta,
  /**getRecipeByType: traerRecetaPorTipo,
  getRecipeByUser: traerRecetaPorUsuario,
  likeRecipe: likeAReceta
  deleteRecipe:borrarRecetaDeFavs*/
};

