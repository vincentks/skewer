if (SK === undefined) {
   var SK = {};
}

SK.client = function(userOptions) {

	var that = {};
	
	var crud = new FW.crud({
		module: 'client',
		key: 'clientList',
		deleteSuccessMessage: 'Cliente excluído com sucesso.',
		deleteFailMessage: 'Cliente possui pedidos: não pode ser excluído.',
		saveSuccessMessage: 'Cliente atualizado com sucesso.',
		deleteValidation: function(id) {
			var result = true;
			
			var orderList = new FW.crud({
				key: 'orderList'
			}).list();
			
			$.each(orderList, function(i, value) {
				if (id == value.client) {
					result = false;
				}
			});
			
			return result;
		},
		saveValidation: function(object) {
			var result = '';
			
			if (object.name == '') {
				result = 'Informe o nome do cliente.';
			}
			
			if (object.cell == '' && object.phone == '') {
				result += ' Informe ao menos um telefone de contato do cliente.';
			}
			
			return result;
		}
	});

	that.init = function() {
		crud.init();
	}
	
	return that;
}
	
