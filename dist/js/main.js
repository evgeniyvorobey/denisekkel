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

            $('.comandFirst', 'body').on('click',function(){
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
// let x = (comandTitle - windowHeight)
console.log(`До элемента ${comandTitle}`) 
console.log(`Длина страници ${windowHeight}`)
console.log(`Показать ${windowHeight - 100}`)

$(window).scroll(function() {
    if ($(this).scrollTop() > windowHeight ) {
        $('#comandTitle').addClass("comandTitleMove")
    } else {$('#comandTitle').removeClass("comandTitleMove");}
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