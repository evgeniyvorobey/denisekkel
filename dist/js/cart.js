let cart = {}; //Корзина

$.getJSON('goods.json', function(data){
    let goods = data; // Все товары в масиве
    // console.log(goods)
    checkCart();
    // console.log(cart)
    showCart(); //Вывод товара на страницу
    function showCart(){
        if ($.isEmptyObject(cart)) {
            //если корзина пуста
            let out = `Корзина пуста. Добавьте товар в корзину <a href="magazine.html">
            Магазин</a>`;
            // let amountItem = document.getElementsByClassName('itemCost').length;
            // costAllItem = 0;
            $('#my-cart').html(out);
        } else {
            let out = '';
            for (let key in cart){
                out += `<div class="goodsItem">`
                out += `<button class="delete" data-art="${key}">x</button>`;
                out += `<img id="cartImg" src="${goods[key].image}" alt=" ">`;
                out += goods[key].name
                out += `<button class="minus" data-art="${key}">-</button>`;
                out += cart[key];
                out += `<button class="plus" data-art="${key}">+</button>`;
                out += `<span class="itemCost">${cart[key] * goods[key].cost} UAH</span>`;
                out += `</div>`

            }

            $('#my-cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);
        
        }
    }

    function allItemCost(){
        // Считаем общую сумму по заказам
        let amountItem = document.getElementsByClassName('itemCost').length;
        costAllItem = 0;
        for (let i = 0; i < amountItem; i++){
            costAllItem += parseInt(document.getElementsByClassName('itemCost')[i].innerHTML);
        }
        if ( costAllItem !== 0 ) {
            $('#allCost').html(`<span>${costAllItem} UAH</span>`);
        } else {
            $('#allCost').html('');
        }
    }
        allItemCost();


    function deleteGoods(){
        let articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS();
        showCart();
        allItemCost();
    }
    
    function plusGoods(){
        let articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLS();
        showCart();
        allItemCost();
    }
    

    function minusGoods(){
        let articul = $(this).attr('data-art');
        if (cart[articul] > 1) {
            cart[articul]--;
        } else {
            delete cart[articul];
        }
        saveCartToLS();
        showCart();
        allItemCost();
    }
});

function checkCart(){
    // Проверяю наличие товара в localStorage
    if ( localStorage.getItem('cart') != null ) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }   
}
function saveCartToLS() {
    // Сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}



//------------------------------------------------------------
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
//------------------------------------------------------------









