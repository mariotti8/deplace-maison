
$(document).ready(function() {

    var num_children = $('.up-left').children().length;
    var child_height = $('.up-left').height() / num_children;
    var half_way = num_children * child_height / 2;
    $(window).scrollTop(half_way);

    function crisscross() {
        
        var parent = $("#content").first();
        var clone = $(parent).clone();
        
        var leftSide = $(clone).find('.up-left');
        var rightSide = $(clone).find('.down-right');

        if (window.scrollY > half_way ) {
            //We are scrolling up
            $(window).scrollTop(half_way - child_height);
            
            var firstLeft = $(leftSide).children().first();
            var lastRight = $(rightSide).children().last();
            
            lastRight.appendTo(leftSide);
            firstLeft.prependTo(rightSide);

        } else if (window.scrollY < half_way - child_height) {

            var lastLeft = $(leftSide).children().last();
            var firstRight = $(rightSide).children().first();
            
            $(window).scrollTop(half_way);
            lastLeft.appendTo(rightSide);
            firstRight.prependTo(leftSide);
        }

        $(leftSide).css('bottom', '-' + window.scrollY + 'px');
        $(rightSide).css('bottom', '-' + window.scrollY + 'px');

        $(parent).replaceWith(clone);        
    }
    
    $(window).scroll(crisscross);
 
});
    
