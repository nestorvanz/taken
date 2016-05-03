var fs = require("fs"),
	multer = require("multer"),
	path = require("path");

module.exports = {
	save: function( req, res, dir, fileName, next ){

		var createDirs = function( dirs, path ){
			path += "/" + dirs.splice(0, 1)[0];
			var testPath = __dirname + "/.." + path;

			fs.stat(testPath, function( error ){
				if( error ){
					fs.mkdir(testPath, function( error ){
						if( error ){
							res.status(500).send(error);
						} else if( dirs.length > 0 ) {
							createDirs(dirs, path);
						} else {
							saveFile(path);
						}
					});
				} else if( dirs.length > 0 ) {
					createDirs(dirs, path);
				} else {
					saveFile(path);
				}
			});
		}

		var saveFile = function( path ){
			var resultName;
			console.log(path);
			storage = multer.diskStorage({
				destination: function( req, file, next ){
					next(null, __dirname + "/.." + path);
				},
				filename: function( req, file, next ){
					resultName = fileName +"." +file.originalname.split('.').pop();
					next(null, resultName);
				}
			});

			var upload = multer({ storage: storage }).single("file");
			upload(req, res, function(){
				next(path + "/" + resultName);
			});
		};

		var dirs = ("uploads" + dir).split("/");
		createDirs(dirs, "");
	}
}
