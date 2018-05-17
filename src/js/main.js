$(document).ready(function(){
    $("#menu, #toTop").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
        top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1100);
    });
    (function($) {
        $(function(){
            $('.icon, #close').on('click', function(){
                $(this).closest('.menu').toggleClass('menu-open');
            });
            
            $(window).on('load scroll',function(){ 
                if ($(this).scrollTop() >= '200') {
                    $('#toTop').addClass("toTopShow");
                }
                else  {$('#toTop').removeClass("toTopShow");}
            });
        });
    })(jQuery);
});

let comandTitle = $('#comandTitle').offset().top;
let windowHeight = window.outerHeight
let x = (comandTitle - windowHeight)
console.log(x)

$(window).scroll(function() {
    if ($(this).scrollTop() > (x+250) ) {
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