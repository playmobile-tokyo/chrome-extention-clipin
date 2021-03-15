import {config} from './config.js';
export const saveLocalStorage = function(text) {
	var copyHistory = [];
	try{
		copyHistory = JSON.parse(localStorage.getItem('copy'));
	}catch(e){
	}
	if (!Array.isArray(copyHistory)) {
		copyHistory = [];
	}
	// 保存しないパターン
	if(text.length == 0 || text.length > config.maxContentLengthSize) return copyHistory;
	if (copyHistory.length == 0 || copyHistory[0] != text){
		let exitIdx = copyHistory.indexOf(text)
		if(exitIdx != -1){
			copyHistory.splice(exitIdx, 1);
		} else if(copyHistory.length >= config.maxHistorySize){
			copyHistory.pop(text);
		}
		copyHistory.unshift(text);
		setTempLocalStorage(text);
	}
	let stringifyCopyHistory = JSON.stringify(copyHistory);
	localStorage.setItem('copy', stringifyCopyHistory);
	return copyHistory;
}
export const setTempLocalStorage = function(text) {
	localStorage.setItem('tmp_copy', text);
}
export const getTempLocalStorage = function() {
	return localStorage.getItem('tmp_copy');
}
export const clearLocalStorage = function() {
	localStorage.setItem('tmp_copy', '');
	localStorage.setItem('copy', '');
}

/*
	if(selectionText.length > config.maxContentLengthSize) return;
	var copyHistory = [];
	try{
		copyHistory = JSON.parse(localStorage.getItem('copy'));
	}catch(e){
		copyHistory = [];
	}
	if (copyHistory.length >= 1 && copyHistory[0] !== selectionText && selectionText != ""){
		let exitIdx = copyHistory.indexOf(selectionText)	
		if(exitIdx != -1){
			copyHistory.splice(exitIdx, 1);
		} else if(copyHistory.length > config.maxHistorySize){
			copyHistory.pop(selectionText);
		}
		copyHistory.unshift(selectionText);
	}
*/

/*
		const saveToHistory = function(selectionText) {
			var copyHistory = [];
			try{
				copyHistory = JSON.parse(localStorage.getItem('copy'));
			}catch(e){
				copyHistory = [];
			}
			// 履歴上限、UNIQUE、表示文字数、クリップボード追加
			if (copyHistory.length >= 1 && copyHistory[0] !== selectionText){
				let exitIdx = copyHistory.indexOf(selectionText)
				if(exitIdx != -1){
					copyHistory.splice(exitIdx, 1);
				} else if(copyHistory.length > config.maxHistorySize){
					copyHistory.pop(selectionText);
				}
				copyHistory.unshift(selectionText);
			}
			let stringifyCopyHistory = JSON.stringify(copyHistory);
			localStorage.setItem('copy', stringifyCopyHistory);
		}
*/
