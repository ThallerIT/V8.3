function showDiv(divID, noanimate) {

  if (noanimate) {

    $('#'+divID).removeClass("hidDiv visDiv invDiv").addClass("visDiv");

  } else {

      $('#'+divID).slideDown();
      $('#'+divID).animate({opacity: 1},{queue: false});
  }

  return false;
}

function hideDiv(divID, noanimate) {

  if (noanimate) {

    $('#'+divID).removeClass("hidDiv visDiv invDiv").addClass("hidDiv");

  } else {

      $('#'+divID).slideUp();
      $('#'+divID).animate({opacity: 0},{queue: false});
  }

  return false;
}

function invDiv(divID) {

  $('#'+divID).removeClass("hidDiv visDiv invDiv").addClass("invDiv");
  return false;
}

function toggleDiv(divID, noanimate) {

  if ($('#'+divID).is(":visible"))
  {
    hideDiv(divID, noanimate);
    return false;

  } else {

    showDiv(divID, noanimate);
    return true;
  }
}

function getValue(url, obj)
{
  $.get(url,{}, function(response) {

    obj.innerHTML = response;
  });
}

function setSessionValue(nam,val, fn, cl) {
  $.get('/modules/ajax_gateway.php',
    {
      act:'sval',
      name:nam,
      value:val,
      clear:cl
    },
    function(response) {
      if (fn) {
        if (fn!='reload' && window[fn]) {
          window[fn]();
        } else {
          window.location.reload();
        }
      }
    }
  );
}

function selTax(val) {

  var ival = ''+val;
  while(ival.length < 4) ival = '0'+ival;

  var el = $('#j_TaxonomyValues').get(0);

  if ($('#j_TaxonomyValues').val().indexOf(ival) < 0) {

    $('#j_TaxonomyValues').val($('#j_TaxonomyValues').val()+($('#j_TaxonomyValues').val()!=''?";":"")+ival);
    getTaxonomyItem(val, 'taxonomy');
  }
  modified();
  return true;
}

function getTaxonomyItem(val,oid) {

  $.get('/admin/jpeto_admininterface_ajax_gateway.php', {
    act:'getTaxonomyItem',
    value:val
  },
  function(response) {
    $('#'+oid).html($('#'+oid).html()+response);
  });
}

function removeTaxonomyItem(val) {

  var arr = $('#j_TaxonomyValues').val();
  arr = (arr.indexOf(';') > -1 ? arr.split(';') : new Array(arr));

  var ret = new Array();

  for(var i=0; i < arr.length; i++) if (arr[i]!=val) ret.push(arr[i]);

  $('#j_TaxonomyValues').val(ret.join(';'));

  var tx = $('#taxonomy').get(0);
  var ch;

  if (tx.hasChildNodes()) {

    for(var i=0; i < tx.childNodes.length; i++) {

      ch = tx.childNodes[i];
      if (ch.id=='tid'+val) {
      	tx.removeChild(ch);
      	modified();
      }
    }
  }
}

function inValidCharSet(str,charset) {

  var result = true;
  for (var i=0;i<str.length;i++)
  if (charset.indexOf(str.substr(i,1))<0) {

    result = false;
    break;
  }
  return result;
}

function cleanStr(oid,charset) {

  var val = $('#'+oid).val();
  var ret = '';

  for(var i=0; i < val.length; i++)
    if (inValidCharSet(val.substr(i,1))) ret+= val.substr(i,1);

  $('#'+oid).val(ret);
}


function validateDDMMYYYY(oid,limit1,limit2) {

  var val = $('#'+oid).val();

  if (val.indexOf('.') < val.lastIndexOf('.')) {

    if (val.indexOf('.')==1)     val = '0'+val;
    if (val.lastIndexOf('.')==4) val = val.substr(0,3)+'0'+val.substr(3);
    if (val.length < 9)          val = val.substr(0,6)+((val.substr(6) > 30 ? 1900:2000)+ 1.0* val.substr(6));

    $('#'+oid).val(val);
  }

  return (val!='' &&
          val.length == 10 &&
          val.charAt(2)=='.' &&
          val.charAt(5)=='.' &&
          inValidCharSet(val,'.0123456789') &&
          val.substr(0,2) < 32 &&
          (val.substr(0,2) != 31 || $.inArray(val.substr(3,2), new Array('01','03','05','07','08','10','12')) > -1) &&
          ((val.substr(0,2) < 29 || val.substr(3,2) != '02') || (val.substr(0,2) == '29' && val.substr(3,2) == '02' && parseInt(val.substr(6,4)/4) == val.substr(6,4)/4)) &&
          val.substr(3,2) < 13 &&
          val.substr(0,2) > 0  &&
          val.substr(3,2) > 0 &&
          (!limit1 || DDMMYYYY2YYYYMMDD(val) >= limit1) &&
          (!limit2 || DDMMYYYY2YYYYMMDD(val) <= limit2));
}

function validateMMYYYY(oid,limit1,limit2) {

  var val = $('#'+oid).val();
  if (val.indexOf('/')==1) {

    val = '0'+val;
    $('#'+oid).val(val);
  }

  return (val!='' &&
          val.length == 7 &&
          val.charAt(2)=='/' &&
          inValidCharSet(val,'/0123456789') &&
          val.substr(0,2) < 13 &&
          val.substr(0,2) > 0  &&
          (!limit1 || MMYYYY2YYYYMM(val) >= limit1) &&
          (!limit2 || MMYYYY2YYYYMM(val) <= limit2));
}

function DDMMYYYY2YYYYMMDD(val) {

  return val.substr(6,4)+'-'+val.substr(3,2)+'-'+val.substr(0,2);
}

function MMYYYY2YYYYMM(val) {

  return val.substr(3,4)+'/'+val.substr(0,2);
}

function validateYYYYMMDD(oid,limit1,limit2) {

  var val = $('#'+oid).val();

  if (val.indexOf('-') < val.lastIndexOf('-')) {

    if (val.indexOf('-') < 4)     val = (val.substr(0,val.indexOf('-')) > 30 ? 1900:2000)+ 1.0* val.substr(0,val.indexOf('-'))+val.substr(val.indexOf('-'));
    if (val.lastIndexOf('-') < 7) val = val.substr(0,val.lastIndexOf('-')-1)+'0'+val.substr(val.lastIndexOf('-')-1);
    if (val.length < 10)          val = val.substr(0,val.lastIndexOf('-')+1)+'0'+val.substr(val.lastIndexOf('-')+1);

    $('#'+oid).val(val);
  }

  return (val!='' &&
          val.length == 10 &&
          val.charAt(4)=='-' &&
          val.charAt(7)=='-' &&
          inValidCharSet(val,'-0123456789') &&
          val.substr(8,2) < 32 &&
          (val.substr(8,2) != 31 || $.inArray(val.substr(5,2), new Array('01','03','05','07','08','10','12')) > -1) &&
          ((val.substr(8,2) < 29 || val.substr(5,2) != '02') || (val.substr(8,2) == '29' && val.substr(5,2) == '02' && parseInt(val.substr(0,4)/4) == val.substr(0,4)/4)) &&
          val.substr(5,2) < 13 &&
          val.substr(8,2) > 0  &&
          val.substr(5,2) > 0 &&
          (!limit1 || val >= limit1) &&
          (!limit2 || val <= limit2));
}

function validateYYYYMMDDHHMMSS(oid,limit1,limit2) {

  var val = $('#'+oid).val();

  if (val.indexOf('-') < val.lastIndexOf('-')) {

    if (val.indexOf('-') < 4)     val = (val.substr(0,val.indexOf('-')) > 30 ? 1900:2000)+ 1.0* val.substr(0,val.indexOf('-'))+val.substr(val.indexOf('-'));
    if (val.lastIndexOf('-') < 7) val = val.substr(0,val.lastIndexOf('-')-1)+'0'+val.substr(val.lastIndexOf('-')-1);
    if (val.length < 10)          val = val.substr(0,val.lastIndexOf('-')+1)+'0'+val.substr(val.lastIndexOf('-')+1);

    $('#'+oid).val(val);
  }

  return (val!='' &&
          val.length == 19 &&
          val.charAt(4)=='-' &&
          val.charAt(7)=='-' &&
          inValidCharSet(val,' :-0123456789') &&
          val.substr(8,2) < 32 &&
          (val.substr(8,2) != 31 || $.inArray(val.substr(5,2), new Array('01','03','05','07','08','10','12')) > -1) &&
          ((val.substr(8,2) < 29 || val.substr(5,2) != '02') || (val.substr(8,2) == '29' && val.substr(5,2) == '02' && parseInt(val.substr(0,4)/4) == val.substr(0,4)/4)) &&
          val.substr(5,2) < 13 &&
          val.substr(8,2) > 0  &&
          val.substr(5,2) > 0 &&
          val.charAt(10)==' ' &&
          val.charAt(13)==':' &&
          val.charAt(16)==':' &&
          val.substr(11,2) >= 0 &&
          val.substr(11,2) < 24 &&
          val.substr(14,2) >= 0 &&
          val.substr(14,2) < 60 &&
          val.substr(17,2) >= 0 &&
          val.substr(17,2) < 60 &&
          (!limit1 || val >= limit1) &&
          (!limit2 || val <= limit2));
}

function convertDate(oid) {

  $.get('/admin/jpeto_admininterface_ajax_gateway.php', {
    act:'convDate',
    date:$('#'+oid).val()
  },
  function(response) {

    $('#'+oid).val(response);
  });
}

function validateHHMM(oid) {

  var val = $('#'+oid).val();

  val = val.replace(/\./g, ':');
  val = val.replace(/-/g, ':');
  val = val.replace(/ /g, ':');

  if (val=='') val='00:00';
  if (val.indexOf(':') < 0) {

    if (val.length == 1) val = '0'+val;
    val = val.substr(0,val.length-2)+':'+val.substr(val.length-2);
  }
  while (val.length < 5) val = '0'+val;
  var h = parseInt(val.substr(0,2));
  var m = parseInt(val.substr(3,2));
  if (h > 23 || m > 59) val='00:00';

  $('#'+oid).val(val);
}

function validateEmail(oid) {

  var val = $('#'+oid).val();
  var num = 0;

  for (var i=0; i < val.length; i++)
  {
    if (val.substr(i,1)=="@") num++;
  }

  return (val!="" && (val.indexOf('.') > -1 && val.indexOf('@') >= 1 && val.indexOf('@') < val.length-4
  && val.indexOf('@') < val.lastIndexOf('.') && val.lastIndexOf('.') < val.length-2 && num == 1));
}

function notEmpty(oid) {

  return $('#'+oid).val()!='';
}

function validateNumber(oid,limit1,limit2) {

  var val = $('#'+oid).val();
  return inValidCharSet(val, '+-.0123456789ex') && $.isNumeric(val) && (!limit1 || 1.0 * val >= 1.0 * limit1) && (!limit2 || 1.0 * val <= 1.0 * limit2);
}

function validateInteger(oid,limit1,limit2) {

  var val = $('#'+oid).val();
  return inValidCharSet(val, '+-0123456789') && $.isNumeric(val) && (!limit1 || 1.0 * val >= 1.0 * limit1) && (!limit2 || 1.0 * val <= 1.0 * limit2);
}

function validatePhone(oid) {

  var val = $('#'+oid).val();
  return (val.match(/^\+\d{2,3}\s\d+\s\d+(\-\d+)*$/) != null);
}

function validateURL(oid) {

  var val = $('#'+oid).val();
  return (val.match(/[^a-zA-Z0-9._~//\-\(\)\[\]]/) != null);
}

function cleanURL(oid) {

  var val = $('#'+oid).val();
  var ret = '';

  for(var i=0; i < val.length; i++)
    if (val.substr(i,1).match(/[^a-zA-Z0-9._~//\-\(\)\[\]]/) == null || (i==0 && val.substr(i,1)=='#')) ret+= val.substr(i,1);

  $('#'+oid).val(ret);
}

function cleanURLHash(oid) {

  var val = $('#'+oid).val();
  var ret = '';

  for(var i=0; i < val.length; i++)
    if (val.substr(i,1).match(/[^a-zA-Z0-9._~\-\(\)\[\]]/) == null || (i==0 && val.substr(i,1)=='#')) ret+= val.substr(i,1);

  $('#'+oid).val(ret);
}


function changeOwner() {

  if ($('#res').is(':visible')) hideDiv('res');
  if ($('#own').is(':visible')) {

    hideDiv('own');

  } else {
    $.get('/admin/jpeto_admininterface_ajax_gateway.php', {

      act:'pickowner'
    },
    function(response) {
      $('#own').html(response);
      showDiv('own');
    });
  }
}

function suggestOwner(s_Owner) {

  $.getJSON('/admin/jpeto_admininterface_ajax_gateway.php', {
    act:'suggestowner',
    s_Owner:s_Owner
  },
  function(response) {
    var items = [];
    $.each(response, function(key,val) {
      items.push("<option value='" + key + "'>" + val + "<"+"/option>");
    });

    $('#p_Owner').html("<option value=\"\">- change owner -<"+"/option>"+items.join(""));
  });
}

function setOwner(p_Owner) {

  if (p_Owner!='') {

    $('#j_Owner').val(p_Owner);
    $('#owner').html(p_Owner);
    hideDiv('own');
    modified();
  }
}

function addCode(sCode) {

  var sVal = $('#j_Restrictions').val();
  var sLen = sVal.length;
  var sCLen = sCode.length;

  if (sLen >= sCLen) {

    chk = sVal.substr(sLen - sCLen, sCLen);
    if (chk == sCode) {

      $('#j_Restrictions').val(sVal.substr(0, sLen - sCLen));
      modified();
      return;
    }
  }

  if (sCode.charAt(0)=='(' && sVal.charAt(sLen-1) == ')') {

    alert('use [AND] or [OR] to combine terms!');

  } else if (sCode.charAt(0)=='&' && sVal.charAt(sLen-1) == '|') {
    alert('recently added [OR]!');

  } else if (sCode.charAt(0)=='|' && sVal.charAt(sLen-1) == '&') {

    alert('recently added [AND]!');

  } else {

    $('#j_Restrictions').val(sVal + sCode);
    modified();
  }

  return;
}

function getLoggedVersion(jt,okey,timestamp,selidx) {

  $('#ObjectContent').animate({opacity: 0, duration: 800},{queue: false});

  $('#ObjectContent').slideUp(1000).queue(function() {

    $.get('/admin/jpeto_admininterface_ajax_gateway.php', {

      act:'getLoggedVersion',
      jt:jt,
      okey:okey,
      timestamp:timestamp,
      idx:selidx
    },
    function(response) {

      $('#ObjectContent').html(response);
      initAI();
      initPageLayout();

      $('#ObjectContent').slideDown(1000);

      $('#ObjectContent').animate({opacity: 1, duration: 800},{queue: false});
    });

    $(this).dequeue();
  });

}

function initAI() {
}

function addTermToCollection(term, CID) {

  var terms = new Array();

  $('#'+CID+'_sel option').each(function() {
    if ($(this).val()!='') {
      var obj = new Object();
      obj.val = $(this).val();
      obj.txt = $(this).text();
      terms.push(obj);
    }
  });

  $.post('/admin/jpeto_admininterface_ajax_gateway.php',
    $.param({
		  act:'addTermToCollection',
      term:term,
		  terms:terms,
			CID:CID,
			val:$('#'+CID).val()
		}),

		function(data) {
		  if (data['succ']=='1') {
			  $('#'+CID+'_div').html(data['html']);
				$('#'+CID).val(data['val']);
				modified();
			}
	  },

		'json'
  );
}

function removeTermFromCollection(term, CID) {

  var terms = new Array();

  $('#'+CID+'_sel option').each(function() {
    if ($(this).val()!='') {
      var obj = new Object();
      obj.val = $(this).val();
      obj.txt = $(this).text();
      terms.push(obj);
    }
  });

  $.post('/admin/jpeto_admininterface_ajax_gateway.php',
    $.param({
		  act:'removeTermFromCollection',
      term:term,
      terms:terms,
			CID:CID,
			val:$('#'+CID).val()
		}),

		function(data) {
		  if (data['succ']=='1') {
			  $('#'+CID+'_div').html(data['html']);
				$('#'+CID).val(data['val']);
				modified();
			}
	  },

		'json'
  );
}

function findBootstrapEnvironment() {
  var envs = ['xs', 'sm', 'md', 'lg', 'xl'];

  var $el = $('<div>');
  $el.appendTo($('body'));

  for (var i = envs.length - 1; i >= 0; i--) {
    var env = envs[i];
    $el.addClass('d'+(env != 'xs' ? '-'+env:'')+'-none');
    if ($el.is(':hidden')) {
      $el.remove();
      return env;
    }
  }
}

function addCode(sCode) {

  var sVal = $('#f_Restrictions').val();
  var sLen = sVal.length;
  var sCLen = sCode.length;

  if (sLen >= sCLen) {

    chk = sVal.substr(sLen - sCLen, sCLen);
    if (chk == sCode) {

      $('#f_Restrictions').val(sVal.substr(0, sLen - sCLen));
      modified();
      return;
    }
  }

  if (sCode.charAt(0)=='(' && sVal.charAt(sLen-1) == ')') {

    alert('use [AND] or [OR] to combine terms!');

  } else if (sCode.charAt(0)=='&' && sVal.charAt(sLen-1) == '|') {
    alert('recently added [OR]!');

  } else if (sCode.charAt(0)=='|' && sVal.charAt(sLen-1) == '&') {

    alert('recently added [AND]!');

  } else {

    $('#f_Restrictions').val(sVal + sCode);
    modified();
  }

  return;
}

function initPageLayout() {

  $('html').removeClass('device-xl device-lg device-md device-sm device-xs').addClass('device-'+(findBootstrapEnvironment()||"xs"));

  $('[data-toggle="tooltip"]').tooltip();

  $('[data-toggle="popover"]').popover();

  $('.popover-dismiss').popover({
    trigger: 'focus'
  });

  if(window.location.hash) {
    var hash = window.location.hash;
    if ($(hash).hasClass('modal')) $(hash).modal('toggle');
	}
}

function getAlert(message, severity) {

  if (!severity) severity = 'danger';

  return '<div class="alert alert-' + severity + ' alert-dismissible fade show" role="alert">' +
              message +
              '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
              '</button>' +
            '</div>';
}

var isModified = false;

function modified() {
  $('.ai-status').addClass('ai-warning').text('object modified.');
  isModified = true;
}

$(document).ready(function() {

  $(window).bind('keydown', function(event) {
    /* closes modals and later the whole page on ESC */
    if (event.which == 27) {
      event.preventDefault();
      var modalOpen = false;
      $('.modal').each(function(){
        if ($(this).hasClass('show')) {
          modalOpen = true;
          $(this).modal('toggle');
        }
      });
      if (!modalOpen) {
        if (isModified) {
          if (confirm('Object has been modified - discard changes?')) top.close();
        } else {
          top.close();
        }
      }
    }
  });

  // initialise datepicker
  $('.ai-datepicker').datepicker({ dateFormat: "yy-mm-dd",
                                   monthNames: ['Jänner','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
                                   dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
                                   firstDay: 1,
                                   constrainInput: true,
                                   onClose: function() {
                                     if ($('html').hasClass('device-xs')) $(this).attr("readonly", false);
                                   },
                                   beforeShow: function() {
                                     if ($('html').hasClass('device-xs')) $(this).attr("readonly", true).blur();
                                     setTimeout(function(){
                                       $('.ui-datepicker').css('z-index', 9);
                                     }, 0);
                                   }
  });

  /* sort list by columns */
  $('body').on('click', 'th.sortable', function() {
    var asc = $(this).hasClass('asc');
    var desc = $(this).hasClass('desc');
    $('th.sortable').removeClass('asc').removeClass('desc');
    if (desc || (!asc && !desc)) {
      $(this).addClass('asc');
    } else {
      $(this).addClass('desc');
    }
    var pre = $(this).parent().parent().parent().data('pre');
    setSessionValue((pre?pre:'ai')+'-list-order', $(this).index(), refreshList);
  });

  /* clear input fields on double click */
  $('body').on('dblclick','input', function(){ $(this).val('').trigger('change'); modified(); });

  /* adjust height of modal window iframes */
  $('.modal-fullsize').on('shown.bs.modal', function() {
    $(this).find('iframe').css('min-height', $(this).find('.modal-body').height()).scrollTop();
  });

  /* collapsable sections */
  $('body').on('show.bs.collapse', '.ai-section', function () { setSessionValue($(this).prop('id'),'1'); $('.'+$(this).prop('id')).attr('data-icon','square-caret-down').parent().addClass('btn-dark'); });
  $('body').on('hide.bs.collapse', '.ai-section', function () { setSessionValue($(this).prop('id'),'0'); $('.'+$(this).prop('id')).attr('data-icon','square-caret-right').parent().removeClass('btn-dark'); });

  /* set session values of dropdowns in toolbar */
  $('body').on('click', '.btn-toolbar .dropdown-item', function() {
    var val = ($(this).hasClass('ai-reset-item') ? '':($(this).data('value') ? $(this).data('value') : $(this).text()));
		setSessionValue('ai-list-start', 0);
    setSessionValue($(this).parent().prop('id'), val, refreshList);
    $(this).parent().find('.active').removeClass('active');
    $(this).addClass('active');
    $(this).parent().prev().text($(this).is('a') ? '':$(this).text());
  });

  /* initialize dropdown menu with active value */
  $('.dropdown-menu').each(function(){
    var activeFound = false;
    $(this).children().each(function(){
      if ($(this).hasClass('active')) {
        activeFound = true;
        $(this).parent().prev().text($(this).text());
      }
    });

    // set default if no active
    if (!activeFound && $(this).children().eq(0).hasClass('ai-reset-item')) $(this).prev().text($(this).children().eq(0).text());
  });



  /* handles for input groups */
  $('body').on('click','.ai-handle', function(){
    $(this).parent().parent().find('input, select').eq(0).focus();
  });

  /* set session values of input fields and checkboxes in toolbar */
  $('body').on('change', '.ai-ssv', function() {

    if ($(this).is(':checkbox')) {
      setSessionValue($(this).prop('id'), ($(this).get(0).checked ? $(this).val():''), refreshList);
    } else {
      setSessionValue($(this).prop('id'), ($(this).hasClass('ai-reset-item') ? '':$(this).val()), refreshList);
    }
  });

  /* handles shift-click to check all checkboxes between current and last click */
  var lastChecked = null;
  $('body').on('click', '.cb-slave', function(e) {
    if(!lastChecked) {
      lastChecked = this;
      return;
    }
    if(e.shiftKey) {
      var start = $('body .cb-slave').index(this);
      var end = $('body .cb-slave').index(lastChecked);
      $('body .cb-slave').slice(Math.min(start,end), Math.max(start,end)+ 1).each(function() { if (!$(this).is(':disabled')) $(this).attr('checked', lastChecked.checked); });
    }
    lastChecked = this;
  });

  /* sets slave checkboxes according to status of master checkbox */
  $('body').on('click', '.cb-master', function() {
    $('body .cb-slave').not(':disabled').prop('checked',($(this).get(0).checked));
  });

  /* pagination click */
  $('body').on('click','.page-link', function() {
    var pre = $(this).parent().parent().data('pre');
    setSessionValue((pre?pre:'ai')+'-list-start', $(this).data('page'), refreshList);
  });

  /* refresh button */
  $('body').on('click', '.ai-refresh', function() {
    refreshList();
  });

  /* refresh list of groups after loading modal */
  $('#ai-groups').on('shown.bs.modal', function() {

    $('.ai-modal-wrapper:visible').toggle();
    $.getJSON('/admin/jpeto_admininterface_ajax_gateway.php',
    {
      act:'refreshGrp'
    },
    function(data) {

      $('#ai-group-id').html(data['options']);
    });
  });

  /* save on hitting "return" */
  $('input, select').keypress(function(e){

    if(e.which == 13) {
      e.preventDefault();
      $('.ai-save').trigger('click');
    }
  });

});

