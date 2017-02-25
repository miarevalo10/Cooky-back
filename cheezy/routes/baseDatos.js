var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
// se ejecuta apenas se abre el servidor
var conectarBD = MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

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
    var collection = db.collection('clients');
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




module.exports = {
  existsClientNickName : existeEsteNickName, //done
  /**createClient: crearCliente,
  getClient: traerCliente,
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