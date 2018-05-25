let cart = {}; //Корзина

$.getJSON('goods.json', function(data){
    let goods = data; // Все товары в масиве
    checkCart();
    showCart(); //Вывод товара на страницу
    function showCart(){
        if ($.isEmptyObject(cart)) {
            //если корзина пуста
            let out = `<p class="emptyCart">Корзина пуста. Добавьте товар в корзину <a href="magazine.html">
            Магазин</a></p>`;
            $('#my-cart').html(out);
            // удаляем кнопку оформить
            $('.buttonContainer').css('display', 'none');
        } else {
            let out = '';
            for (let key in cart){
                out += `<div class="goodsItem">` 
                out += `<button class="delete" data-art="${key}">x</button>`;
                out += `<div class="goodsItemContainer">` 
                out += `<div class="cartImgContainer">`
                out += `<img id="cartImg" src="${goods[key].image}" alt=" ">`;
                out += `</div>`
                out += `<div class="itemInfo">`
                out += `<span id="itemName">${goods[key].name}</span>`
                out += `<div class="naviButton">`
                out += `<button class="minus" data-art="${key}">-</button>`;
                out += `<span id="itemSum">${cart[key]}</span>`;
                out += `<button class="plus" data-art="${key}">+</button>`;
                out += `</div>`
                out += `<span  class="itemSumCost">${cart[key] * goods[key].cost} UAH</span>`;
                out += `</div>`
                out += `</div>` 
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
        let amountItem = document.getElementsByClassName('itemSumCost').length;
        costAllItem = 0;
        for (let i = 0; i < amountItem; i++){
            costAllItem += parseInt(document.getElementsByClassName('itemSumCost')[i].innerHTML);
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

function order() {
        //Получаем данные для отправки
        let allItem = '';
    let item = document.getElementsByClassName('itemInfo'); // Блок с товарами
    for (let i = 0; i < item.length; i++) {
        allItem += `${item[i].children[0].innerHTML}, ${item[i].children[1].children[1].innerHTML} шт = ${parseInt(item[i].children[2].innerHTML)} ----`;
    }
    let orderList = `<input type="text" class="hide" name="order" value="${allItem}">`;

        $('#formMain').prepend(orderList);
    
}



// Открыти по клику на кнопку
$('.js-buttonContainer').click(function() {
    $('main,footer, header').css('filter','blur(5px)');
    $('.js-overlay-compaign').fadeIn();
});

//  Закрыти по клику на крестик
$('.js-close-campaign').click(function() {
    $('.js-overlay-compaign').fadeOut();
    $('main,footer, header').css('filter','none');
});

//  Закрытие по клику в любом месте
$(document).mouseup(function(e) {
    let popup = $('.js-popup-compaign');
    if (e.target != popup[0] && popup.has(e.target).length === 0) {
        $('.js-overlay-compaign').fadeOut();
        $('main,footer, header').css('filter','none');
    }
});


//-----------------AJAX 
function AjaxFormRequest(formMain) {
    name = document.getElementById('name').value;
    phone = document.getElementById('phone').value;
    if ( name.length >= 2 && phone.length >= 9) {
        jQuery.ajax({
            url:     "order.php",
            type:     "POST",
            dataType: "html",
            data: jQuery("#"+formMain).serialize(),
    });
    document.getElementById('formMain').innerHTML = `<p class="thanks">Спасибо за заказ, мы свяжемся с вами.</p>`;
    } else {
        document.getElementById('name').placeholder = 'Заполните поле';
        document.getElementById('phone').placeholder  = 'Заполните поле';
    }
}








