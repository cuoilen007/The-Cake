$(document).ready(function() {

    $(".prod-item-img").mouseover(function() {
        $("img", this).css("opacity", "0.5");
        $(".prod-item-desc", this).css("display", "block");

    });

    $(".prod-item-img").mouseout(function() {
        $("img", this).css("opacity", "1");
        $(".prod-item-desc", this).css("display", "none");
    });

    $('.prod-type-item').bind("click", function() {
        window.open($(this).data('url'), '_blank ');
    });

});

var position = $(window).scrollTop();

$(window).scroll(function() {
    let scroll = $(window).scrollTop();
    let max = $("#prod_banner").height();
    let menu = $('#prod_menu');

    if (scroll > position || scroll < max) {
        menu.css("top", "-100px");
        menu.css("background-color", "");

        if (scroll === 0) {
            menu.css("top", "0px");
            menu.css("background-color", "");
        }
    } else {
        menu.css("top", "0px");
        if (scroll > max)
            menu.css("background-color", "#13255E");
    }
    position = scroll;
});

$('#carousel-example').on('slide.bs.carousel', function(e) {
    /*
        slider
    */
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 5;
    var totalItems = $('.carousel-item').length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            // append slides to end
            if (e.direction == "left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            } else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});
