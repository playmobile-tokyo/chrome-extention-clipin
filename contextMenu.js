import {config} from './config.js';
import {saveLocalStorage} from './localstrage.js';

chrome.contextMenus.create({
	"title" : "選択範囲をコピー履歴に追加",
	"type"  : "normal",
	"contexts" : ["selection"],
	"onclick" : copytext()
});
function copytext(info,tab){
	return function(info,tab){
		const saveToClipboard = function (selectionText) {
			var textArea = document.createElement("textarea");
			document.body.appendChild(textArea);
			textArea.value = selectionText;
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
			return textArea.value;
		}
		let selectionText = saveToClipboard(info.selectionText);
		saveLocalStorage(selectionText);
	}
}
