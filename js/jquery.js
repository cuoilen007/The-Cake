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
//footer
function footerSubmit() {
    alert("Thanks for your comment.");
  }

 //cart 
 const CART_STORAGE_KEY = "CART_STORAGE";
 const PROMOTION_STORAGE_KEY = "PROMOTION_STORAGE";
 const PROMOTION_CODE = "SALE";

$('#cart').on('click', function() {
    showCart();
});
$(".close").on('click', function() {
    hideCart();
});
$(".close-footer").on('click', function() {
    hideCart();
});
$(".order").on('click', function() {
    alert("Thank you! You have paid for the order");
    hideCart();
    clearStoredCart();
});
$('.btn-comment').on('click', function() {
    alert("Thanks for your feedbacks.");
});

function hideCart() {
$("#myModal").fadeOut(200);
let container = $('.cart-items').first();
container.html('');
}

function showCart() {
// Check browser support
if (typeof(Storage) !== "undefined") {
    let container = $('.cart-items').first();
    let cartItems = getStoredCart();
    if (cartItems.length > 0) {
        for (let i = 0; i < cartItems.length; i++) {
            let item = cartItems[i];
            let row = renderCartHtml(item.title, item.price, item.image, item.quantity);
            container.append(row);
        }
    }
    let promotionRatio = parseInt(localStorage.getItem(PROMOTION_STORAGE_KEY));
    if (!isNaN(promotionRatio) && promotionRatio > 0) {
        $('#txtPromotionCode').val(PROMOTION_CODE + promotionRatio);
    }
} else {
    console.log('Your browser doesnot support localStorage!');
}
calculateCartPrice();
$("#myModal").fadeIn(300);
}

function addToCart(e) {
let parent = $(e).parent().parent();
let image = parent.find('.prod-item-img img').first().attr('src');
let title = parent.find('.prod-item-name').first().text();
let price = parent.find('.prod-item-price').first().text();

let cartItems = getStoredCart();
let found = false;

for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].title == title) {
        cartItems[i].quantity++;
        found = true;
        break;
    }
}

if (!found) {
    cartItems.push({ title: title, price: price, image: image, quantity: 1 });
}
saveStoredCart(cartItems);
showCart();
}

function deleteCart(e) {
let title = $(e).parent().parent().find('.cart-item-title').first().text();
let cartItems = getStoredCart();
for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].title == title) {
        cartItems.splice(i, 1);
        saveStoredCart(cartItems);
        break;
    }
}
$(e).parent().parent().remove();
calculateCartPrice();
}

function onQuantityChange(e) {
if (isNaN(e.value) || e.value <= 0) {
    e.value = 1;
}

let title = $(e).parent().parent().find('.cart-item-title').first().text();
let items = getStoredCart();

for (let i = 0; i < items.length; ++i) {
    if (items[i].title == title) {
        items[i].quantity = e.value;
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        break;
    }
}
calculateCartPrice();
return true;
}

function getStoredCart() {
// Check browser support
if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem(CART_STORAGE_KEY)) {
        return JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    } else {
        return [];
    }
} else {
    return [];
}
}

function saveStoredCart(cartItems) {
// Check browser support
if (typeof(Storage) !== "undefined") {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    return true;
} else {
    return false;
}
}

function clearStoredCart() {
localStorage.clear();
$('#txtPromotionCode').val('');
}

function calculateCartPrice() {
let total = 0;
let promotionRatio = localStorage.getItem(PROMOTION_STORAGE_KEY);
let promotionText = '';

$('.cart-items').first().find('.cart-header').each(function(index) {
    let price = parseFloat($(this).find('.cart-item-price').first().text());
    let quantity = parseInt($(this).find('.cart-quantity-input').first().val());
    total += price * quantity;
});

if (promotionRatio > 0) {
    total = total * (100 - promotionRatio) / 100;
    promotionText = '(' + promotionRatio + '% off)';
}

$(".cart-total-price").first().text(total.toFixed(2).toString() + '$ ' + promotionText);
}

function renderCart(title) {
let container = $('.cart-items').first();
let cartItems = getStoredCart();

if (cartItems.length > 0) {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].title == title) {
            cartItems[i].quantity++;
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
            break;
        }
    }

    container.html('');

    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        let row = renderCartHtml(item.title, item.price, item.image, item.quantity);
        container.append(row);
    }
}

calculateCartPrice();
}

function renderCartHtml(title, price, image, quantity) {
let html = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${image}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-item-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="${quantity}" onchange="onQuantityChange(this);">
        <button class="btn btn-danger" onclick="deleteCart(this);" type="button">Delete</button>
    </div>`;

let cartRow = $(document.createElement('div'));
cartRow.addClass('cart-header');
cartRow.html(html);

return cartRow;
}

function savePromotionCode() {
let promotionCode = $('#txtPromotionCode').val();
let ratio = 0;
if (promotionCode.startsWith(PROMOTION_CODE)) {
    promotionCode = promotionCode.replace(PROMOTION_CODE, '');
    ratio = parseInt(promotionCode);
    if (isNaN(ratio) || ratio >= 100) {
        ratio = 0;
        alert('Promotion code is invalid!');
        $('#txtPromotionCode').focus();
        return false;
    }
    localStorage.setItem(PROMOTION_STORAGE_KEY, ratio.toString());
    calculateCartPrice();
    return true;
} else {
    alert('Promotion code is invalid!');
    $('#txtPromotionCode').focus();
    return false;
}
}
