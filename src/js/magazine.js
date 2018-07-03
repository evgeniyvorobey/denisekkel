let cart = {};   //Корзина

$('document').ready(function(){
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods() {
    //Загрузка товара на страницу
    $.getJSON('goods.json', function (data) {
        let out = "";
        for (let key in data){
            out += `<div class="single-goods">`
            out += `<div class="goodsMain">`;
            out += `<h3>${data[key].name}</h3>`;
            out += `<p>Цена: ${data[key].cost}</p>`;
            out += `<img src="${data[key].image}">`;
            out += `<h4> Описание: </h4>`
            out += `<p>${data[key].description}</p>`
            out += `<button data-art="${key}" class="byButton">Купить</button>`
            out += `</div>`
            out += `<div id="goodsInfo">`
            out += `<p>${data[key].largeDescription}</p>`
            out += `</div>`
            out += `</div>`
            console.log(data[key].cost,' UAH')

        }
        $('#goods').html(out);
        $('button.byButton').on('click', addToCart);
    });
}

function addToCart() {
    //Добавить товар в корзину
    let articul = $(this).attr('data-art');
    if (cart[articul] != undefined) {
        cart[articul]++;
    } else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart)); 
    showMiniCart();
}


function checkCart(){
    // Проверяю наличие товара в localStorage
    if ( localStorage.getItem('cart') != null ) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }   
}

function showMiniCart(){
    //Показываю содкржимое корзины
    cartItem = 0;
    let out = '';
    for (let i in cart){
        cartItem += cart[i];
    }
    if (cartItem !== 0) {
        out += `<a class="cart" href="cart.html">В корзине <span class="cartItem">${cartItem}</span> товар(ов) </a>`;
    } else {
        out += `<a class="cart" href="cart.html">Корзина пуста</a>`;
    }
    $('#mini-cart').html(out);
}


$(document).ready(function(){
    $("#menu, #toTop").on("click","a", function (event) {
        // event.preventDefault();
        var id  = $(this).attr('href'),
        top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 200);
    });
    (function($) {
        $(function(){
            $('.icon, #close').on('click', function(){
                $(this).closest('.menu').toggleClass('menu-open');
            });
            $(window).on('load scroll',function(){ 
                if ($(this).scrollTop() >= '200') {
                    $('#square').addClass("toTopShow");
                }
                else  {$('#square').removeClass("toTopShow");}
            });
        });
    })(jQuery);
});





// отслеживание по какому элементу произошел клик
let goodsClick = document.getElementById('goods');


goodsClick.onclick = function(event) {
    let target = event.target;

        let img = target.closest('img');
        let div = target.closest('#goodsInfo');
        if (img) {
            let goodsInfo = img.parentElement.nextElementSibling;
            goodsInfo.classList.add('show');
        } else if (div) {
            div.classList.remove('show');
        } else {
            return;
        }
}

