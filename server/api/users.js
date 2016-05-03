module.exports = function( auth, databases ){
	var router = require("express").Router();
	var controller = require("../controllers/usuarios")(databases.taken); // <- Change the name of database

	controller.createRoot();

	// Get
	// router.get("/controladores", controller.todos);
	router.get("/usuarios/:id", auth.api, controller.porID);
	// Post
	router.post("/usuarios/foto", auth.api, controller.foto);
	// Put (Update)
	router.put("/usuarios", auth.api, controller.actualizar);
	// Delete
	// router.delete("/controladores/:id", controller.eliminar);

	return router;
};