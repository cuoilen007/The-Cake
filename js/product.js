$(document).ready(function() {
    $(".prod-item-img").mouseover(function() {
        $("img", this).css("opacity", "0.5");
        $(".prod-item-desc", this).css("display", "block");
    });

    $(".prod-item-img").mouseout(function() {
        $("img", this).css("opacity", "1");
        $(".prod-item-desc", this).css("display", "none");
    });

    $('.prod-type-item').on("click", function() {
        window.open($(this).data('url'), '_blank ');
    });

    $('#carousel-example').on('slide.bs.carousel', function(e) {
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

    $('#cart').on('click', function() {
        $("#myModal").css('display', 'block');
    });
    $(".close").on('click', function() {
        $("#myModal").css('display', 'none');
    });
    $(".close-footer").on('click', function() {
        $("#myModal").css('display', 'none');
    });
    $(".order").on('click', function() {
        alert("Thank you! You have paid for the order")
    });
    $('.btn-comment').on('click', function() {
        alert("Thanks for your comment.");
    });
});

function addToCart(e) {
    let parent = $(e).parent().parent();
    let image = parent.find('.prod-item-img img').first().attr('src');
    let title = parent.find('.prod-item-name').first().text();
    let price = parent.find('.prod-item-price').first().text();

    addCartItems({ title: title, price: price, image: image, quantity: 0 });
    renderCartItem(title);
    $("#myModal").css('display', 'block');

    updateCartPrice();
}

function updateCartQuantity(e) {
    if (isNaN(e.value) || e.value <= 0) {
        e.value = 1;
    }

    let title = $(e).parent().parent().find('.cart-item-title').first().text();
    let items = getCartItems();

    for (let i = 0; i < items.length; ++i) {
        if (items[i].title == title) {
            items[i].quantity = e.value;
            localStorage.setItem("cartItemsArray", JSON.stringify(items));
            break;
        }
    }
    updateCartPrice();
    return true;
}

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

function getCartItems() {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("cartItemsArray")) {
            return JSON.parse(localStorage.getItem("cartItemsArray"));
        } else {
            return [];
        }
    } else {
        return [];
    }
}

function addCartItems(item) {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        let array = getCartItems();
        let found = false;

        for (let i = 0; i < array.length; i++) {
            if (array[i].title == item.title) {
                found = true;
                break;
            }
        }

        if (!found) {
            array.push(item);
            localStorage.setItem("cartItemsArray", JSON.stringify(array));
        }
    } else {
        return false;
    }
}

function deleteCartItem(item) {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        let array = getCartItems();
        let title = $(item).parent().parent().find('.cart-item-title').first().text();

        for (let i = 0; i < array.length; i++) {
            if (array[i].title == title) {
                array.splice(i, 1);
                localStorage.setItem("cartItemsArray", JSON.stringify(array));
                break;
            }
        }

        $(item).parent().parent().remove();
        updateCartPrice();

    } else {
        return false;
    }
}

function updateCartPrice() {
    let total = 0;
    $('.cart-items').first().find('.cart-header').each(function(index) {
        let price = parseFloat($(this).find('.cart-item-price').first().text());
        let quantity = parseInt($(this).find('.cart-quantity-input').first().val());
        total += price * quantity;
    });

    $(".cart-total-price").first().text(total.toString() + '$');
}

function renderCartItem(title) {
    let cartItems = $('.cart-items').first();
    let cartItemsArray = getCartItems();

    if (cartItemsArray.length > 0) {
        for (let i = 0; i < cartItemsArray.length; i++) {
            if (cartItemsArray[i].title == title) {
                cartItemsArray[i].quantity++;
                localStorage.setItem("cartItemsArray", JSON.stringify(cartItemsArray));
                break;
            }
        }

        cartItems.html('');

        for (let i = 0; i < cartItemsArray.length; i++) {
            let item = cartItemsArray[i];
            let row = drawHtml(item.title, item.price, item.image, item.quantity);
            cartItems.append(row);
        }
    }

    updateCartPrice();
    console.log(getCartItems());
}

function drawHtml(title, price, image, quantity) {
    let html = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${image}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-item-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${quantity}" onchange="updateCartQuantity(this);">
            <button class="btn btn-danger" onclick="deleteCartItem(this)" type="button">Delete</button>
        </div>`;

    let cartRow = $(document.createElement('div'));
    cartRow.addClass('cart-header');
    cartRow.html(html);

    return cartRow;
}