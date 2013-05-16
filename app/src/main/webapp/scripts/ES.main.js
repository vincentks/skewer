if (ES === undefined) {
   var ES = {};
}

//Array.prototype.remove = function(from, to) {
//	var rest = this.slice((to || from) + 1 || this.length);
//	this.length = from < 0 ? this.length + from : from;
//	return this.push.apply(this, rest);
//};

ES.client = function(userOptions) {

	var that = {};

	function persist(clientList) {
		window.localStorage.setItem('clientList', JSON.stringify(clientList));
		console.log(JSON.stringify(clientList));
		
//		$.ajax({
//			url: 'mailto:vincent.kellers@gmail.com',
//			type: 'POST',
//			data: {
//				value: JSON.stringify(clientList)
//			}
//		});
	}
	
	function retrieve() {
		var result = $.parseJSON(window.localStorage.getItem('clientList'));
		if (result == null || result.length == 0) {
			result = new Array();
			
			persist(result);
		}		

		console.log(result);
		return result;
	}
	
	function searchClient() {
		var $field = $('#clientSearchField');

		$('.client-table tbody tr.warning').remove();
		
		if ($.trim($field.val()) == '') {
			$('.client-table tbody tr').show();
		} else {
			$('.client-table tbody tr').each(function(i, value) {
				var $row = $(value);

				var rowText = $.trim($row.text().toUpperCase());
				var fieldText = $.trim($field.val().toUpperCase());
				
				if (rowText.indexOf(fieldText) > -1) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
			
			if ($('.client-table tbody tr:visible').length == 0) {
				var $tr = $('<tr class="warning"><td colspan="3">Nenhum cliente encontrado. Altere o filtro da pesquisa.</td></tr>');
				$('.client-table tbody').append($tr);
			}
		}
	}
	
	function populateClientTable() {
		var clientList = retrieve();
		persist(clientList);		
		
		$('.client-table tbody tr').remove();
		$.map($(clientList), function(value, i) {
			var $tr = $('<tr data-client-index="' + i + '"></tr>');
			$tr.append('<td>' + value.name + '</td>');
			$tr.append('<td>' + value.cell + '</td>');
			$tr.append('<td>' + value.phone + '</td>');
			$('.client-table tbody').append($tr);
		});
	}
	
	function initUI() {
		$('#clientSearchField').keyup(searchClient);
		
		$('#deleteClientButton').click(function(e) {
			var clientList = retrieve();
			
			var $client = $('.client-table .selected');

			clientList.splice($client.data('clientIndex'), 1);

			persist(clientList);
			
			searchClient();
			populateClientTable();

			$('.client-details-container').removeClass('show');
			$.pnotify({
				title: 'Sucesso',
				text: 'Cliente excluído com sucesso.',
				type: 'success',
				delay: 1500,
				styling: 'jqueryui'
			});			
			
			$('#hideClientButton').click();
		});
		
		$('#addClientButton').click(function() {
			$('.client-details-container').show();

			$('#clientDetailsForm input, #clientDetailsForm textarea').val('');

			$('.client-table tr').removeClass('selected');

			$('#clientDetailsForm input:first').focus();
		});
		
		$('#hideClientButton').click(function(e) {
			$('.client-details-container').hide('drop', { direction: 'horizontal' }, 1000);
		});	
		
		$('#saveClientButton').click(function(e) {
			var client = {};
			client['name'] = $.trim($('#clientDetailsForm #name').val());
			client['cell'] = $.trim($('#clientDetailsForm #cell').val());
			client['phone'] = $.trim($('#clientDetailsForm #phone').val());
			client['email'] = $.trim($('#clientDetailsForm #email').val());
			client['address'] = $.trim($('#clientDetailsForm #address').val());
			
			var message = '';
			
			if (client.name == '') {
				message = 'Informe o nome do cliente.';
			}
			
			if (client.cell == '' && client.phone == '') {
				message += ' Informe ao menos um telefone de contato do cliente.';
			}
			
			if (message != '') {
				$.pnotify({
					title: 'Erro',
					text: $.trim(message),
					type: 'error',
					styling: 'jqueryui'
				});			
			} else {
				var clientList = retrieve();
				
				var $selectedRow = $('.client-table .selected');
				var clientIndex = -1;
				
				if ($selectedRow.length > 0) {
					clientIndex = $selectedRow.data('clientIndex');
					clientList[clientIndex] = client;
				} else {
					clientList.push(client);
				}
				
				persist(clientList);
				
				populateClientTable();
				searchClient();

				if (clientIndex > -1) {
					$('.client-table tr[data-client-index="' + clientIndex + '"]').addClass('selected');
				} else {
					$('.client-table tr:last').addClass('selected');
				}
				
				$.pnotify({
					title: 'Sucesso',
					text: 'Cliente cadastrado com sucesso.',
					type: 'success',
					delay: 1500,
					styling: 'jqueryui'
				});			
			}
		});
		
		$('#searchClientButton').click(function() {
			populateClientTable();
			searchClient();
		});
		
		$('#saveAddClientButton').click(function() {
			$('#saveClientButton').click();
			$('#addClientButton').click();
		});
		
		$('button').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
		});
		
        $('body').off('click', '.client-table tbody tr').on('click', '.client-table tbody tr', function() {
        	$('.client-table tbody tr').removeClass('selected');
        	$(this).addClass('selected');
        	
			var clientList = retrieve();
			
			var client = clientList[$(this).data('clientIndex')];

			$('#clientDetailsForm #name').val(client['name']);
			$('#clientDetailsForm #cell').val(client['cell']);
			$('#clientDetailsForm #phone').val(client['phone']);
			$('#clientDetailsForm #email').val(client['email']);
			$('#clientDetailsForm #address').val(client['address']);

			$('.client-details-container').show();
			$('#clientDetailsForm #name').focus();
        });
	}
	
	that.load = function() {
		$.pnotify.defaults.history = false;

		initUI();
		
		populateClientTable();
	}
	
	return that;
}
	
