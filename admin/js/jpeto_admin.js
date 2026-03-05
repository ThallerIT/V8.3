var win = '';

var ctrlPressed = 0;
var altPressed = 0;
var shiftPressed = 0;

function mouseDown(e) {
	if (parseInt(navigator.appVersion)>3) {
		var evt = e ? e:window.event;
		shiftPressed= evt.shiftKey;
		altPressed = evt.altKey;
		ctrlPressed = evt.ctrlKey;
	}
  return true;
}

if (parseInt(navigator.appVersion)>3) {
	document.onmousedown = mouseDown;
}

function map(formID,frID,frJT,toJT) {
	var val = document.getElementById('link'+formID).value;
	var det = '&jumpToDetail=' + (ctrlPressed ? '1':'0');

	if (val!='') {
		self.location.href = (window.location.search!='' ? window.location.search+'&':'?') + 'act=new&mapToUniqueID='+val+'&mapToJpetoType='+toJT+'&mapUniqueID='+frID+'&mapLanguage='+jpeto_var_language+'&mapVersion='+jpeto_var_version+'&mapJpetoType='+frJT+det+'#aiobj'+formID;
	} else {
		self.location.href = (window.location.search!='' ? window.location.search+'&':'?') + 'act=new&mapToJpetoType='+toJT+'&mapUniqueID='+frID+'&mapLanguage='+jpeto_var_language+'&mapVersion='+jpeto_var_version+'&mapJpetoType='+frJT+det+'#aiobj'+(formID+1);
	}
}

function edt(AI,ID,JT) {
	if (jpeto_var_ffwo && win) win.close();
  var sessid = (jpeto_var_sessionid ? '&'+jpeto_var_sessionid:'');
  win = window.open(jpeto_var_adminpath+'?eAI='+AI+'&eJT='+JT+'&eID='+ID+'&eL='+jpeto_var_language+'&eV='+jpeto_var_version+sessid,jpeto_var_target);
	if(win.window.focus) win.window.focus();
	return false;
}

function unlink(act,frID,toID,toJT,SP,cnf,formID) {
	var ok = false;
	if (cnf > 0) {
		if (act=='unlink') ok=confirm('unlink object? (keep other instances)');
		if (act=='delete') ok=confirm('really delete? (this is the last instance!)');
	} else {
		ok=true;
	}
	if (ok) self.location.href = (window.location.search!='' ? window.location.search+'&':'?') + 'act='+act+'&mapUniqueID='+frID+'&mapLanguage='+jpeto_var_language+'&mapVersion='+jpeto_var_version+'&mapToUniqueID='+toID+'&mapToJpetoType='+toJT+'&mapSortPos='+SP;
}

function mov(formID,act,frID,SP) {
	self.location.href = (window.location.search!='' ? window.location.search+'&':'?') + 'act='+act+(ctrlPressed && shiftPressed? 'X':(ctrlPressed?'5':(shiftPressed?'10':'')))+'&mapUniqueID='+frID+'&mapLanguage='+jpeto_var_language+'&mapVersion='+jpeto_var_version+'&mapSortPos='+SP+'#aiobj'+formID;
}

function cstat(formID,ID,Lang,Ver,JT) {
	self.location.href = (window.location.search!='' ? window.location.search+'&':'?') + 'act=cstat&UniqueID='+ID+'&Language='+Lang+'&Version='+Ver+'&JpetoType='+JT+'#aiobj'+formID;
}

function hide(ID) {
	if(ctrlPressed) {
		self.location.href = (window.location.search!='' ? window.location.search+'&':'?') + 'detail='+ID;
	} else {
		self.location.href = (window.location.search!='' ? window.location.search+'&':'?') + 'act=hide&UniqueID='+ID+'&Language='+jpeto_var_language+'&Version='+jpeto_var_version;
	}
}