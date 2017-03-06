"use strict";
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = process.env.MONGODB_URI;

// Use connect method to connect to the server
// se ejecuta apenas se abre el servidor
var conectarBD = MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to data base collection clients "+url);

  db.close();
});







var existeEsteNickName = function(nickName, funcionCallbackParaAgregarCliente){
    var existe =false;

      MongoClient.connect(url, function(err, db)
      {
        //esta haciendo esto sincrono
        console.log('1 existe nickName?');
        encontrarNickName(nickName, db, existe, function(exists)//esta funcion es el callback de abajo
        {
          existe = exists;
          console.log('2 existe nickName? este es el callback! resultado '+ exists);
          db.close();
          console.log('3 existe nickName? Devuelve '+existe);
          funcionCallbackParaAgregarCliente(existe);
        });

      });
}
var encontrarNickName = function(nickNameC, db, existe, callback) {
    // Get the clients collection
    var collection = db.collection('clientCollection');
    // Find some clients
    console.log("buscando a: nickName"+'"'+nickNameC+'"');
    collection.find({nickName:nickNameC}).toArray(function(err, results){
          if(err) {
              console.log('error occured: ' + err);
              callback(false);
          }
          else
          {
            console.log("Found the following records para el NickName "+ JSON.stringify(results[0]));
            //docs es la respuesta a la query
            if(results.length === 0)
            {
              callback(false);
            }
            else
            {
              callback(true); //repetido
            }
          }

     });
}












var crearCliente = function(cliente){
      MongoClient.connect(url, function(err, db)
      {
        //esta haciendo esto sincrono
        console.log('1 crear cliente base datos');
        crearClienteDB(cliente, db,  function(booleanAgrego)
        {
          console.log('2 crear cliente base datos');
          console.log('este es el callback! resultado, agrego al cliente '+booleanAgrego);

          db.close();
        });
        console.log('3 crear cliente base datos');
      });
}
var crearClienteDB = function(cliente, db, callback) {
    // Get the clients collection
    var collection = db.collection('clientCollection');
    // Find some clients
    console.log("creando a "+cliente.nickName);
    var writeResponse = collection.insert(cliente);

    console.log("Response "+writeResponse);
    //docs es la respuesta a la query
    if(writeResponse.writeConcernError === undefined)
    {
      callback(true);//agrego
    }
    else
    {
      callback(false); //no agrego
    }

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










var borrarCliente = function(nickName, password){
      MongoClient.connect(url, function(err, db)
      {
        //esta haciendo esto sincrono
        console.log('1 eliminar cliente base datos');
        eliminarClienteDB(nickName, password, db,  function(booleanElimino)
        {
          console.log('2 eliminar cliente base datos');
          console.log('este es el callback! resultado, elimino al cliente '+booleanElimino);
          db.close();
        });
        console.log('3 eliminar cliente base datos');
      });
}
var eliminarClienteDB = function(nickNameC, passwordC, db,  callback) {
    // Get the clients collection
    var collection = db.collection('clientCollection');
    // Find some clients
    console.log("eliminando a "+nickNameC + " con password "+ passwordC);
    collection.remove({nickName:nickNameC, password:passwordC});

}




module.exports = {
  existsClientNickName : existeEsteNickName, //done
  createClient: crearCliente,
  getClient: traerCliente,
  updateClient: modificarCliente,
  deleteClient: borrarCliente

};
