module.exports = function( auth, databases ){
	var router = require("express").Router();
	var controller = require("../controllers/concept")(databases.name); // <- Change the name of database

	// Get
	router.get("/concept", auth.api, controller.todos);
	router.get("/concept/:id", auth.api, controller.porID);
	// Post
	router.post("/concept", auth.api, controller.agregar);
	// Put (Update)
	router.put("/concept", auth.api, controller.actualizar);
	// Delete
	router.delete("/concept/:id", auth.api, controller.eliminar);

	return router;
};