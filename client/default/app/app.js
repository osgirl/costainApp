var app=(function(module) {
  module.init=init;
  module.myUI={};

  function init(){
    //init cms sdk
    cms.init({
      alias: 'costainapp_1383735125091'
    });  
  }

  return module;
  
})(app || {});