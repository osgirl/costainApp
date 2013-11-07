cms.ui.registerType('videos_1383829400928', function(element, cb) {
    var id = element._id;
    var name = element.name;
    cms.data.getContent(id, function(err, fullEle) {
        var content = fullEle.content;

        var template = '<div data-role="page" id="%{id}%" class="videoPage">' +
            '    <div data-role="header" data-position="fixed" data-tap-toggle="false">' +
            '      <h1 >' + name + '</h1>' +
            '    </div>' +
            '    <div data-role="content">' +
            '        <ul>' + '{content}' +
            '          </ul>' +
            '  </div>' +
            '</div>';
        var contentHtml = "";
        for (var key in content) {
            var obj = content[key];
            var img = obj.thumbnail;
            var n = obj.name;
            var url = obj.url;
            var dateAdd = obj.dateadded;
            contentHtml += '<li><a href="javascript:cms.util.webview(\''+url+'\')" target="_blank">' +
                '    <div class="imgRow"><img src="'+img+'"/></div>' +
                '    <div class="nameRow">'+n+'</div>' +
                '    <div class="dateRow">'+dateAdd+'</div>' +
                '    </a>' +
                '</li>';
        }
        template=template.replace("{content}",contentHtml);
        cb(null,template);
    });
});