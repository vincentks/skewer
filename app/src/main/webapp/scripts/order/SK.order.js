if (SK === undefined) {
   var SK = {};
}

SK.order = function(userOptions) {

	var that = {};
	
	var crud = new FW.crud({
		module: 'order',
		key: 'orderList',
		deleteSuccessMessage: 'Pedido excluído com sucesso.',
		saveSuccessMessage: 'Pedido atualizado com sucesso.',
		saveValidation: function(object) {
			var result = '';
			
			if (object.name == '') {
				result = 'Informe o cliente.';
			}
			
			return result;
		},
		showDetailsCallback: function() {
			var clientList = new FW.crud({
				key: 'clientList'
			}).list();
			
			$('#client').select2({
				data: {
					results: clientList,
					text: 'name'
				},
				formatSelection: function(item) { 
					return item.name; 
				},
			    formatResult: function(item) { 
					return item.name; 
	            }
			});
			
			$('.datepicker').datepicker({
				autoclose: true,
				format: 'dd/mm/yyyy',
				todayBtn: 'linked'
			});
		},
		rowTemplateFunctions: {
			getClient: function() {
				var result = '';
				
				if ($.trim(this.client) != null) {
					var client = new FW.crud({
						key: 'clientList'
					}).get(this.client);
					
					if (client != null) {
						result = client.name;
					}
				}
				
				return result;
			}
		}
	});

	that.init = function() {
		crud.init();
	}
	
	return that;
}