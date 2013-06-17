if (SK === undefined) {
   var SK = {};
}

SK.product = function(userOptions) {

	var that = {};
	
	var crud = new FW.crud({
		module: 'product',
		key: 'productList',
		deleteSuccessMessage: 'Produto excluído com sucesso.',
		saveSuccessMessage: 'Produto atualizado com sucesso.',
		saveValidation: function(object) {
			var result = '';
			
			if (object.name == '') {
				result = 'Informe o nome do produto.';
			}
			
			return result;
		}
	});

	that.init = function() {
		crud.init();
	}
	
	return that;
}
	
