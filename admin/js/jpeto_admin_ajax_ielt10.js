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

function jsrch() {

  return (window.location.search!='' ? window.location.search+'&':'?');
}

var sessid = (jpeto_var_sessionid ? '&'+jpeto_var_sessionid:'');

function map(formID,fI,fT,tT) {
	var val = $('#link'+formID).val();
	if (val!='') {
		self.location.href = jsrch() + $.param({
		  act:'new',
		  mapToUniqueID:val,
		  mapToJpetoType:tT,
		  mapUniqueID:fI,
		  mapLanguage:jpeto_var_language,
		  mapVersion:jpeto_var_version,
		  mapJpetoType:fT,
		  jumpToDetail:(ctrlPressed ? '1':'0')
		}) + '#aiobj'+formID;
	} else {
		self.location.href = jsrch() + $.param({
		  act:'new',
		  mapToJpetoType:tT,
		  mapUniqueID:fI,
		  mapLanguage:jpeto_var_language,
		  mapVersion:jpeto_var_version,
		  mapJpetoType:fT,
		  jumpToDetail:(ctrlPressed ? '1':'0')
		}) + '#aiobj'+(formID+1);
	}
}

function edt(AI,ID,JT) {
	if (jpeto_var_ffwo && win) win.close();
	win = window.open(jpeto_var_adminpath + '?' + $.param({
	  eAI:AI,
	  eJT:JT,
	  eID:ID,
	  eL:jpeto_var_language,
	eV:jpeto_var_version}) + sessid,
	jpeto_var_target);

	if(win.window.focus) win.window.focus();
	return false;
}

function unlink(act,fI,tI,tT,SP,cnf,formID) {
	var ok = false;
	if (cnf > 0) {
		if (act=='unlink') ok=confirm('unlink object? (keep other instances)');
		if (act=='delete') ok=confirm('really delete? (this is the last instance!)');
	} else {
		ok=true;
	}
	if (ok) {
		$.get(jpeto_var_adminpath+'jpeto_admininterface_ajax_gateway.php', {
			act:act,
			mapUniqueID:fI,
			mapLanguage:jpeto_var_language,
			mapVersion:jpeto_var_version,
			mapToUniqueID:tI,
			mapToJpetoType:tT,
			mapSortPos:SP
		},
		function(response) {
			if (response=='1') {
				if ($('#aiobj'+formID).parent('li')[0]) {
					$('#aiobj'+formID).parent('li')[0].remove();
				} else {
					$('#aiobj'+formID).remove();
				}
			}
		});
	}
}

function mov(formID,act,frID,SP) {
	self.location.href = jsrch() + $.param({
	  act:act+(ctrlPressed && shiftPressed? 'X':(ctrlPressed?'5':(shiftPressed?'10':''))),
	  mapUniqueID:frID,
	  mapLanguage:jpeto_var_language,
	  mapVersion:jpeto_var_version,
	  mapSortPos:SP
	}) + '#aiobj'+formID;
}

function cstat(formID,ID,L,V,T) {
	self.location.href = jsrch() + $.param({
	  act:'cstat',
	  UniqueID:ID,
	  Language:L,
	  Version:V,
	  JpetoType:T
	}) + '#aiobj'+formID;
}

function hide(ID) {
	if(ctrlPressed) {
		self.location.href = jsrch() + 'detail='+ID;
	} else {
		self.location.href = jsrch() + $.param({
		  act:'hide',
		  UniqueID:ID,
		  Language:jpeto_var_language,
		  Version:jpeto_var_version
		});
	}
}

(function ($) {
  $.fn.tPoint = function(options) {

    var settings = $.extend({
      cursor: 'pointer'
    }, options );

    return this.prop('title', settings.title).css('cursor',settings.cursor);

  };
}(jQuery));

$(document).ready(function()
{
	$('body').on('click','img.b_adds',function() {
		var objref = $.parseJSON($.base64.decode($(this).parents('.admindata').first().data('jpeto')));
		objref.U = objref.K.split('_')[0];
		map(objref.F,objref.U,objref.T,$(this).prop('alt'));
	});

	$('img.b_adds').tPoint({title:'show possible subobjects'});

	$('body').on('click','img.b_onl',function() {
		var objref = $.parseJSON($.base64.decode($(this).parents('.admindata').first().data('jpeto')));
		if ($('#tmpid')) $('#tmpid').prop('id','');
		$(this).prop('id','tmpid');
		$.get(jpeto_var_adminpath+'jpeto_admininterface_ajax_gateway.php', {
			act:'cstatAJAX',
			ojt:objref.T,
			okey:objref.K
		},
		function(response) {
			$('#tmpid').prop('src',$(response).prop('src')).prop('alt',$(response).prop('alt')).prop('title',$(response).prop('title')).prop('id','');
		});
	});

	$('img.b_onl').tPoint();

	$('body').on('click','img.b_sortu',function() {
		var p1ID='';
		var p2ID='';
		var objref = $.parseJSON($.base64.decode($(this).parents('.admindata').first().data('jpeto')));
		if ($(this).parents('.admindata').first().prev().data('jpeto')) {
			var objrefp = $.parseJSON($.base64.decode($(this).parents('.admindata').first().prev().data('jpeto')));
			if (objrefp.PK == objref.PK && parseInt(objref.S)-1 == parseInt(objrefp.S)) {
				p1ID = $(this).parents('.admindata').first().prop('id');
				p2ID = $(this).parents('.admindata').first().prev().prop('id');
			}
		} else if ($(this).parents('.admindata').first().parent().first().prev().children().first().data('jpeto')) {
			var objrefp = $.parseJSON($.base64.decode($(this).parents('.admindata').first().parent().first().prev().children().first().data('jpeto')));
			if (objrefp.PK == objref.PK && parseInt(objref.S) > parseInt(objrefp.S)) {
				p1ID = $(this).parents('.admindata').first().prop('id');
				p2ID = $(this).parents('.admindata').first().parent().first().prev().children().first().prop('id');
			}
		}
		objref.PU = objref.PK.split('_')[0];
		if (p1ID!='' && p2ID!='' && !ctrlPressed && !shiftPressed) {
			$.getJSON(jpeto_var_adminpath+'jpeto_admininterface_ajax_gateway.php?'+$.param({
				act: 'movup',
				PK: objref.PK,
				SP: objref.S,
				p1ID: p1ID,
				p2ID: p2ID
				}) + sessid,
				function(data) {
					if (data['succ']=='1') {
						var objref = $.parseJSON($.base64.decode($('#'+data['p1ID']).data('jpeto')));
						var objrefp = $.parseJSON($.base64.decode($('#'+data['p2ID']).data('jpeto')));
						var butt1 = $('#'+data['p1ID']+' .b_onl').parent().parent().children('td').eq(1).clone();
						var butt2 = $('#'+data['p2ID']+' .b_onl').parent().parent().children('td').eq(1).clone();
						$('#'+data['p1ID']+' .b_onl').parent().parent().children('td').eq(1).replaceWith(butt2);
						$('#'+data['p2ID']+' .b_onl').parent().parent().children('td').eq(1).replaceWith(butt1);
						var html1 = $('#'+data['p1ID']).html();
						var html2 = $('#'+data['p2ID']).html();
						$('#'+data['p1ID']).html(html2);
						$('#'+data['p2ID']).html(html1);
						var remK = ''+objrefp.K;
						objrefp.K = ''+objref.K;
						objref.K = remK;
						$('#'+data['p1ID']).data('jpeto',$.base64.encode(JSON.stringify(objref)));
						$('#'+data['p1ID']).attr('data-jpeto',$.base64.encode(JSON.stringify(objref)));
						$('#'+data['p2ID']).data('jpeto',$.base64.encode(JSON.stringify(objrefp)));
						$('#'+data['p2ID']).attr('data-jpeto',$.base64.encode(JSON.stringify(objrefp)));
					}
				}
			);

		} else {
			mov(objref.F,'up',objref.PU,objref.S);
		}
	});

	$('img.b_sortu').tPoint({title:'move up'});

	$('body').on('click','img.b_sortd',function() {
		var p1ID='';
		var p2ID='';
		var objref = $.parseJSON($.base64.decode($(this).parents('.admindata').first().data('jpeto')));
		if ($(this).parents('.admindata').first().next().data('jpeto')) {
			var objrefn = $.parseJSON($.base64.decode($(this).parents('.admindata').first().next().data('jpeto')));
			if (objrefn.PK == objref.PK && parseInt(objref.S)+1 == parseInt(objrefn.S)) {
				p1ID = $(this).parents('.admindata').first().prop('id');
				p2ID = $(this).parents('.admindata').first().next().prop('id');
			}
		} else if ($(this).parents('.admindata').first().parent().first().next().children().first().data('jpeto')) {
			var objrefn = $.parseJSON($.base64.decode($(this).parents('.admindata').first().parent().first().next().children().first().data('jpeto')));
			if (objrefn.PK == objref.PK && parseInt(objref.S) < parseInt(objrefn.S)) {
				p1ID = $(this).parents('.admindata').first().prop('id');
				p2ID = $(this).parents('.admindata').first().parent().first().next().children().first().prop('id');
			}
		}
		objref.PU = objref.PK.split('_')[0];
		if (p1ID!='' && p2ID!='' && !ctrlPressed && !shiftPressed) {
			$.getJSON(jpeto_var_adminpath+'jpeto_admininterface_ajax_gateway.php?'+$.param({
				act: 'movdown',
				PK: objref.PK,
				SP: objref.S,
				p1ID: p1ID,
				p2ID: p2ID
				}) + sessid,
				function(data) {
					if (data['succ']=='1') {
						var objref = $.parseJSON($.base64.decode($('#'+data['p1ID']).data('jpeto')));
						var objrefn = $.parseJSON($.base64.decode($('#'+data['p2ID']).data('jpeto')));
						var butt1 = $('#'+data['p1ID']+' .b_onl').parent().parent().children('td').eq(1).clone();
						var butt2 = $('#'+data['p2ID']+' .b_onl').parent().parent().children('td').eq(1).clone();
						$('#'+data['p1ID']+' .b_onl').parent().parent().children('td').eq(1).replaceWith(butt2);
						$('#'+data['p2ID']+' .b_onl').parent().parent().children('td').eq(1).replaceWith(butt1);
						var html1 = $('#'+data['p1ID']).html();
						var html2 = $('#'+data['p2ID']).html();
						$('#'+data['p1ID']).html(html2);
						$('#'+data['p2ID']).html(html1);
						var remK = ''+objrefn.K;
						objrefn.K = ''+objref.K;
						objref.K = remK;
						$('#'+data['p1ID']).data('jpeto',$.base64.encode(JSON.stringify(objref)));
						$('#'+data['p1ID']).attr('data-jpeto',$.base64.encode(JSON.stringify(objref)));
						$('#'+data['p2ID']).data('jpeto',$.base64.encode(JSON.stringify(objrefn)));
						$('#'+data['p2ID']).attr('data-jpeto',$.base64.encode(JSON.stringify(objrefn)));
					}
				}
			);

		} else {
			mov(objref.F,'down',objref.PU,objref.S);
		}
	});

  $('img.b_sortd').tPoint({title:'move down'});

	$('body').on('click','img.b_edt',function() {
		var objref = $.parseJSON($.base64.decode($(this).parents('.admindata').first().data('jpeto')));
		objref.U = objref.K.split('_')[0];
		edt('',objref.U,objref.T);
	});

	$('img.b_edt').tPoint({title:'edit this object'});

	$('body').on('click','img.b_unlink',function() {
		var objref = $.parseJSON($.base64.decode($(this).parents('.admindata').first().data('jpeto')));
		objref.U = objref.K.split('_')[0];
		objref.PU = objref.PK.split('_')[0];
		unlink('unlink',objref.PU,objref.U,objref.T,objref.S,($(this).parent().parent().find('.b_onl').prop('src').indexOf('/offline') < 1 ? '1':'0'),objref.F);
	});

	$('img.b_unlink').tPoint({title:'unlink this object'});

	$('body').on('click','img.b_delete',function() {
		var objref = $.parseJSON($.base64.decode($(this).parents('.admindata').first().data('jpeto')));
		objref.U = objref.K.split('_')[0];
		objref.PU = objref.PK.split('_')[0];
		unlink('delete',objref.PU,objref.U,objref.T,objref.S,($(this).parent().parent().find('.b_onl').prop('src').indexOf('/offline') < 1 ? '1':'0'),objref.F);
	});

  $('img.b_delete').tPoint({title:'delete this object'});

	$('img.b_hide').each(function() {

		if ($(this).prop('src').indexOf('img/h.svg') > 0 && $(this).parents('.admindata').first().height() < 60) $(this).remove();
	});

	$('body').on('click','img.b_hide',function() {
		var objref = $.parseJSON($.base64.decode($(this).parents('.admindata').first().data('jpeto')));
		if ($('#tmpid')) $('#tmpid').prop('id','');
		$(this).prop('id','tmpid');
		$.get(jpeto_var_adminpath+'jpeto_admininterface_ajax_gateway.php', {
			act:'toggle',
			ojt:objref.T,
			okey:objref.K
		},
		function(response) {
			$('#tmpid').prop('src',$(response).prop('src')).prop('title',$(response).prop('title')).prop('id','');
		});
		$(this).parents('.admindata').first().children().first().children().first().toggle();
	});

	$('img.b_hide').tPoint({title:'minimize/maximize'});

	$('body').on('click','img.b_subtype',function() {
		$(this).next().toggle();
	});

	$('img.b_subtype').tPoint({title:'add subobjects'});
});