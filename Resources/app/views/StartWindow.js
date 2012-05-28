var _callbacks;

function StartWindow(callback) {
	_callbacks = callback;
	
	var win = Ti.UI.createWindow({
		fullscreen: true
	});
	var container = Ti.UI.createView({
		backgroundImage: '/images/top.png'
	});
	
	win.add(container);
	return win;
}

module.exports = StartWindow;
