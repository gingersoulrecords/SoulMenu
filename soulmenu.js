jQuery(document).ready(function($) {

  // Insert SoulMenu Mobile Toggle
  $('.soulmenu').each(function(i, el) {

    var $sm = $(el), 
        $smToggle = $('<button class="soulmenu-toggle"><span class="sm-visually-hidden">Menu</span><span></span><span></span><span></span></button>');

    if ( ! $sm.prev('.soulmenu-toggle').length ) {
      $smToggle.insertBefore( $sm );
    }

    // Add Submenu Toggle
    $sm.find('li.menu-item-has-children').each(function(i, el) {

      var $li = $(el),
          $submenuToggle = $('<button class="soulmenu-submenu-toggle"><span class="sm-visually-hidden"></span></button>');

      if ( ! $li.prev('.soulmenu-toggle').length ) {
        $submenuToggle.prependTo( $li );
      }

    });
    
  });

  // When SoulMenu Mobile Toggle is Clicked
  $(document).on('click', '.soulmenu-toggle', function(e) {
    e.preventDefault();
    var $this = $(this),
        $sm = $this.siblings('.soulmenu');

    if ( $sm.hasClass('soulmenu--opened') ) {
      $this.removeClass('soulmenu-toggle--active');
      $sm.removeClass('soulmenu--opened').slideDown(500);
    } else {
      $this.addClass('soulmenu-toggle--active');
      $sm.addClass('soulmenu--opened').slideUp(500);
    }

  });

  // When Submenu Toggle is Clicked
  $(document).on('click', '.soulmenu-submenu-toggle', function(e) {
    e.preventDefault();
    var $this = $(this),
        $submenu = $this.siblings('.sub-menu');

    if ( $submenu.hasClass('soulmenu-submenu--opened') ) {
      $this.removeClass('soulmenu-submenu-toggle--active');
      $submenu.removeClass('soulmenu-submenu--opened').slideUp(500);
    } else {
      $this.addClass('soulmenu-submenu-toggle--active');
      $submenu.addClass('soulmenu-submenu--opened').slideDown(500);
    }

  });
  
});