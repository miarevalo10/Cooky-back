"use strict";
var baseDatosCliente = require('../clientModel/baseDatosCollectionClients.js');
var baseDatosRecipe = require('./baseDatosCollectionRecipe.js');

/*
	Metodos que ofrece la bd para client logic
  createRecipe: crearReceta,
  getRecipeByType: traerRecetaPorTipo,
  getRecipeByUser: traerRecetaPorUsuario,
  likeRecipe: likeAReceta
*/

var crearReceta = function (nickname,password, folder, receta, callback)
{
	baseDatosCliente.getClient(nickname,password, function(cliente){
		//el nickname y el password autentican que si es un cliente original
		if(cliente !== null)
		{
			baseDatosRecipe.verificarTituloReceta(nickname, receta.title, function(existeElTitulo){
				if(!existeElTitulo)
				{
					var recipe = {
					"nickName": nickname,"likesTotal":0,"carpetas": [{"folder":folder,"recetasDelFolder":[receta]}]};

					baseDatosRecipe.createRecipe(recipe);
					callback("OK");
				}
				else
				{
					callback("NO");
				}
			});
		}
		else
		{
			callback("NO");
		}
	});
}


var like = function (clientNickname, titulo)
{
	baseDatosRecipe.likeRecipe(clientNickname, titulo);
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
  createRecipe: crearReceta,
  /**getRecipeByType: traerRecetaPorTipo,
  getRecipeByUser: traerRecetaPorUsuario,*/
  likeRecipe: like
};