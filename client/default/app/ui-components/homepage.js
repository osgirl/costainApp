(function() {
  // Element is the children of costainapp_1383735125091
  cms.ui.registerType('costainapp_1383735125091', function(element, cb) {    

    /**
     * Get icon for section
     * @param {String} section
     */
    function getIconFor(section) {
      section = section.toLowerCase();

      var icon = '';

      switch (section) {
        case 'home':
          icon = 'img/icon/home.png';
          break;
        case 'news':
          icon = 'img/icon/news.png';
          break;
        case 'about':
          icon = 'img/icon/about.png';
          break;
        case 'contact':
          icon = 'img/icon/contact.png';
          break;
        case 'video':
          icon = 'img/icon/video.png';
          break;
        default:
          icon = 'img/icon/default.png';
      }

      return icon;
    }

    /**
     * Create button for provided section
     * @param {String} section
     */
    function createButton(section) {
      // <a href="#about" data-role="button" data-icon="about">About</a>

      var btn = $('<a>');
      btn.attr('href', section.name);
      btn.data('role', 'button');
      btn.data('icon', getIconFor(section.name));
      return $('<li>').append(btn);
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