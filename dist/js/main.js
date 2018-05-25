autoSlider();


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

            $('.comandFirst').on('click',function(){
                $('#comandFirstAbout').toggleClass('comandAboutVisible');
            });

            $('.comandSecond').on('click',function(){
                $('#comandSecondAbout').toggleClass('comandAboutVisible');
            });
            
            $('.comandThird').on('click',function(){
                $('#comandThirdAbout').toggleClass('comandAboutVisible');
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


//----------------Команда-------------//
$(window).scroll(function() {
    if ($(this).width() <= 767 ) {
        if ($(this).scrollTop() > 1000 ) {
            $('#comandTitle').addClass("titleMove")
        } else {
            $('#comandTitle').removeClass("titleMove");
        }
    } else if ($(this).width() >= 768) {
        if ($(this).scrollTop() > 1200 ) {
            $('#comandTitle').addClass("titleMove")
        } else {
            $('#comandTitle').removeClass("titleMove");
        }
    }
});


//------------Фото галерея-------------//
$(window).scroll(function() {
    if ($(this).width() <= 767 ) {
        if ($(this).scrollTop() > 2500 ) {
            $('#galaryTitle').addClass("titleMove")
        } else {
            $('#galaryTitle').removeClass("titleMove");
        }
    } else if ($(this).width() >= 768) {
        if ($(this).scrollTop() > 1700 ) {
            $('#galaryTitle').addClass("titleMove")
        } else {
            $('#galaryTitle').removeClass("titleMove");
        }
    }
});


//--------------Прайс-----------//
$(window).scroll(function() {
    if ($(this).width() <= 767 ) {
        if ($(this).scrollTop() > 3200 ) {
            $('#priceTitle').addClass("titleMove")
        } else {
            $('#priceTitle').removeClass("titleMove");
        }
    } else if ($(this).width() >= 768) {
        if ($(this).scrollTop() > 2500 ) {
            $('#priceTitle').addClass("titleMove")
        } else {
            $('#priceTitle').removeClass("titleMove")
        }
    }
});


//--------------Обучение----------//
$(window).scroll(function() {
    if ($(this).width() <= 767 ) {
        if($(this).scrollTop() > 4150 ) {
            $('#educationTitle').addClass("titleMove")
        } else {
            $('#educationTitle').removeClass("titleMove");
        }
    } else if ($(this).width() >= 768) {
        if ($(this).scrollTop() > 3200 ) {
            $('#educationTitle').addClass("titleMove")
        } else {
            $('#educationTitle').removeClass("titleMove")
        }
    }
});


//--------Мастер класс------------//
$(window).scroll(function() {
    if ($(this).width() <= 767 ) {
        if($(this).scrollTop() > 5450 ) {
            $('#masterClassTitle').addClass("titleMove")
        } else {
            $('#masterClassTitle').removeClass("titleMove");
        }
    } else if ($(this).width() >= 768) {
        if ($(this).scrollTop() > 3900 ) {
            $('#masterClassTitle').addClass("titleMove")
        } else {
            $('#masterClassTitle').removeClass("titleMove")
        }
    }
});


//----------Слайдер------------//
let left = 0;
let slider = document.getElementsByClassName('slider');
let sliderWidth = slider[0].offsetWidth;
let sliderHeight = sliderWidth + sliderWidth / 3;
let sliderContainer = document.getElementsByClassName('sliderContainer');

slider[0].style.height = sliderHeight + "px"


function autoSlider() {
    timer = this.timer;
    timer = setTimeout(function(){
        left = left - sliderWidth;
        width = sliderWidth * sliderContainer[0].childElementCount;
        if (left < -(sliderWidth * (sliderContainer[0].childElementCount - 1))) {
            left = 0;
            clearTimeout(timer)
        }
        sliderContainer[0].style.left = left  + "px";
        autoSlider();
    },450)
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


//-----------------AJAX------------
function AjaxFormRequest(formMain) {
    name = document.getElementById('name').value;
    phone = document.getElementById('phone').value
    if ( name.length >= 2 && phone.length >= 9) {
        jQuery.ajax({
            url:     "send.php",
            type:     "POST",
            dataType: "html",
            data: jQuery("#"+formMain).serialize(),
    });
    document.getElementById('formMain').innerHTML = `<p class="thanks">Спасибо мы свяжемся с вами.</p>`;
    } else {
        document.getElementById('name').placeholder = 'Заполните поле';
        document.getElementById('phone').placeholder  = 'Заполните поле';
    }
}