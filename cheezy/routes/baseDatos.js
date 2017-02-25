var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/cheezyDataBase';

// Use connect method to connect to the server
// se ejecuta apenas se abre el servidor
var conectarBD = MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to data base "+url);

  db.close();
});
















var existeEsteNickName = function(nickName){
    var existe =false;
    
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto sincrono 
        console.log('1');
        encontrarNickName(nickName, db, existe, function(exists)
        {
          existe = exists;
          console.log('este es el callback! resultado '+ exists);
          console.log('2');
          db.close();
        });
        console.log('3');
      });
    return existe;
}
var encontrarNickName = function(nickName, db, existe, callback) {
    // Get the clients collection
    var collection = db.clientCollection;
    // Find some clients
    console.log("buscando a: "+"nickName"+'"'+nickName+'"');
    var items = collection.find({"nickName":'"'+nickName+'"'}); 

    console.log("Found the following records ");
    //me esta imprimiendo un items horrible
    console.log(items);
    //docs es la respuesta a la query
    if(items.length === 0)
    {
      callback(false);
    }
    else
    {
      callback(true); //repetido
    }

}












var crearCliente = function(cliente){
    agregado = false;
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto sincrono 
        console.log('1');
        crearClienteDB(cliente, db, agregado, function(booleanAgrego)
        {
          if(!booleanAgrego){agregado =false}
          console.log('este es el callback! resultado, agrego al cliente '+agregado);
          console.log('2');
          db.close();
        });
        console.log('3');
      });
    return agregado;
}
var crearClienteDB = function(cliente, db, agregado, callback) {
    // Get the clients collection
    var collection = db.clientCollection;
    // Find some clients
    console.log("creanndo a "+cliente.nickName);
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


















module.exports = {
  existsClientNickName : existeEsteNickName, //done
  createClient: crearCliente,
  /**getClient: traerCliente,
  updateClient: modificarCliente,
  deleteClient: borrarCliente*/


};


/*

var existeEsteNickName = function(nickName){
    var existe =false;
    
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto asincrono 
        console.log('1');
        encontrarNickName(nickName, db, existe, function(exists)
        {
          existe = exists;
          console.log('este es el callback! resultado '+ exists);
          console.log('2');
          db.close();
        });
        console.log('3');
      });
    return existe;
}
var encontrarNickName = function(nickName, db, existe, callback) {
  // Get the clients collection
  var collection = db.collection('clients');
  // Find some clients
  console.log("buscando a: "+"nickName"+'"'+nickName+'"');
  collection.find({"nickName":'"'+nickName+'"'}).toArray(function(err, items) {
    assert.equal(err, null);
    console.log("Found the following records ");
    console.log(items.length);
    //docs es la respuesta a la query
    if(items.length === 0)
    {
      callback(false);
    }
    else
    {
      callback(true);
    }
    
  });
}



*/