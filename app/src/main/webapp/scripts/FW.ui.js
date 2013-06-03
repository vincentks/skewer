if (FW === undefined) {
   var FW = {};
}

FW.ui = function(userOptions) {
	
	var that = {};
	
	var options = {
		/**
		 * string - message shown to the user once a row is deleted successfully
		 * */
		deleteSuccessMessage: 'Registro excluído com sucesso',
		/**
		 * string - message shown when user successfully saves a record
		 * */
		saveSuccessMessage: 'Registro atualizado com sucesso.',
		/**
		 * CRUD object which provides callbacks to database operations
		 * */
		crud: null
	};

	$.extend(true, options, userOptions);

	function save() {
		var row = {};
		
		$.each($('.details-container form input, .details-container form textarea'), function(i, value) {
			row[$(value).attr('id')] = $(value).val();
		});
		
		var result = options.crud.save(row);
		
		onSaveSuccess(row);
		
		return result;
	}
	
	function onSaveSuccess(row) {
		$('#id').val(row.id);
	}

	function hideDetails() {
		$('.details-container').removeClass('show');
		$('.details-container').hide('drop', { direction: 'horizontal' }, 1000);
	}

	function showDetails() {
		$('.details-container').show();

		$('.details-container form input, .details-container form textarea').val('');

		$('.data-table tr').removeClass('selected');

		$('.details-container form input:first').focus();
	}
	
	function populateTable() {
		var list = options.crud.list();
		
		$('.data-table tbody tr').remove();
		$.map($(list), function(value, i) {
			var $tr = Mustache.render($('#tableRowTemplate').html(), value);
			
			$('.data-table tbody').append($tr);
		});
		
		filterTable();
	}

	function filterTable() {
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
	
	that.onSaveSuccess = function(row) {
		populateTable();

		$('.data-table tr[data-id="' + row.id + '"]').addClass('selected');
		
		$.pnotify({
			title: 'Sucesso',
			text: options.saveSuccessMessage,
			type: 'success',
			delay: 1500,
			styling: 'jqueryui'
		});			
	}
	
	that.onDeleteRecord = function() {
		populateTable();

		$.pnotify({
			title: 'Sucesso',
			text: options.deleteSuccessMessage,
			type: 'success',
			delay: 1500,
			styling: 'jqueryui'
		});			
		
		hideDetails();
	}
	
	that.init = function() {
		$.pnotify.defaults.history = false;
		
		$('.menu li[data-module="' + options.module + '"]').addClass('current');

		$('#tableSearchField').keyup(filterTable);
		$('#deleteButton').click(function() {
			var id = $('#id').val();
			options.crud.deleteRecord(id);
		});
		$('#addButton').click(showDetails);
		$('#hideDetailsButton').click(hideDetails);	
		$('#searchButton').click(populateTable);
		
		$('#saveButton').click(save);
		$('#saveAddButton').click(function() {
			var saveResult = save();
			if (saveResult) {
				showDetails();
			}
		});

		$('button').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
		});
		
		$('body').off('click', '.data-table tbody tr').on('click', '.data-table tbody tr', function() {
        	$('.data-table tbody tr').removeClass('selected');
        	$(this).addClass('selected');
        	
			var row = options.crud.get($(this).data('id'));
			
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