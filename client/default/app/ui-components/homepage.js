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
      var html = '<li><a href="#"><div data-nav="' + section.alias + '">'+
        '<img class="home-icon" src="img/' + section.name.toLowerCase() + '.png">'+
        '<p>'+section.name+'</p>'+
        '</div></a></li>';

      var ele = $(html);
      ele.bind('click', function(e) {
        app.view.changePage(section.alias);
        return false;
      });
      return ele;
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