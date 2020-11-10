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

$('#carousel-example').on('slide.bs.carousel', function (e) {
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

//footer
function footerSubmit() {
  alert("Thanks for your comment.");
}

function getCartItems() {
  // Check browser support
  if (typeof (Storage) !== "undefined") {
    if (localStorage.getItem("cartItemsArray")) {
      return JSON.parse(localStorage.getItem("cartItemsArray"));
    } else {
      return [];
    }
  } else {
    return [];
  }
}

function saveCartItems(items) {
  // Check browser support
  if (typeof (Storage) !== "undefined") {
    localStorage.setItem("cartItemsArray", JSON.stringify(items));
  } else {
    return false;
  }
}

//save data on cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {

  var user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 30);
    }
  }
}

/*shopping cart*/
// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];
btn.onclick = function () {
  modal.style.display = "block";
}
close.onclick = function () {
  modal.style.display = "none";
}
close_footer.onclick = function () {
  modal.style.display = "none";
}
order.onclick = function () {
  alert("Thank you! You have paid for the order")
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// delete cart
var remove_cart = document.getElementsByClassName("btn-danger");
for (var i = 0; i < remove_cart.length; i++) {
  var button = remove_cart[i]
  button.addEventListener("click", function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
    updatecart()
  })

}

// update cart 
function updatecart() {
  var cart_item = document.getElementsByClassName("cart-items")[0];
  var cart_rows = cart_item.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cart_rows.length; i++) {
    var cart_row = cart_rows[i]
    var price_item = cart_row.getElementsByClassName("cart-price ")[0]
    var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
    var price = parseFloat(price_item.innerText)// string to number 
    var quantity = quantity_item.value // get value input
    total = total + (price * quantity)
  }
  document.getElementsByClassName("cart-total-price")[0].innerText = total + '$'

}

// change the quantity 
var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
  var input = quantity_input[i];
  input.addEventListener("change", function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}

// add to cart
var add_cart = document.getElementsByClassName("btn-cart");
for (var i = 0; i < add_cart.length; i++) {
  var add = add_cart[i];
  add.addEventListener("click", function (event) {

    var button = event.target;
    var product = button.parentElement.parentElement;
    var img = product.parentElement.getElementsByClassName("img-prd")[0].src
    var title = product.getElementsByClassName("prod-item-name")[0].innerText
    var price = product.getElementsByClassName("prod-item-price")[0].innerText

    var arr = getCartItems();
    arr.push({ img: img, title: title, price: price });
    saveCartItems(arr);

    addItemToCart(title, price, img)
    modal.style.display = "block";

    updatecart()
  })
}

function addItemToCart(title, price, img) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cart_title = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText == title) {
      alert('Product is already in the cart')
      return
    }
  }

  var cartItemsArray = getCartItems();
  if (cartItemsArray.length > 0) {
    console.log(cartItemsArray);
    for (var i = 0; i < cartItemsArray.length; i++) {
      var item = cartItemsArray[i];
      var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${item.img}" width="100" height="100">
            <span class="cart-item-title">${item.title}</span>
        </div>
        <span class="cart-price cart-column">${item.price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">Delete</button>
        </div>`;
      cartRow.innerHTML = cartRowContents;
      cartItems.append(cartRow);
      cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
        var button_remove = event.target;
        button_remove.parentElement.parentElement.remove();
        updatecart();
      });
      cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
          input.value = 1;
        }
        updatecart();
      });
    }
  }

  var cartRowContents = `
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${img}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Delete</button>
  </div>`;
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
    updatecart()
  })
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}
