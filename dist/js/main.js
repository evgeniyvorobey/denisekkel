autoSlider();


$(document).ready(function(){
    $("#menu, #toTop").on("click","a", function (event) {
        event.preventDefault();
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

let comandTitle = $('#comandTitle').offset().top;
let windowHeight = window.innerHeight;

console.log(`До элемента ${comandTitle}`) 
console.log(`Длина страници ${windowHeight}`)
console.log(`Показать ${windowHeight - 100}`)

//----------------Команда-------------//
$(window).scroll(function() {
    if ($(this).scrollTop() > 900 ) {
        $('#comandTitle').addClass("titleMove")
    } else {$('#comandTitle').removeClass("titleMove");}
});


//------------Фото галерея-------------//
$(window).scroll(function() {
    if ($(this).scrollTop() > 2300 ) {
        $('#galaryTitle').addClass("titleMove")
    } else {$('#galaryTitle').removeClass("titleMove");}
});


//--------------Прайс-----------//
$(window).scroll(function() {
    if ($(this).scrollTop() > 3000 ) {
        $('#priceTitle').addClass("titleMove")
    } else {$('#priceTitle').removeClass("titleMove");}
});


//--------------Обучение----------//
$(window).scroll(function() {
    if($(this).scrollTop() > 3750 ) {
        $('#educationTitle').addClass("titleMove")
    } else {$('#educationTitle').removeClass("titleMove");}
});
//------parallax
// jQuery(document).ready(function(){
//     $(window).scroll(function(e){
//         parallaxScroll();
//     });

//     function parallaxScroll(){
//         var scrolled = $(window).scrollTop();
//         $('#parallax').css('top',(0+(scrolled*.25))+'px');
//     }
// }); 


let left = 0;
let slider = document.getElementsByClassName('slider');
let sliderWidth = slider[0].offsetWidth;
let sliderHeight = sliderWidth + sliderWidth / 2;
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
        sliderContainer[0].style.left = left + "px";
        autoSlider();
    },450)
}