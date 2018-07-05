$(function() {

    var isMobile;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     isMobile = true;
  
     // Mobile height fix
     $('.height-fix').each(function(){
      var h = $(this).height();
      $(this).height(h)
     })
    }
  
    // RESIZE RESETS
    $(window).resize(function(){
      posFilterBar($('.filter').first());
    });
  
    // Sticky Nav on Mobile
    if (isMobile) {
      $('nav').addClass('fixed');
    } else {
      $('nav').addClass('desk');
    }
  
  
    // NAV POSITION
    var navPos = $('nav').position().top;
    var lastPos = 0;
    var lockTimer
  
    $(window).on('scroll', function () {
  
      var pos = $(window).scrollTop();
      var pos2 = pos + 50;
      var scrollBottom = pos + $(window).height();
  
      if (!isMobile) {
        if (pos >= navPos + $('nav').height() && lastPos < pos) {
          $('nav').addClass('fixed');
        }
        if (pos < navPos && lastPos > pos) {
          $('nav').removeClass('fixed');
        }
        lastPos = pos;
      }
  
      // Link Highlighting
      if (pos2 > $('#home').offset().top)       { highlightLink('home'); }
      if (pos2 > $('#about').offset().top)      { highlightLink('about'); }
      if (pos2 > $('#portfolio').offset().top)  { highlightLink('portfolio'); }
      if (pos2 > $('#blog').offset().top)       { highlightLink('blog'); }
      if (pos2 > $('#contact').offset().top ||
          pos + $(window).height() === $(document).height()) {
            highlightLink('contact');
      }
  
      // Prevent Hover on Scroll
      clearTimeout(lockTimer);
      if(!$('body').hasClass('disable-hover')) {
        $('body').addClass('disable-hover')
      }
  
      lockTimer = setTimeout(function(){
        $('body').removeClass('disable-hover')
      }, 500);
    });
  
    function highlightLink(anchor) {
      $('nav .active').removeClass('active');
      $("nav").find('[dest="' + anchor + '"]').addClass('active');
    }
  
  
    // EVENT HANDLERS
    $('.page-link').click(function() {
      var anchor = $(this).attr("dest");
      $('.link-wrap').removeClass('visible1');
  
      $('nav span').removeClass('active');
      $("nav").find('[dest="'+ anchor +'"]').addClass('active');
  
      $('html, body').animate({
        scrollTop: $('#' + anchor).offset().top
      }, 400);
    });
  
    $('.mdi-menu').click(function() {
      $('.link-wrap').toggleClass('visible1');
    });
  
    $('.blog-wrap').hover(  function() {
      $('.blog-wrap').not(this).addClass('fade');
      $( this ).addClass( "hover" );
    }, function() {
      $( this ).removeClass( "hover" );
      $('.blog-wrap').removeClass('fade');
    });
  
    posFilterBar($('.filter').first());
  
    $('.filter').click(function(){
      posFilterBar(this);
    });
  
    function posFilterBar(elem) {
      var origin = $(elem).parent().offset().left;
      var pos = $(elem).offset().left;
      $('.float-bar').css({
        left: pos - origin,
        width: $(elem).innerWidth()
      });
      $('.float-bar .row').css('left', (pos - origin) * -1);
    }
  
    // GALLERY
    $('#gallery').mixItUp({ });
  
    function mixClear() {
      setTimeout(function() { $('#gallery').removeClass('waypoint') }, 2000);
    }
  
    // SCROLL ANIMATIONS
    function onScrollInit( items, elemTrigger ) {
      var offset = $(window).height() / 1.6
      items.each( function() {
        var elem = $(this),
            animationClass = elem.attr('data-animation'),
            animationDelay = elem.attr('data-delay');
  
            elem.css({
              '-webkit-animation-delay':  animationDelay,
              '-moz-animation-delay':     animationDelay,
              'animation-delay':          animationDelay
            });
  
            var trigger = (elemTrigger) ? trigger : elem;
  
            trigger.waypoint(function() {
              elem.addClass('animated').addClass(animationClass);
              if (elem.get(0).id === 'gallery') mixClear(); //OPTIONAL
              },{
                  triggerOnce: true,
                  offset: offset
            });
      });
    }
  
    setTimeout(function() { onScrollInit($('.waypoint')) }, 10);
  
    // CONTACT FORM
    $('#contact-form').submit(function(e) {
      e.preventDefault();
  
        $.ajax({
            url: "https://formspree.io/mattwilliams85@gmail.com",
            method: "POST",
            data: { message: $('form').serialize() },
            dataType: "json"
        }).done(function(response) {
            $('#success').addClass('expand');
            $('#contact-form').find("input[type=text], input[type=email], textarea").val("");
        });
    });
  
    $('#close').click(function() {
      $('#success').removeClass('expand');
    })
  
  });
  
  // Credit where credit is due:
// Daniel Paradise did the initial design
// The icons are from FontAwesome
// The code, including the jQuery plugin, is mine.

// You can find the plugin on github:
// https://github.com/mlms13/panel-slider


(function ($) {
    "use strict";

    $.fn.panelSlider = function (options) {
        var settings = $.extend({
            initialPanel: -1, // 0-based index of the initial panel to be shown, -1 = random
            slideDuration: 600, // duration (in ms) of the sliding animation
            autoPlay: true, // whether slides should rotate automatically
            delay: 10000 // the time (in ms) between slide rotations when autoPlay is true
        }, options);

        return this.each(function () {
            var $container = $(this),
                $slides = $container.children('li'),
                tabWidth = $slides.find('.tab').width(), // assume all tabs are the same width
                timer, // to keep track of automatic slide rotation
                moveToRight,
                moveToLeft,
                revealSlide,
                runSlideshow;

            // a function to transition slides to the correct right position
            moveToRight = function ($slide, method) {
                var index = $slides.index($slide), // the slide's index within the context of all slides
                    negIndex = ($slides.length - index) - 1, // the slide's index, counting from the right
                    leftPosition; // the target destance from the left edge of the slideshow container

                // return if the slide is already collapsed to the right
                if ($slide.data('collapsed-right')) {
                    return;
                }

                // calculate the target distance from the left edge of the slideshow
                // leftPosition = the width of the container, minus
                //    (width of this slide's tab + the tabs of all slides to the right)
                leftPosition = $container.width() - (tabWidth + (tabWidth * negIndex));

                // move the slide to its target position on the right
                $slide[method]({'left': leftPosition + 'px'}, settings.slideDuration);

                // keep track of the slide being collapsed
                $slide.data('collapsed-left', false);
                $slide.data('collapsed-right', true);
            };

            // a function to transition slides to the correct left position
            moveToLeft = function ($slide, method) {
                var index = $slides.index($slide); // the slide's index within the context of all slides

                // return if the slide is already collapsed to the left
                if ($slide.data('collapsed-left')) {
                    return;
                }

                // move the slide to its target position on the left
                $slide[method]({'left': (tabWidth * index) + 'px'});

                // keep track of the slide being collapsed
                $slide.data('collapsed-left', true);
                $slide.data('collapsed-right', false);
            };

            // function determines which direction to move sibling slides to collapse them
            revealSlide = function (index, animate) {
                // pick the right method, based on the animate parameter
                // if no parameter was passed, use the 'animate' function by default
                var method = (animate || animate === undefined) ? 'animate' : 'css';

                // start knocking out the currently-visible slide
                $container.children('.active').removeClass('active')
                    .children('.content')[method]({
                        'opacity': 0,
                        'top': '122px'
                    });

                // each slide after the one we're revealing should collapse right
                $slides.slice(index + 1).each(function () {
                    moveToRight($(this), method);
                });

                // each slide before and including the revealed slide should move left
                $slides.slice(0, index + 1).each(function () {
                    moveToLeft($(this), method);
                });

                // keep track of the active slide
                $slides.removeClass('active')
                    .eq(index).data({
                        'collapsed-left': false,
                        'collapsed-right': false
                    })
                    .addClass('active')
                    .children('.content')
                    .css({
                        'top': -122
                    })
                    .delay(200)
                    .animate({
                        'opacity': 1,
                        'top': 0
                    });
            };

            runSlideshow = function () {
                if (settings.autoPlay) {
                    timer = window.setInterval(function () {
                        var currentIndex = $slides.index($container.children('.active')),
                            nextIndex = (currentIndex + 1 === $slides.length) ? 0 : currentIndex + 1;

                        revealSlide(nextIndex);
                    }, settings.delay);
                }
            };

            // intialize some general slideshow styles
            $container.css({'position': 'relative', 'overflow': 'hidden'});
            $slides.css({'position': 'absolute'});

            // calculate the width of the slide
            $slides.css({
                'width': ($container.width() - (($slides.length - 1) * tabWidth)) + 'px'
            });

            // pick a random starting slide, if needed
            if (settings.initialPanel === -1) {
                settings.initialPanel = Math.floor(Math.random() * $slides.length);
            }

            // initialize the slides by revealing one without animation
            revealSlide(settings.initialPanel, false);

            // run the slideshow (it will check to make sure autoPlay is on)
            runSlideshow();

            // handle click events
            $slides.on('click', function () {
                // ignore clicks if the slide is already active
                if ($(this).hasClass('active')) {
                    return;
                }

                revealSlide($(this).index());

                // clear the current loop and restart the slideshow
                window.clearInterval(timer);
                runSlideshow();
            });
        });
    };
}(jQuery));

$('.slider').panelSlider({
    delay: 4000
});