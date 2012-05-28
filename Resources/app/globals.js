/**
 * Global Object
 */
var _globals;

/**
 * Exports
 */
exports.init = function() {
	_globals = {};
}
exports.set = function(key, value) {
	_globals[key] = value;
}
exports.get = function(key) {
	return _globals[key];
}
