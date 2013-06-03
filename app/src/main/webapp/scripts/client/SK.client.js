if (SK === undefined) {
   var SK = {};
}

SK.client = function(userOptions) {

	var that = {};
	
	var crud = new FW.crud({
		module: 'client',
		key: 'clientList',
		deleteSuccessMessage: 'Cliente excluído com sucesso.',
		saveSuccessMessage: 'Cliente atualizado com sucesso.',
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
	
