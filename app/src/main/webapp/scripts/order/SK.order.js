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
		showDetailsCallback: function(row) {
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
				todayBtn: 'linked',
				language: 'pt-BR'
			});
			
			$('.product-row').remove();
			
			if (row == null) {
				addProductRow();
				initProductRow();
			} else {
				var products = row.products;
				
				$.each(products, function(i, product) {
					addProductRow();
					
					$('.product-row:last').find('#product').val(product.id);
					$('.product-row:last').find('#quantity').val(product.quantity);
					
					initProductRow();
				});
			}
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
		},
		rowSerializer: function() {
			var row = {};
			
			row['client'] = $('#client').val();
			row['date']= $('#date').val();
			row['total'] = $('#total').val();
			row['id'] = $('#id').val();
			
			var products = new Array();
			$.each($('.products-container input.product-id'), function(i, value) {
				var product = {};
				
				product['id'] = $(value).val();
				
				products.push(product);
			});

			$.each($('.products-container input.product-quantity'), function(i, value) {
				var product = products[i];
				
				product['quantity'] = $(value).val();
			});
			
			row['products'] = products;
			
			console.log(row);
			
			return row;
		}
	});

	function addProductRow() {
		var $tr = Mustache.render($('#productRowTemplate').html());
		
		$('.well').append($tr);

		$('.well .product-row .button-add-product').hide();
		$('.well .product-row .button-add-product:last').show();
		$('.well .product-row .button-add-product').off('click').on('click', function() {
			var $row = $(this).parents('.product-row');
			
			var quantity = $row.find('#quantity').val();
			var product = $row.find('product').val();
			
			if ($.trim(quantity) != '' && $.trim(product) != null) {
				addProductRow();
				initProductRow();
			} else {
				$.pnotify({
					title: 'Erro',
					text: 'Informe a quantidade e o produto comprado.',
					type: 'error'
				});			
			}
		});

		$('.well .product-row .button-remove-product:not(:last)').show();
		$('.well .product-row .button-remove-product').off('click').on('click', function() {
			$(this).parents('.product-row').remove();
		});
	}
	
	function initProductRow() {
		var productList = new FW.crud({
			key: 'productList'
		}).list();
		
		$('.well .product-row:last').find('#product').select2({
			data: {
				results: productList,
				text: 'name'
			},
			formatSelection: function(item) { 
				return item.name; 
			},
		    formatResult: function(item) { 
				return item.name; 
            }
		});
	}
	
	that.init = function() {
		crud.init();
	}
	
	return that;
}