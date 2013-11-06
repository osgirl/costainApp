var app=(function(module) {
  module.init=init;
  module.myUI={};

  function init(){
    //init cms sdk
    cms.init({
      alias: 'costainapp_1383735125091'
    });  
    //TODO add loading spiner
    cms.ui.initUi(function(){
        console.log("UI inited");
        var homeList=cms.ui.getHtml(cms.app.alias);
        // $("#homePage")
    });
  }

  return module;
  
})(app || {});