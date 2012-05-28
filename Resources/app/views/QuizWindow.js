var _callbacks, _dynoIndex, _win, _container, _buttonList;

function QuizWindow(callback, dynoIndex) {
	_callbacks = callback;
	_dynoIndex = dynoIndex;
	_buttonList = []
	
	var dynoList = require('/data/data').data.dynos;
	var useDyno = dynoList[_dynoIndex];
	
	_win = Ti.UI.createWindow({
		fullscreen: true
	});
	_container = Ti.UI.createView({
		backgroundColor: '#FF6600'
	});
	
	var top = 5;
	var dynoImage = Ti.UI.createImageView({
		image: useDyno.image,
		width: '90%',
		top: top + 'dp'
	});
	_container.add(dynoImage);
	top += 250 + 25;

	var candidateIndex, candidateIndexList = [];
	for (var i = 0; i < 3; i++) {
		while (true) {
			candidateIndex = Math.floor(Math.random() * dynoList.length);
			if (candidateIndexList.indexOf(candidateIndex) === -1 && candidateIndex !== _dynoIndex) {
				candidateIndexList.push(candidateIndex);
				break;
			}
		}
	}
	
	candidateIndexList[Math.floor(Math.random() * candidateIndexList.length)] = _dynoIndex;
	
	var button;
	for (var i = 0; i < candidateIndexList.length; i++) {
		button = Ti.UI.createButton({
			title: dynoList[candidateIndexList[i]].name,
			width: '90%',
			height: '40dp',
			top: top + 'dp',
			
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			borderRadius:6,
			font:{fontSize:15},
			backgroundGradient:{
				type:'linear',
				colors:['#444','#455'],
				startPoint:{x:0,y:0},
				endPoint:{x:2,y:50},
				backFillStart:false
			},
			borderWidth:1,
			borderColor:'#666'
		});
		button.addEventListener('click', _buttonClickHandler);
		_container.add(button);
		_buttonList.push(button);
		
		top += 50;
	}
	
	_win.add(_container);
	return _win;
}

function _buttonClickHandler(e) {
	var dynoList = require('/data/data').data.dynos;
	var correct = dynoList[_dynoIndex].name;
	
	var imageFile, imageView;
	for (var i = 0; i < _buttonList.length; i++) {
		if (correct === _buttonList[i].title) {
			imageFile = '/images/ok.png';
		} else {
			imageFile = '/images/ng.png';
		}
		imageView = Ti.UI.createImageView({
			image: imageFile,
			top: _buttonList[i].top,
			left: _buttonList[i].left,
			height: '40dp'
		});
		_container.add(imageView);
	}
	
	_callbacks.answer(_dynoIndex);
}

module.exports = QuizWindow;
