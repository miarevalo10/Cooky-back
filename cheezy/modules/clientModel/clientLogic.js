"use strict";
var baseDatos = require('./baseDatosCollectionClients.js');

/*
	Metodos que ofrece la bd para client logic
	createClient.
	getClient
	updateClient
	deleteClient
	existsClientNickName
	
	clients=
	{
		"id":#,
		"name": x,
		"description":y,
		"picture":p
	}

*/
var existeEsteNickName = function(nickName, funcionCallbackParaAgregarCliente)
{
	string = nickName.trim();
	if (string.indexOf(',') > -1  || string.indexOf(';') > -1 || string.indexOf(':') > -1 ||
	    string.indexOf('{') > -1 ||string.indexOf(' ') > -1 ){
    // letras peligrosas
       funcionCallbackParaAgregarCliente("You cant use any of these simbols : , {  nor space");
	}
	baseDatos.existsClientNickName(string, funcionCallbackParaAgregarCliente);
}

var crearCliente = function (newClient, funcionCallbackResponse)
{
	var nickName = newClient.nickName;
	existeEsteNickName(nickName, function(existeNickName){//verifica que no haya otro usuario con este nickname
			//verificar todos datos cliente, se hace sincronico cuando este retorne
		if(existeNickName)
		{
			//ya existe entonces no se crea
			funcionCallbackResponse(false);
		}
		else
		{
			console.log('no existe');
			baseDatos.createClient(newClient);
			funcionCallbackResponse(true);//ya se verifico que si existe el nickname entonces puede retornar ya
			
		}
	});
}

var traerCliente = function (clientNickname, clientPassword, funcionCallbackResponse)
{
	console.log('validando datos...'+ clientNickname +" "+clientPassword);
	if(clientNickname === undefined || clientPassword === undefined)
	{
		funcionCallbackResponse(null);
	}
	console.log('datos definidos... buscando cliente... ');
	baseDatos.getClient(clientNickname, clientPassword , funcionCallbackResponse);
	
}

var modificarCliente = function (cliente, funcionCallbackResponse)
{
	var nickName = cliente.nickName;
	existeEsteNickName(nickName, function(existeNickName){
		if(existeNickName)
		{
			//ya existe entonces se puede modificar
			console.log('si existe');
			baseDatos.updateClient(cliente);//asincrono
			funcionCallbackResponse(true);//si se modifica
		}
		else
		{
			console.log('no existe');
			funcionCallbackResponse(false);//no existe entonces no se puede modificar
			
		}
	});
}

var borrarCliente = function (newClient, funcionCallbackResponse)
{
	var nickName = newClient.nickName;
	existeEsteNickName(nickName, function(existeNickName){
		if(existeNickName)
		{
			//ya existe entonces se puede borrar
			console.log('si existe');
			baseDatos.deleteClient(newClient.nickName, newClient.password);
			funcionCallbackResponse(true);//si se borra
		}
		else
		{
			console.log('no existe');
			funcionCallbackResponse(false);//no existe entonces no se puede borrar
			
		}
	});
}


module.exports = {
	existsClientNickName : existeEsteNickName, //done
	createClient: crearCliente,					//done
	getClient: traerCliente,
	updateClient: modificarCliente,
	deleteClient: borrarCliente
};