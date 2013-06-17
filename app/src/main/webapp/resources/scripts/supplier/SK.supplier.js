if (SK === undefined) {
   var SK = {};
}

SK.supplier = function(userOptions) {

	var that = {};
	
	var crud = new FW.crud({
		module: 'supplier',
		key: 'supplierList',
		deleteSuccessMessage: 'Fornecedor excluído com sucesso.',
		saveSuccessMessage: 'Fornecedor atualizado com sucesso.',
		saveValidation: function(object) {
			var result = '';
			
			if (object.name == '') {
				result = 'Informe o nome do fornecedor.';
			}
			
			if (object.cell == '' && object.phone == '') {
				result += ' Informe ao menos um telefone de contato do fornecedor.';
			}
			
			return result;
		}
	});

	that.init = function() {
		crud.init();
	}
	
	return that;
}
	
