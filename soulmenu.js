jQuery(document).ready(function($) {


	$('.soulmenu-style-horizontal').each(function(){
		
		$this = $(this);
		
		//make containers overflow visible
		if($this.find('.menu-item-has-children').length > 0){
			$this.parents('.ss-subsection, .ss-container').css('overflow','visible');
		}
		
	    // Add Submenu Toggle
	    $this.find('li.menu-item-has-children').each(function(i, el) {
	
	      var $li = $(el),
	          $a = $li.children('a'),
	          $submenuToggle = $('<span class="soulmenu-submenu-toggle"> ▼ </span>');
		      $submenuToggle.appendTo( $a );	
		      
		  $a.click(function(e){
			  if($('html').hasClass('touchevents')){
				  e.preventDefault();
				  
				  if($(this).parents('li').find('.sub-menu').hasClass('opened')){
					
					 $(this).parents('li').find('.sub-menu').removeClass('opened');	
					 
				  }else{
					  
					 $(this).parents('li').find('.sub-menu').addClass('opened');	

				  }
			  }
		  });    
	    });		
	});

	$('.soulmenu-style-vertical').each(function(){
		
		$this = $(this);
		
		//make containers overflow visible
/*
		if($this.find('.menu-item-has-children').length > 0){
			$this.parents('.ss-subsection, .ss-container').css('overflow','visible');
		}
*/
		
	    // Add Submenu Toggle
	    $this.find('li.menu-item-has-children').each(function(i, el) {
	
	      var $li = $(el),
	          $a = $li.children('a'),
	          $submenuToggle = $('<span class="soulmenu-submenu-toggle"> ▼ </span>');
		      $submenuToggle.appendTo( $a );	
		      
		  $a.click(function(e){
				  e.preventDefault();
				  
				  if($(this).parents('li').find('.sub-menu').hasClass('opened')){
					
					 $(this).parents('li').find('.sub-menu').removeClass('opened');	
					 
				  }else{
					  
					 $(this).parents('li').find('.sub-menu').addClass('opened');	

				  }
		  });    
	    });		
	});


	$window = $(window);
	
	delete FLBuilderLayout['_scrollToElementOnLinkClick'];
	
	$('.soulmenu a[href*="#"]').click(function(e){

		if($(this).attr("href") == "#"){
			return false;
		}else{
			
		e.preventDefault();
		$('#soulbuttons-backdrop').click();     
		var $this = $(this),
        href = $this.attr("href"),
        topY = $(href).offset().top;
        console.log(window.onCanvasHeight);
        console.log(window.localNavHeight);
		TweenMax.to($window, 1, {
		        scrollTo:{
		            //y: topY-$thisRowHeight-70, 
		            y: topY+window.onCanvasHeight+window.localNavHeight, 
		            autoKill: false
		        }, 
		        ease:Power3.easeOut 
		     });
		return false;  
		
		}   
	});


    
  });


  // When SoulMenu Mobile Toggle is Clicked
/*
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
*/

  // When Submenu Toggle is Clicked
/*
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
*/
  


