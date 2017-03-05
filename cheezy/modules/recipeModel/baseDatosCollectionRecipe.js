"use strict";
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/cheezyDataBase';



var crearReceta = function(recipe, callback){
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto sincrono 
        console.log('1 crear receta base datos');
        crearRecetaDB(recipe, db,  function(booleanAgrego)
        {
          console.log('2 crear receta base datos');
          console.log('este es el callback! resultado, agrego la receta '+booleanAgrego);
          
          db.close();
          console.log('3 crear receta base datos');
          callback();
        });
      });
}
var crearRecetaDB = function(recipe, db, callback) {
    var collection = db.collection('recipeCollection');
    console.log(JSON.stringify(recipe));
    console.log("creando receta  a "
      +recipe.nickName+ " en carpeta "+recipe.carpetas[0].folder+
       " receta "+recipe.carpetas[0].recetasDelFolder[0].title);
    
    collection.find({nickName:recipe.nickName,
                    'carpetas.folder':recipe.carpetas[0].folder}).toArray(function(err, results){
    //supone que el cliente ya tiene el folder
          if(err) {
              console.log('error occured: ' + err);
              callback(false);
          }
          else
          {

            console.log("Cliente existe y folder existe =  "+JSON.stringify(results[0]));
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
                                              	console.log("\n El cliente NO tiene registros ");
                                                // si no hay nada de este cliente
                                                var writeResponse = collection.insert(recipe);
                                                callback(true);
                                              }
                                              else
                                              {
                                                //no esta el folder pero si el cliente
                                                console.log("\n El cliente tiene registros y el folder NO existe");
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
              console.log("\n El cliente tiene registros y el folder existe");
              /**var posDeFolder = -1;
              var carpetaClientes =results[0].carpetas;
              for(var i=0;i<carpetaClientes.length;i++)
              {
              	if(carpetaClientes[i].folder === recipe.carpetas[0].folder)
              	{
              		posDeFolder=i;
              		console.log("\n  Folder numero "+i+" \n");
              		i=carpetaClientes.length;
              	}
              }*/

            var writeResponse = collection.update({nickName:recipe.nickName,'carpetas.folder':recipe.carpetas[0].folder}, 
		        { 
		            //agrega a la lista de recetas la nueva receta dentro del folder
		            $push: {'carpetas.$.recetasDelFolder':recipe.carpetas[0].recetasDelFolder[0]}
		        });
		        callback(true);
              	
    	              
            }
          }
     }); 
}



var verificarTituloReceta = function(nickName, titulo, respuesta){
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto sincrono 
        console.log('1 verificarTituloReceta');
        verificarTituloRecetaDB(nickName,titulo, db,function(existeElTitulo)
        {
          console.log('2 verificarTituloReceta');
          console.log('este es el callback! existe el titulo= '+existeElTitulo);
          
          db.close();
          respuesta(existeElTitulo);
          console.log('3 verificarTituloReceta');
        });
      });
}
var verificarTituloRecetaDB = function(nickname,titulo, db, callback) {
    var collection = db.collection('recipeCollection');
    console.log("verificando el titulo de  a "+ titulo +" en las carpetas de "+nickname);
    
    collection.find({nickName:nickname,
                    'carpetas.recetasDelFolder.title':titulo}).toArray(function(err, results){
    //supone que el cliente ya tiene el folder
          if(err) {
              console.log('error occured: ' + err);
              callback(false);
          }
          else
          {
          		if(results.length === 0)
          		{
          			console.log("The recipe IS NEW");
          		  callback(false);
          		}
          		else
          		{
          			console.log("\n YA HAY UNA RECETA CON ESTE NOMBRE");
          	    callback(true);
          		}
        	}
    });
}



var like = function(nickName, titulo, callback){
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto sincrono 
        console.log('1 dar like');
        likeDB(nickName,titulo, db,function(diolike)
        {
          console.log('2 dar like');
          console.log('este es el callback! dio like= '+diolike);
          
          db.close();
          console.log('3 dar like');
          callback();
        });
      });
}
var likeDB = function(nickname,titulo, db, callback) {
    var collection = db.collection('recipeCollection');
    console.log("like al titulo de  a "+ titulo +" en las carpetas de "+nickname);
    
    collection.find({nickName:nickname,
                    'carpetas.recetasDelFolder.title':titulo}).toArray(function(err, results){
    //supone que el cliente ya tiene el folder
          if(err) {
              console.log('error occured: ' + err);
              callback(false);
          }
          else
          {
              if(results.length === 0)
              {
                console.log("No hay recetas para este usuario");
                callback(false);
              }
              else
              {
                var writeResponse = collection.update({nickName:nickname,'carpetas.recetasDelFolder.title':titulo}, 
                {//agrega un like
                  $inc: {likesTotal: 1}
                }
                //,'carpetas.$.recetasDelFolder.$.likes':1
                );
                collection.find({nickName:nickname,'carpetas.recetasDelFolder.title':titulo})
                .forEach(function(post) {
                    if (post.carpetas) {
                        post.carpetas.forEach(function(folder) {
                          if (folder.recetasDelFolder) {
                            //para cada receta en el folder reviso si el titulo coincide
                              folder.recetasDelFolder.forEach(function(receta) {
                                if (receta.title) {
                                    if (receta.title === titulo) {
                                      receta.likes += 1;
                                    }
                                }
                              });
                          }
                        });

                      collection.save(post);
                      callback(true);
                    }
                });
              }
          }
    });
}




var traerRecetaPorTipo= function(tipo, likesMinimos, callbackListaRecetas){
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto sincrono 
        traerRecetaTipoDB(tipo,likesMinimos, db,  function(listaRecetas)
        {
          db.close();
          callbackListaRecetas(listaRecetas);
        });
      });
}
var traerRecetaTipoDB = function(tipo, likesMinimos, db,  callback) {
    // Get the clients collection
    var collection = db.collection('recipeCollection');
    // Find some clients
    var listaRecetas=[];
    console.log("trayendo mejores recetas por tipo "+ tipo);
    collection.find({'carpetas.recetasDelFolder.tipo':tipo,
                     'carpetas.recetasDelFolder.likes':{ $gte: likesMinimos }})
    .toArray(function(err, results){
          if(err) {
              console.log('error occured: ' + err);
              callback(false);
          }
          else
          {
            //docs es la respuesta a la query
            if(results.length === 0)
            {
              callback([]);
            }
            else
            {
              for(var i=0; i<results.length;i++)
              {
                var usuarioActual = results[i];
                for(var k=0; k< usuarioActual.carpetas.length;k++)
                {
                    var carpetaActual = usuarioActual.carpetas[i];
                    for(var j=0; j< carpetaActual.recetasDelFolder.length;j++)
                    {
                        var recetaActual = carpetaActual.recetasDelFolder[j];
                        if (recetaActual.tipo === tipo && recetaActual.likes >= likesMinimos)
                        {
                          agregarRecetaLista(listaRecetas,recetaActual);
                        }
                    }
                }
              }
              //console.log(listaRecetas);
              callback(listaRecetas);
            }
          }
          
     });
}

function agregarRecetaLista(lista,receta)
{
  //es como un insertion sort
  lista.push(receta);
  var i = lista.length-1;
  while(i>0 && lista[i].likes > lista[i-1])
  {
    var medio=lista[i-1];
    lista[i-1] = lista[i];
    lista[i] = medio;
    i--;
  }
}


var traerRecetaPorUsuario= function(nickname,  callbackListaRecetas){
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto sincrono 
        traerRecetaUsuarioDB(nickname, db,  function(listaRecetas)
        {
          db.close();
          callbackListaRecetas(listaRecetas);
        });
      });
}
var traerRecetaUsuarioDB = function(nickname, db,  callback) {
    // Get the clients collection
    var collection = db.collection('recipeCollection');
    // Find some clients
    var listaRecetas=[];
    console.log("trayendo mejores recetas de "+nickname);
    collection.find({nickName:nickname})
    .toArray(function(err, results){
          if(err) {
              console.log('error occured: ' + err);
              callback(false);
          }
          else
          {
            //docs es la respuesta a la query
            callback(results[0]);
          }
          
     });
}





var borrarRecetaDeFavs = function(receta){
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto sincrono 
        console.log('1 eliminar receta base datos');
        eliminarRecetaDB(receta, db,  function(booleanElimino)
        {
          console.log('2 eliminar receta base datos');
          console.log('este es el callback! resultado, elimino receta '+booleanElimino);
          db.close();
        });
        console.log('3 eliminar receta base datos');
      });
}
var eliminarRecetaDB = function(receta, db,  callback) {
    // Get the clients collection
    var collection = db.collection('recipeCollection');
    // Find some clients
    console.log("eliminando de "+receta.nickName + " la receta "+ receta.title);
    collection.find({nickName:receta.nickName,'carpetas.recetasDelFolder.title':receta.title})
      .forEach(function(post) {
            if (post.carpetas) {
                        post.carpetas.forEach(function(folder) {
                          if (folder.recetasDelFolder) {
                            //para cada receta en el folder reviso si el titulo coincide
                              folder.recetasDelFolder.forEach(function(recetaB) {
                                if (recetaB.title) {
                                    if (recetaB.title === receta.title) {
                                      //console.log(folder.recetasDelFolder);
                                      folder.recetasDelFolder = folder.recetasDelFolder.filter(function(el) { return el.title !== receta.title; });
                                    }
                                }
                              });
                          }
                        });

                      collection.save(post);
                      callback(true);
            }
      });

}


module.exports = {
  createRecipe: crearReceta,
  verificarTituloReceta:verificarTituloReceta,
  likeRecipe: like,
  getRecipeByType: traerRecetaPorTipo,
  getRecipeByUser: traerRecetaPorUsuario,
  deleteRecipe:borrarRecetaDeFavs
};

