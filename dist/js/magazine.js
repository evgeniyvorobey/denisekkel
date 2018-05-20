let cart = {};   //Корзина

$('document').ready(function(){
    loadGoods();
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
    localStorage.setItem('cart', cart); 
    console.log(cart);
}
