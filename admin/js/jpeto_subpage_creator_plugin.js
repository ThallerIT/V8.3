tinymce.PluginManager.add('jsubpage',function(editor,url){
  editor.addButton('jsubpage',{
		title: 'JPETo™ Subpage Creator',
		icon: 'orientation',
		onclick: function(){

      editor.windowManager.open({
          title: "JPETo™ Subpage Creator",
          url: '/admin/jpeto_subpage_creator_dialog.php?okey='+$('#j_UniqueID').val()+'_'+$('#j_Language').val()+'_'+$('#j_Version').val()+'&jt='+$('#j_JpetoType').val(),
          width: 700,
          height: 350
      },{
          content: tinymce.activeEditor.selection.getContent({format: 'html'}),
          nodeName: editor.selection.getNode().nodeName
      });

	  }
  });
});



