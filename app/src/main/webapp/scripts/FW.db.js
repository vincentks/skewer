if (FW === undefined) {
   var FW = {};
}

FW.db = function(userOptions) {
	
	var that = {};
	
	var options = {
		key: ''
	};
	
    $.extend(true, options, userOptions);

	function saveList(list) {
		window.localStorage.setItem(options.key, JSON.stringify(list));
		console.log(JSON.stringify(list));
	
		// TODO post to server and then e-mail
//		$.ajax({
//			url: 'mailto:',
//			type: 'POST',
//			data: {
//				value: JSON.stringify(clientList)
//			}
//		});
	}
	
	that.save = function(object) {
		var list = that.list();
		
		if (object.id != null && $.trim(object.id) != '') {
			$.each(list, function(i, value) {
				if (value.id == object.id) {
					list[i] = object;
				}
			});
		} else {
			object['id'] = $.now();
			list.push(object);
		}
		
		saveList(list);
	}
	
	that.list = function() {
		var result = $.parseJSON(window.localStorage.getItem(options.key));
		if (result == null || result.length == 0) {
			result = new Array();
			
			saveList(result);
		}		

		console.log(result);
		return result;
	}
	
	that.get = function(id) {
		var result = {};
		var list = that.list();
		
		if (id != null) {
			$.each(list, function(i, value) {
				if (value.id == id) {
					result = value;
				}
			});
		}
		
		return result;
	}
	
	that.deleteRecord = function(id) {
		var list = that.list();

		var object = that.get(id);
		
		var index = -1;
		
		$.each(list, function(i, value) {
			if (value.id == id) {
				index = i;
			}
		});
		
		if (index > -1) {
			list.splice(index, 1);

			saveList(list);
		}
	}

    return that;
}