if (FW === undefined) {
   var FW = {};
}

FW.silentUI = function(userOptions) {
	
	var that = {};
	
	that.init = $.noop;
	
	that.onDeleteSuccess = $.noop;
	
	that.onSaveSuccess = $.noop;
	
	that.getOptions = $.noop;
	
	return that;
}