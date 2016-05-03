module.exports = function( auth, databases ){
	var router = require("express").Router();
	var controller = require("../controllers/usuarios")(databases.taken); // <- Change the name of database

	// Use web cookie for authentication
	router.use("/session/web", auth.cookie());
	
	// Get
	router.get("/session", auth.api, controller.autenticado);
	// Post
	router.post("/session/web", controller.autenticarWeb);
	// Delete
	router.delete("/session/web", controller.salir);

	return router;
};