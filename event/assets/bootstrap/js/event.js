$(document).ready(function () {

    $(".prod-item-img").mouseover(function () {
      $("img", this).css("opacity", "0.5");
      $(".prod-item-desc", this).css("display", "block");
  
    });
  
    $(".prod-item-img").mouseout(function () {
      $("img", this).css("opacity", "1");
      $(".prod-item-desc", this).css("display", "none");
    });
  
    $('.prod-type-item').bind("click", function () {
      window.open($(this).data('url'), '_blank ');
    });
  
  });
  
  var position = $(window).scrollTop();
  
  $(window).scroll(function () {
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

  //footer
function footerSubmit() {
    alert("Thanks for your comment.");
  }