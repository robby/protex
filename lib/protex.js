Object.defineProperty(Object.prototype, 'extend', {
	enumerable: false,
	value: function(from) {
		if(!from) return this;
		
		var props = Object.getOwnPropertyNames(from);
		var dest = this;
		props.forEach(function(name) {
			if (!(name in dest)) {
				var destination = Object.getOwnPropertyDescriptor(from, name);
				
				Object.defineProperty(dest, name, destination);
			}
		});
		return this;
	}
});

Object.defineProperty(Object.prototype, 'allow', {
	enumerable: false,
	value: function(fields) {
		var no = {};

		for (var i = 0; i < fields.length; i++) {
			if (this[fields[i]] === undefined) continue;

			no[fields[i]] = this[fields[i]];
		}

		return no;
	}
});

Array.prototype.select = function(fieldName, where){
	var selector = '', wk = Object.keys(where);

	for (var j = 0; j < wk.length; j++) {
		selector += (selector ? ' && ' : '') + 'o.' + wk[j] + ' == \'' + where[wk[j]] + '\'';
	};

	var whereFn = new Function('o', 'return ' + selector + ';');

	for (var i = 0; i < this.length; i++) {
		if(whereFn(this[i])){
			return this[i][fieldName];
		}
	}

	return null;
}

Function.prototype.override = function(fn){
	var supa = this;
	return function(){
		if(fn.apply(this, arguments)){
			return;
		}

		supa.apply(this, arguments);
	};
}
