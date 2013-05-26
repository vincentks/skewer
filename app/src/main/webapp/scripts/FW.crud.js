if (FW === undefined) {
   var FW = {};
}

FW.crud = function(userOptions) {
	
	var that = {};

	var options = {
		/**
		 * string - identifies the storage key used by this module
		 * */
		key: '',
		/**
		 * string - message shown to the user once a row is deleted successfully
		 * */
		deleteSuccessMessage: 'Registro excluído com sucesso',
		/**
		 * string - message shown when user successfully saves a record
		 * */
		saveSuccessMessage: 'Registro atualizado com sucesso.',
		/**
		 * callback - validation executed once the user tries to save a record
		 * */
		saveValidation: $.noop
	};
	
    $.extend(true, options, userOptions);
	
    /**
     * params = {
     *     value: object to persist	
     * }
     * */
	function persist(object) {
		window.localStorage.setItem(options.key, JSON.stringify(object));
		console.log(JSON.stringify(object));
	
		// TODO post to server and then e-mail
//		$.ajax({
//			url: 'mailto:',
//			type: 'POST',
//			data: {
//				value: JSON.stringify(clientList)
//			}
//		});
	}
	
	function retrieve() {
		var result = $.parseJSON(window.localStorage.getItem(options.key));
		if (result == null || result.length == 0) {
			result = new Array();
			
			persist(result);
		}		

		console.log(result);
		return result;
	}
	
	function populateTable() {
		var list = retrieve();
		
		$('.data-table tbody tr').remove();
		$.map($(list), function(value, i) {
			value.index = function() {
				return i;
			};
			
			var $tr = Mustache.render($('#tableRowTemplate').html(), value);
			
			$('.data-table tbody').append($tr);
		});
	}	

	function deleteRecord() {
		var list = retrieve();
		
		var $row = $('.data-table .selected');

		list.splice($row.data('rowIndex'), 1);

		persist(list);
		search();
		populateTable();

		$('.details-container').removeClass('show');
		$.pnotify({
			title: 'Sucesso',
			text: options.deleteSuccessMessage,
			type: 'success',
			delay: 1500,
			styling: 'jqueryui'
		});			
		
		$('#hideDetailsButton').click();
	}
	
	function search() {
		var $field = $('#tableSearchField');

		$('.data-table tbody tr.warning').remove();
		
		if ($.trim($field.val()) == '') {
			$('.data-table tbody tr').show();
		} else {
			$('.data-table tbody tr').each(function(i, value) {
				var $row = $(value);

				var rowText = $.trim($row.text().toUpperCase());
				var fieldText = $.trim($field.val().toUpperCase());
				
				if (rowText.indexOf(fieldText) > -1) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		}
		
		if ($('.data-table tbody tr:visible').length == 0) {
			var $tr = $('#emptyTableTemplate')
			$('.data-table tbody').append($tr.html());
		}
	}
	
	function save() {
		var result = false;
		
		var row = {};
		
		$.each($('.details-container form input, .details-container form textarea'), function(i, value) {
			row[$(value).attr('id')] = $(value).val();
		});

		var message = options.saveValidation(row);
		
		if (message != '') {
			$.pnotify({
				title: 'Erro',
				text: $.trim(message),
				type: 'error',
				styling: 'jqueryui'
			});			
		} else {
			var list = retrieve();
			
			var $selectedRow = $('.data-table .selected');
			var rowIndex = -1;
			
			if ($selectedRow.length > 0) {
				rowIndex = $selectedRow.data('rowIndex');
				list[rowIndex] = row;
			} else {
				list.push(row);
			}
			
			persist(list);
			populateTable();
			search();

			if (rowIndex > -1) {
				$('.data-table tr[data-row-index="' + rowIndex + '"]').addClass('selected');
			} else {
				$('.data-table tr:last').addClass('selected');
			}
			
			
			result = true;
			
			$.pnotify({
				title: 'Sucesso',
				text: options.saveSuccessMessage,
				type: 'success',
				delay: 1500,
				styling: 'jqueryui'
			});			
		}
		
		return result;
	}
	
	function showDetails() {
		$('.details-container').show();

		$('.details-container form input, .details-container form textarea').val('');

		$('.data-table tr').removeClass('selected');

		$('.details-container form input:first').focus();
	}
	
	that.init = function() {
		$.pnotify.defaults.history = false;

		$('#saveButton').click(save);
		$('#tableSearchField').keyup(search);
		$('#deleteButton').click(deleteRecord);
		$('#addButton').click(showDetails);
		
		$('#hideDetailsButton').click(function(e) {
			$('.details-container').hide('drop', { direction: 'horizontal' }, 1000);
		});	
		
		$('#saveAddButton').click(function() {
			var saveResult = save();
			if (saveResult) {
				showDetails();
			}
		});

		$('#searchButton').click(function() {
			populateTable();
			search();
		});

		$('button').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
		});
		
		$('body').off('click', '.data-table tbody tr').on('click', '.data-table tbody tr', function() {
        	$('.data-table tbody tr').removeClass('selected');
        	$(this).addClass('selected');
        	
			var list = retrieve();
			
			var row = list[$(this).data('rowIndex')];
			
			$.map(row, function(value, key) {
				$('.details-container form #' + key).val(value);
			});

			$('.details-container').show();
			$('.details-container form input:first').focus();
        });

        populateTable();
	}

	return that;
}

