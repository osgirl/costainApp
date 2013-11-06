(function() {
  // Element is the children of costainapp_1383735125091
  cms.ui.registerType('costainapp_1383735125091', function(element, cb) {

    /**
     * Get icon for section
     * @param {String} section
     */
    function getIconFor(section) {
      return section.toLowerCase();
    }

    /**
     * Create button for provided section
     * @param {String} section
     */
    function createButton(section) {
      // <a href="#about" data-role="button" data-icon="about">About</a>
      var html = '<li><a href="#"><div data-nav="' + section.alias + '" class="home-icon" style="-webkit-mask-box-image: url(img/'+section.name.toLowerCase()+'.png);">'+
        '</div><p>'+section.name+'</p>'+
        '</a></li>';

      var ele = $(html);
      return ele.bind('click', function(e) {
        app.view.changePage(section.alias);
        return false;
      });
    }


    /**
     * Create all home page buttons 
     * @param {Object | Array} elements
     */
    function createHomeButtons(elements) {
      var ul = $('<ul>');
      $.each(elements, function(i, obj) {
        ul.append(createButton(obj));
      });

      return ul;
    }


    return cb(null, createHomeButtons(element.children));
  });
})();