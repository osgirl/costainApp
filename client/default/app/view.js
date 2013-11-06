app.view=(function(module){
    module.changePage=changePage;

    function changePage(){
        var args=Array.prototype.slice.call(arguments,0);
        var id=args.shift();
        if ($("#"+id).length==0){
            _injectPage(id);
        }
        args.unshift($("#"+id));
        $.mobile.changePage.apply($.mobile,args);
    }

    function _injectPage(alias){
        $("#container").append(cms.ui.getHtml(alias));
    }
    return module;
})(app.view||{});