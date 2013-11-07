app.view=(function(module){
    module.changePage=changePage;

    function changePage(){
        var args=Array.prototype.slice.call(arguments,0);
        var id=args.shift();
        if ($("#"+id).length>0){
            $("#"+id).remove();
        }
        _injectPage(id);
        args.unshift("#"+id);
        setTimeout(function(){
            $.mobile.changePage.apply($.mobile,args);    
        },1);
        
    }

    function _injectPage(alias){
        $("#container").append(cms.ui.getHtml(alias));
    }
    return module;
})(app.view||{});