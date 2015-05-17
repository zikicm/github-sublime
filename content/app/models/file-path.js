define("content/app/models/file-path", function(require, exports, module) {

	/**
	 * Simple class used for handling of file paths.
	 */
	var FilePath = Class({

		$statics : {
			// TODO : Check if regex is valid
			REGEX_FOLDER_SEPARATOR : /\/|\)/g,
			EXTENSION_SEPARATOR : '.',
		},

		/**
		 * Class constructor
		 * @param  	{String}	path 	Full file path.
		 */
		constructor : function(path) {
			this._path = path;
			this._name = null;
			this._extension = null;
			this._nameWithExt = null;
			this._segments = null;
			this._dirname = null;
			this._initialize();
		},

		/**
		 * Name of the file without extension.
		 * @type {String}
		 */
		name : {
			get : function() {
				return this._name;
			}
		},

		/**
		 * File extension (without leading '.');
		 * @type {String}
		 */
		extension : {
			get : function() {
				return this._extension;
			}
		},

		/**
		 * File name with extension (example file.txt).
		 * @type {String}
		 */
		nameWithExt : {
			get : function() {
				return this._nameWithExt;
			}
		},

		/**
		 * Full file path (example: a/b/c.txt)
		 * @type {String}
		 */
		path : {
			get : function() {
				return this._path;
			}
		},

		/**
		 * Segments from which path is made. For path a/b/c/text.txt
		 * result will be [a, b, c, text.txt].
		 * @type {String[]}
		 */
		segments : {
			get : function() {
				return this._segments;
			}
		},

		/**
		 * Returns name of the first directory in path.
		 * @type {String}
		 */
		dirname : {
			get : function() {
				return this._dirname;
			}
		},

		/**
		 * Initializes object based on set path.
		 */
		_initialize : function() {

			var segments = this._path.split( FilePath.REGEX_FOLDER_SEPARATOR );
			if (segments.length > 0) {

				this._segments = segments;
				var nameWithExt = segments[ segments.length - 1 ];
				this._nameWithExt = nameWithExt;
				this._name = nameWithExt.split( FilePath.EXTENSION_SEPARATOR )[0];
				this._extension = nameWithExt.split( FilePath.EXTENSION_SEPARATOR )[1];

				if (segments.length > 1) {
					this._dirname = segments[0];
				}

			}

		}

	});

	module.exports = FilePath;
	
});