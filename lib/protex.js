Array.prototype.find = function(predicate){
	return this.filter(predicate)[0] || null;
}

Object.defineProperty(Object.prototype, "extend", {
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
