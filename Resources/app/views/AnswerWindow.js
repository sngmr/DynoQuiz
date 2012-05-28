var _callbacks, _dynoIndex, _win, _container, _buttonList = [];

function AnswerWindow(callback, dynoIndex) {
	_callbacks = callback;
	_dynoIndex = dynoIndex;
	
	var dynoList = require('/data/data').data.dynos;
	var useDyno = dynoList[_dynoIndex];
	
	_win = Ti.UI.createWindow({
		fullscreen: true
	});
	_container = Ti.UI.createScrollView({
		backgroundColor: '#FF6600',
		layout: 'vertical',
		contentWidth: 'auto',
		contentHeight: 'auto',
	});
	
	var dynoNameLabel = Ti.UI.createLabel({
		text: useDyno.name,
		backgroundColor: '#444',
		color: '#FFF',
		width: Ti.UI.FILL,
		height: '30dp',
		textAlign: 'center',
		font: {fontSize:18,fontWeight:'bold'},
	});
	_container.add(dynoNameLabel);
	
	var dynoImage = Ti.UI.createImageView({
		image: useDyno.image,
		width: '90%',
		top: '2dp'
	});
	_container.add(dynoImage);
	
	var seNameTitleLabel = Ti.UI.createLabel({
		text: '学名',
		backgroundColor: '#444',
		color: '#FFF',
		width: '90%',
		top: '2dp'
	});
	_container.add(seNameTitleLabel);
	var seNameLabel = Ti.UI.createLabel({
		text: useDyno.sename,
		width: '90%',
		top: '2dp'
	});
	_container.add(seNameLabel);
	
	var descTitleLabel = Ti.UI.createLabel({
		text: '概説',
		backgroundColor: '#444',
		color: '#FFF',
		width: '90%',
		top: '8dp'
	});
	_container.add(descTitleLabel);
	var descLabel = Ti.UI.createLabel({
		text: useDyno.description,
		width: '90%',
		height: Ti.UI.SIZE,
		top: '2dp'
	});
	_container.add(descLabel);
	
	var mapLabel = Ti.UI.createLabel({
		text: 'マップ',
		backgroundColor: '#444',
		color: '#FFF',
		width: '85%',
		top: '8dp'
	});
	_container.add(mapLabel);
	var mapImage = Ti.UI.createImageView({
		image: useDyno.map_image,
		width: '90%',
		top: '2dp'
	});
	_container.add(mapImage);
	
	var nextButton = Ti.UI.createButton({
		title: '次の恐竜へ',
		width: '90%',
		height: '50dp',
		top: '10dp',
		bottom: '10dp',
		
		style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		borderRadius:6,
		backgroundGradient:{
			type:'linear',
			colors:['#444','#555'],
			startPoint:{x:0,y:0},
			endPoint:{x:2,y:50},
			backFillStart:false
		},
		borderWidth:1,
		borderColor:'#666'
	});
	nextButton.addEventListener('click', _buttonClickHandler);
	_container.add(nextButton);
	
	_win.add(_container);
	return _win;
}

function _buttonClickHandler(e) {
	_callbacks.next(_dynoIndex);
}

module.exports = AnswerWindow;
