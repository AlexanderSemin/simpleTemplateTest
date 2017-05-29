$(document).ready(function () {

    //reviews
    $('#reviews-carousel').owlCarousel({
        autoplay: true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: [],
        loop:true,
        margin:10,
        nav:true,
        dots: true,
        responsive:{
            0:{
                items:1
            },
            800:{
                items:2
            },
            2400:{
                items:3
            }
        }
    });

    //partners-carousel
    $('#partners-carousel').owlCarousel({
        autoplay: true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        loop:true,
        margin:10,
        nav:false,
        dots: false,
        responsive:{
            0:{
                items:1
            },
            360:{
                items:2
            },
            480:{
                items:3
            },
            600:{
                items:4
            },
            800:{
                items:5
            },
            1600:{
                items:6
            }
        }
    });

    //мобильное меню
    $(function($) {
        $('.mob-ico').on('click', function() {
            if($(this).hasClass('open'))
            {
                $(this).removeClass('open');
                $('.top-nav nav').slideToggle();
            }
            else
            {
                $(this).addClass('open');
                $('.top-nav nav').slideToggle();
                return false;
            }
        });
    });

    //анимация блоков с помощью animate.css
    $(".zoom").animated("zoomIn", "zoomOut");
    $(".zoom-up").animated("zoomInUp", "zoomInDown");
    $(".left").animated("bounceInLeft", "bounceInRight");
    $(".right").animated("bounceInRight", "bounceInLeft");

    // стилизация форм с помощью плагина формстайлер
    $("input, select").styler();

    //табы
    $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });

    //подключаем фансибокс
    try{
        $(".fancybox").fancybox({
            helpers : {
                overlay: {
                    locked: false
                } // overlay
            }, // helpers
            maxWidth	: 1000,
            maxHeight	: '100%',
            fitToView	: false,
            width		    : '70%',
            height	    : '65%',
            autoSize	    : false,
            closeClick	: false,
            openEffect	: 'none',
            closeEffect	: 'none',
            padding: 0
        });
    }
    catch(e){}

    // прогресс бар горизонтальный
    $('.skillbar').skillBars();

    //star riting
    $('.star-box').rating();


    // функция для отображения svg
    jQuery('svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, else we gonna set it if we can.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });

});
