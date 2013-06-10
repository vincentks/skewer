if (FW === undefined) {
   var FW = {};
}

FW.crud = function(userOptions) {
	
	var that = {};
	
	var options = {
		/**
		 * string - module key, forwarded to the ui component
		 * */
		module: '',
		/**
		 * string - identifies the storage key used by this module
		 * */
		key: '',
		/**
		 * function - validation executed once the user tries to save a record
		 * */
		saveValidation: $.noop,
		/**
		 * validation executed once the user tries to delete a record
		 * */
		deleteValidation: function(id) {
			return true;
		},
		/**
		 * FW.ui component to be used by this component - has to be defined when different than FW.ui
		 * */
		ui: null,
		/**
		 * string - message shown to the user once a row is deleted successfully
		 * */
		deleteSuccessMessage: 'Registro excluído com sucesso',
		/**
		 * string - message shown when user successfully saves a record
		 * */
		saveSuccessMessage: 'Registro atualizado com sucesso.',
		/**
		 * Callback to invoke once the details panel is shown
		 * */
		showDetailsCallback: $.noop,
		/**
		 * Functions to be added to the row template supplied as parameter to the Mustache engine
		 * */
		rowTemplateFunctions: {},
		/**
		 * Function used to serialize a form so it can be persisted
		 * */
		rowSerializer: $.noop
	};
	
    $.extend(true, options, userOptions);

    var database = new FW.db({
    	key: options.key
    });
    
    that.getOptions = function() {
    	return options;
    }
    
	that.init = function() {
		if (options.ui == null) {
		    options['ui'] = new FW.ui({
				crud: that
			});
		}

	    options.ui.init();
	}
	
	that.get = function(id) {
		return database.get(id);
	}
	
	that.list = function() {
		return database.list();
	}
	
	that.deleteRecord = function(id) {
		var allowDelete = options.deleteValidation(id);

		if (allowDelete) {
			database.deleteRecord(id);
			options.ui.onDeleteRecord();
		} else if ($.trim(options.deleteFailMessage) != '') {
			$.pnotify({
				title: 'Erro',
				text: $.trim(options.deleteFailMessage),
				type: 'error'
			});			
		}
	}

	that.save = function(object) {
		var result = false;
		
		var message = options.saveValidation(object);
		
		if ($.trim(message) != '') {
			$.pnotify({
				title: 'Erro',
				text: $.trim(message),
				type: 'error'
			});			
		} else {
			database.save(object);

			options.ui.onSaveSuccess(object);

			result = true;
		}
		
		return result;
	}
	
	return that;
}

