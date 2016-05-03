module.exports = function( auth, databases ){
	var router = require("express").Router();
	var controller = require("../controllers/files")(databases.taken); // <- Change the name of database

	// Get
	router.get("/files", auth.api, controller.leer);
	router.get("/files/:id", auth.api, controller.porID);
	// // Post
	router.post("/files", auth.api, controller.agregar);
	// // Put (Update)
	router.put("/files/release", auth.api, controller.liberar);
	router.put("/files/take", auth.api, controller.tomar);
	// router.put("/files", auth.api, controller.actualizar);
	// // Delete
	// router.delete("/files/:id", auth.api, controller.eliminar);

	return router;
};