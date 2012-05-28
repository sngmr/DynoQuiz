/**
 * MAIN
 */
var _startWin, _quizWin, _answerWin;

function main() {
	Ti.UI.setBackgroundColor('#000');
	require('/app/globals').init();
	
	_startWin = new (require('/app/views/StartWindow'))({
		start: _startQuiz
	});
	_startWin.open();
	setTimeout(_startQuiz, 1000);
}

function _startQuiz() {
	var callbacks = {
		answer: _showAnswer
	};
	_quizWin = new (require('/app/views/QuizWindow'))(callbacks, 0);
	_quizWin.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	_startWin.close();
}

function _showAnswer(dynoIndex) {
	setTimeout(function() {
		var callbacks = {
			next: _nextQuiz
		};
		_answerWin = new (require('/app/views/AnswerWindow'))(callbacks, dynoIndex);
		_answerWin.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		_quizWin.close();
	}, 1000);
}

function _nextQuiz(dynoIndex) {
	var callbacks = {
		answer: _showAnswer
	};
	
	dynoIndex++;
	
	if (require('/data/data').data.dynos.length > dynoIndex) {
		_quizWin = new (require('/app/views/QuizWindow'))(callbacks, dynoIndex);
		_quizWin.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		_answerWin.close();
	} else {
		_startWin = new (require('/app/views/StartWindow'))({
			start: _startQuiz
		});
		_startWin.open({transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
		setTimeout(_startQuiz, 1500);
	}
}

/**
 * Exports
 */
exports.main = main;
