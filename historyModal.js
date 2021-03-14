import {config} from './config.js';
import {saveLocalStorage, getTempLocalStorage, setTempLocalStorage, clearLocalStorage} from './localstrage.js';

window.onload = function () {
	// clear check
	if (config.isReset) clearLocalStorage();

	const showClipboardHistory = (function(text, div) {
		let historyIdx = document.createElement("li");
		let historyValue = document.createElement("button");
		var labelText = text
		if (text.length > 50){
			labelText = text.substring(0, 50) + "..."
		}
		historyValue.append(labelText);
		historyValue.addEventListener("click", function(self) {
			var pasetTextarea = document.getElementsByTagName('textarea')[0];
			if(config.isOverWritePast){
				pasetTextarea.value = text;
			} else {
				pasetTextarea.value = pasetTextarea.value + "\n" + text;
			}
			pasetTextarea.focus();
			// pasetTextarea.select();
			document.execCommand("copy");
		}, false);
		historyValue.style = config.buttonStyle;
		historyIdx.append(historyValue);
		div.append(historyIdx);
	});

	var textarea = document.getElementsByTagName('textarea')[0];
	textarea.focus();
	document.execCommand('paste');

	let selectionText = textarea.value;
	let copyHistory = saveLocalStorage(selectionText)

	var div = document.getElementsByTagName('div')[0];
	copyHistory.forEach(element=>showClipboardHistory(element, div));

	let hr = document.createElement("hr");
	hr.style.width = config.displayWidth
	div.append(hr);

	config.favorite.forEach(element=>showClipboardHistory(element, div));

	let stringifyCopyHistory = JSON.stringify(copyHistory);
	localStorage.setItem('copy', stringifyCopyHistory);

	textarea.value = getTempLocalStorage()
	textarea.addEventListener('focusout', (event) => {
		setTempLocalStorage(textarea.value);
	});
}