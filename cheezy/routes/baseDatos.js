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
var encontrarNickName = function(nickName, db, existe, callback) {
    // Get the clients collection
    var collection = db.collection('clientCollection');
    // Find some clients
    console.log("buscando a: nickName"+'"'+nickName+'"');
    collection.find({"nickName":'"'+nickName+'"'}).toArray(function(err, results){
          if(err) {
              console.log('error occured: ' + err);
              callback(false);
          }
          else
          {
            console.log("Found the following records "+results);
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
    agregado = false;
      MongoClient.connect(url, function(err, db) 
      {
        //esta haciendo esto sincrono 
        console.log('1 crear cliente base datos');
        crearClienteDB(cliente, db, agregado, function(booleanAgrego)
        {
          if(booleanAgrego){agregado =true}
          console.log('2 crear cliente base datos');
          console.log('este es el callback! resultado, agrego al cliente '+agregado);
          
          db.close();
        });
        console.log('3 crear cliente base datos');
      });
    return agregado;
}
var crearClienteDB = function(cliente, db, agregado, callback) {
    // Get the clients collection
    var collection = db.collection('clientCollection');
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