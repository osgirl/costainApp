var cms=(function(module){
    module.setApplication=setApplication;
    module.init=init;
    function setApplication(app){
        module.app=app;
    }
    function init(){

    }
    return module;
})(cms ||{});

cms.model=(function(module){
    module.getContent=getContent;
    module.getAppStructure=getAppStructure;
    module.getContentExtra=getContentExtra;
    module.getRSSFeed=getRSSFeed;

    function getRSSFeed(feedId,cb){
        getContentExtra("import","json","rss",feedId,cb);
    }

    function getContent(contentId,cb){
        var param={
            "contentId":contentId
        }
        _act("getContent",param,cb);
    }

    function getAppStructure(cb){
        var param={
            "alias":cms.app.alias
        }
        _act("getAppStructure",param,cb);
    }

    function getContentExtra(cat,type,template,extraId,cb){
        var param={
            "cat":cat,
            "type":type,
            "template":template,
            "extraId":extraId
        }
        _act("getContentExtra",param,cb);
    }
    function _act(name,param,cb){
        $fh.act({
            "act":name,
            "req":param
        },function(res){
            cb(null,res);
        },function(err){
            console.log(err);
            cb(err, null);
        });
    }

    return module;
})(cms.model||{});
cms.events=(function(module){
    module.on=on;
    module.off=off;
    module.emit=emit;

    var events={};

    function on(e,cb){
        _registerEvent(e,cb);
    }
    function off(e,cb){
        _unregisterEvent(e,cb);
    }
    function emit(){
        var args=Array.prototype.slice.call(arguments,0);
        var e=args.shift();
        var funcs=events[e];
        if (funcs && funcs.length>0){
            for (var i=0;i<funcs.length;i++){
                var func=funcs[i];
                func.apply(this,args);
            }
        }
    }
    function _unregisterEvent(name,func){
        if (events[name]){
            if (events[name].indexOf(func)>=0){
                events[name].splice(events[name].indexOf(func),1);
            }
        }
    }
    function _registerEvent(name,func){
        if (!events[name]){
            events[name]=[]
        }
        if (events[name].indexOf(func)<0){
            events[name].push(func);
        }
    }
    return module;
})(cms.events || {});
cms.model = (function(module) {

  // Public functions
  module.create = _create;
  module.read = _read;
  module.KEYS = {
    AppStructure: 'AppStructure'
  };


  /**
   * Parse JSON to string
   * @return
   */

  function stringifyJson(data, callback) {
    try {
      return callback(null, JSON.stringify(data))
    } catch (e) {
      return callback(e, null);
    }
  }

  /**
   * Parse string to JSON Object
   */

  function parseToJson(str, callback) {
    try {
      return callback(null, JSON.parse(str))
    } catch (e) {
      return callback(e, null);
    }
  }


  /**
   * Read entry from local storage
   */

  function _read(key, callback) {
    $fh.data({
      act: 'load',
      key: key
    }, function(res) {
      return parseToJson(res.val, callback);
    }, function(msg, err) {
      return callback(err, null);
    });
  }


  /**
   * Create entry in local storage
   */

  function _create(key, data, callback) {
    // Callback is optional
    callback = callback || function(err) {
      if(err) {
        console.log('Failed to save to local storage for key: ' + key, data);
      }
    };

    stringifyJson(data, function(err, json) {
      if (err) {
        return callback(err, null);
      }

      $fh.data({
        act: 'save',
        key: key,
        data: json
      }, function(res) {
        return callback(null, res);
      }, function(msg, err) {
        return callback(err, null);
      })
    });
  }

  return module;
})(cms.model || {});
cms.service = (function(module) {
  module.sync = sync; // sync content
  module.startPoll = startPoll; //seconds as parameter
  module.stopPoll = stopPoll;

  // Time when the app should check for an update
  var timerId = null;

  /**
   * Get content from CMS and save to localstorage.
   */

  function sync() {
    cms.model.getAppStructure(function(err, res) {
      if(err) {
        console.log('Failed to get CMS updated content');
      }
      console.log('Got updated CMS content.');

      cms.model.create(cms.model.KEYS.AppStructure, res, function(err, res) {
        if(!err) {
          console.log('Saved CMS content to localstorage');
        } else {
          console.log('Failed to save CMS content to localstorage');
        }
      });
    });
  }

  // TODO Handle device events, 'resume' etc
  function startPoll(seconds) {
    // Clear old timers
    stopPoll();

    // New timer
    timerId = setInterval(function() {
      sync();
    }, seconds * 1000);
  }

  function stopPoll() {
    clearInterval(timerId);
  }


  return module;
})(cms.service || {});
cms.data = (function(module) {
  module.getContent = getContent;
  module.getAppStructure = getAppStructure;
  module.getContentExtra = getContentExtra;
  module.getRSSFeed = getRSSFeed;


  function getContent(contentId, callback) {
    cms.model.read(contentId, function(err, res) {
      if (err || !res) {
        return cms.model.getContent(contentId, function(err, res) {
          if (err) {
            return callback(err, null);
          }
          // Save the content to local storage
          cms.model.create(contentId, res);
          return callback(null, res);
        });
      }

      return callback(null, res);
    });
  }


  function getAppStructure(callback) {
    cms.model.read(cms.model.KEYS.AppStructure, function(err, res) {
      if (err || !res) {
        return cms.model.getAppStructure(function(err, res) {
          if (err) {
            return callback(err, null);
          }

          // Save the content to local storage
          cms.model.create(cms.model.KEYS.AppStructure, res);
          return callback(null, res);
        });
      }

      return callback(null, res);
    });
  }


  function getContentExtra(cat, type, template, extraId, cb) {

    function constructExtraKey(arr) {
      var key = '';
      for (var i = arr.length - 1; i >= 0; i--) {
        key += arr[i];
      };

      return key;
    }

    cms.model.read(constructExtraKey([cat, type, template, extraId]), function(err, res) {
      if (err || !res) {
        cms.model.getContentExtra(cat, type, template, extraId, function(err, res) {
          if (err) {
            return callback(err, null);
          }

          // Save the content to local storage
          cms.model.create(constructExtraKey([cat, type, template, extraId]), res);
          return callback(null, res);
        });
      }

      return callback(null, res);
    });
  }


  function getRSSFeed(feedId, callback) {
    getContentExtra("import", "json", "rss", feedId, cb);
  }


  return module;
})(cms.data || {});
cms.ui = (function(module) {
    module.setRenderer = setRenderer;
    module.render = render;
    module.registerType = registeredType;

    var renderer = null;
    var registeredType = {};
    var uis = {};

    function setRenderer(_renderer) {
        renderer = _renderer;
    }

    function render(element, cb) {
        var alias = element.alias;
        if (registeredType[alias]) {
            return registeredType[alias](element, cb);
        }
        if (element.children) { //list
            return renderer.renderList(element, cb);
        } else if (element.cat == "core") {
            if (element.cat == "html") {
                return renderer.renderHtml(element, cb);
            }
        } else if (element.cat == "template") {

        } else if (element.cat == "import") {

        }
        return renderer.defaultRender(element, cb);
    }

    function registerType(alias, renderFunc) {
        registeredType[alias] = renderFunc;
    }

    function initUi(cb) {
        com.daa.getAppStructure(function(err, appStructure) {
            var root = appStructure.content;
            _recursiveParseApp(root,cb);
        });
    }

    function _recursiveParseApp(element, cb) {
        var alias = element.alias;
        render(element, function(err, html) {
            uis[alias] = html;
            if (element.children) {
                var elementCount = 0;
                for (var key in element.children) {
                    elementCount++;
                    var nextElement = element.children[key];
                    _recursiveParseApp(nextElement, function() {
                        setTimeout(function() {
                            elementCount--;
                            if (elementCount == 0) {
                                cb();
                            }
                        }, 0);

                    });
                }
            } else {
                cb();
            }
        });

    }
    return module;
})(com.ui || {});
cms.ui.jqueryMobile = (function(module) {
    module.renderList = renderList;

    function renderList(category, cb) {
        var title = category.name;
        var alias = category.alias;
        var children = category.children;
        var innerHtml = "";
        for (var key in children) {
            var ele = children[key];
            var eleName = ele.name;
            innerHtml += "<li><a href='#" + key + "'>" + eleName + "</a></li>";
        }
        var html = '<div data-role="page" id="' + alias + '">' +
            '<div data-role="header"><h2>' + title + '</h2></div>' +
            '<div data-role="content">' +
            '<ul data-role="listview" data-inset="true">' +
            innerHtml '</ul>' +
            '</div>' +
            '</div>';
        cb(null,html);
    }


    return module;
})(cms.ui.jqueryMobile || {});
cms.ui.jqueryMobile=(function(module){
    module.renderHtml=renderHtml;

    function renderHtml(element,cb){
        
    }


    return module;
})(cms.ui.jqueryMobile ||{});
cms.ui.jqueryMobile=(function(module){
    module.renderRSS=renderRSS;

    function renderRSS(element,cb){
        
    }


    return module;
})(cms.ui.jqueryMobile ||{});
cms.ui.jqueryMobile=(function(module){
    module.renderRSSFeed=renderRSSFeed;

    function renderRSSFeed(element,cb){
        
    }


    return module;
})(cms.ui.jqueryMobile ||{});
cms.ui.jqueryMobile=(function(module){
    module.defaultRender=defaultRender;

    function defaultRender(element,cb){
        cb(null,"");
    }


    return module;
})(cms.ui.jqueryMobile ||{});
