(function(){
	angular.module("fnc", [])
	.factory("fnc", ["$http", function( $http ){
		var fnc = {
			api: {
				delete: function( uri, callback ){
					uri += uri.indexOf("?") == -1 ? "?":"&" + (new Date).getTime().toString();
					$http.delete(uri)
					.success(function(data){
						callback(data)
					}).error(this.error);
				},
				error: function( data, status, header, config ){
					
					if( status == 401 ){
						location.reload();
					}
					else if ( fnc.api.message ){
						fnc.api.message.error("Error " +status, data);
					}
					else {
						alert("Error " + status + "\n" + data);
					}
				},
				get: function( uri, callback ){
					uri += (uri.indexOf("?") == -1 ? "?":"&") + (new Date).getTime().toString();
					$http.get(uri)
					.success(function(data){
						callback(data)
					}).error(this.error);
				},
				message: function( driver ){
					this.message = driver;
				},
				post: function( uri, data, callback ){
					uri += uri.indexOf("?") == -1 ? "?":"&" + (new Date).getTime().toString();

					$http.post(uri, data)
					.success(function(data){
						callback(data)
					}).error(this.error);
				},
				put: function( uri, data, callback, formData ){
					uri += uri.indexOf("?") == -1 ? "?":"&" + (new Date).getTime().toString();

					$http.put(uri, data)
					.success(function(data){
						callback(data)
					}).error(this.error);
				},
			},
			clone: function() {
				var src, copyIsArray, copy, name, options, clone,
					target = arguments[0] || {},
					i = 1,
					length = arguments.length,
					deep = false;

				// Handle a deep copy situation
				if ( typeof target === "boolean" ) {
					deep = target;

					// skip the boolean and the target
					target = arguments[ i ] || {};
					i++;
				}

				// Handle case when target is a string or something (possible in deep copy)
				if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
					target = {};
				}

				// extend jQuery itself if only one argument is passed
				if ( i === length ) {
					target = this;
					i--;
				}

				for ( ; i < length; i++ ) {
					// Only deal with non-null/undefined values
					if ( (options = arguments[ i ]) != null ) {
						// Extend the base object
						for ( name in options ) {
							src = target[ name ];
							copy = options[ name ];

							// Prevent never-ending loop
							if ( target === copy ) {
								continue;
							}

							// Recurse if we're merging plain objects or arrays
							if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
								if ( copyIsArray ) {
									copyIsArray = false;
									clone = src && jQuery.isArray(src) ? src : [];

								} else {
									clone = src && jQuery.isPlainObject(src) ? src : {};
								}

								// Never move original objects, clone them
								target[ name ] = jQuery.extend( deep, clone, copy );

							// Don't bring in undefined values
							} else if ( copy !== undefined ) {
								target[ name ] = copy;
							}
						}
					}
				}

				// Return the modified object
				return target;
			},
			getQueryParam: function( name, url ) {
				if (!url) url = window.location.href;
				url = url.toLowerCase(); // This is just to avoid case sensitiveness  
				name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
				var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
					results = regex.exec(url);
				if (!results) return null;
				if (!results[2]) return "";
				return decodeURIComponent(results[2].replace(/\+/g, " "));
			},
			hasString: function( object, key, value ){
				return object[key].toLowerCase().indexOf(value) >= 0;
			},
			index: function( arrayObject ){
				for (var i = 0; i < arrayObject.length; i++) {
					arrayObject[i].index = i;
				};
				return arrayObject;
			},
			join: function( obj, objAttr, array, arrayAttr ){
				if( arguments.length == 3 ) arrayAttr = objAttr;
				if( obj && array ){
					for (var i = 0; i < array.length; i++) {
						if( array[i][arrayAttr] == obj[objAttr] )
							return array[i];
					};
				} else {
					return obj;
				}
			},
			local: {
				clear: function( key ){
					localStorage.removeItem(key);
				},
				get: function( key ){
					localStorage.getItem(key);
				},
				getObject: function( key ){
					return JSON.parse(localStorage.getItem(key));
				},
				set: function( key, value ){
					localStorage.setItem(key, value);
				},
				setObject: function( key, object ){
					localStorage.setItem(key, JSON.stringify(object));
				}
			}
		};
		return fnc;
	}]).factory("authInterceptor", [function() {
		return {
			request: function( config ){
				config.headers = config.headers || {};
				config.headers.token = localStorage.getItem("token") || sessionStorage.getItem("token");
				return config;
			}
		};
	}]).config(["$httpProvider", function ($httpProvider) {
		$httpProvider.interceptors.push("authInterceptor");
	}]);;
})();