tinymce.PluginManager.add('jmedia',function(editor,url){
  editor.addButton('jmedia',{
		title: 'JPETo™ Media Manager',
		icon: 'media',
		onclick: function(){

      editor.windowManager.open({
          title: "JPETo™ Media Manager",
          url: '/admin/jpeto_media_manager_dialog.php',
          width: 700,
          height: 400
      },{
          content: tinymce.activeEditor.selection.getContent({format: 'html'}),
          nodeName: editor.selection.getNode().nodeName
      });

	  }
  });
});



