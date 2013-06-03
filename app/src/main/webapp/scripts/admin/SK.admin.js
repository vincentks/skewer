if (SK === undefined) {
   var SK = {};
}

SK.admin = function(userOptions) {

	var that = {};
	
	that.load = function() {
		$('#addIDsToExistingClients').click(function() {
			var crud = new FW.crud({
				module: 'client',
				key: 'clientList'
			});
			crud.init();

			var tempModule = new FW.crud({
				module: 'admin',
				key: 'tempList',
				ui: new FW.silentUI()
			});
			tempModule.init();

			var list = crud.list();
			if (list != null) {
				$.each(list, function(i, value) {
					var row = value;
					
					tempModule.save(row);
				});
				
				window.localStorage.setItem('clientList', JSON.stringify(tempModule.list()));
				window.localStorage.removeItem('tempList');
			}
		});
	}
	
	return that;
}
