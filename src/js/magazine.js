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
            out+= '<div class="single-goods">';
            out+= '<h3>' +data[key]['name']+'</h3>';
            out+= '<p>Цена: ' +data[key]['cost']+'</p>';
            out+= '<img src="'+data[key].image+'">';
            out+= '<h4> Описание: </h4>'
            out+= '<p>' +data[key]['description']+'</p>'
            out+= '<button data-art="'+key+'" class="byButton">Купить</button>'
            out+= '</div>'
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
    let out = '';
    for (let w in cart){
        out += w + '---'+cart[w]+'<br>'
    }
    out += `<br><a href="cart.html">Корзина</a>`
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