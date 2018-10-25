function searchClick(e) {
	Ti.API.info("searchClick()");

	if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
		alert('No hay red');
		return;
	}

	var url = 'http://dev.markitondemand.com/Api/Lookup/json?input=' + $.companyName.getValue();

	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.debug(this.responseText);
			fillTable(this.responseText);
			var result = JSON.parse(this.responseText);
			
			alert('aqui esta otro response 1'+JSON.stringify(result));
		},
		onerror : function(e) {
			Ti.API.debug(e.error);
		},
		timeout : 5000,
	});

	xhr.open('GET', url);
	xhr.send();

}

function fillTable(e) {
	Ti.API.info("fillTanle()");

	var rows = [];

	var results = JSON.parse(e);
	Ti.API.info("Results.length" + results.length);

	if (results.length > 0) {

		// for (var i = 0; i < results.length; i++) {
		// rows.push(Alloy.createController('row', {
		// name : results[i].name
		// }).getView());
		// }
		_.each(results, function(items) {
			rows.push(Alloy.createController('row', {
				name : items.Name
			}).getView());
			alert('Elemento alert ' + JSON.stringify(items.Name));
		});
		alert('deberia traer algo'+JSON.stringify(e));
		
	} else {
		alert('Result not found, please try again');
	}

	$.companyTv.setData(rows);

}

$.index.open();
