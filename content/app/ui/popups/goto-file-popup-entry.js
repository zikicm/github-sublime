define("content/app/ui/popups/goto-file-popup-entry", function(require, exports, module) {

	/**
	 * Defines an entry to goto file popup.
	 */
	var GotoFilePopupEntry = Class(Object, {

		/**
		 * Class constructor.
		 * @param  {FileElementWrapper} 	fileElementWrapper
		 */
		constructor : function( fileElementWrapper ) {
			this._fileElementWrapper = fileElementWrapper;
		},

		/**
		 * Assigned file element wrapper.
		 * @type {FileElementWrapper}
		 */
		fileElementWrapper : {
			get : function() {
				return this._fileElementWrapper;
			}
		},

		/**
		 * Returns string representation of file element wraper 
		 * (its file name).
		 * @return {String}
		 */
		toString : function() {
			return this._fileElementWrapper.filePath.nameWithExt;
		},

	});

	module.exports = GotoFilePopupEntry;

});
