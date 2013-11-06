var app=(function(module) {
  module.init=init;
  module.myUI={};

  function init(){
    //init cms sdk
    cms.init({
      alias: 'costainapp_1383735125091',
      onNav:function(contentId){
        app.view.changePage(contentId);
      }
    });  
    //TODO add loading spiner
    cms.ui.initUi(function(){
        $("#homePage [data-role='content']").html(cms.ui.getHtml(cms.app.alias));
    });
  }

  return module;
  
})(app || {});