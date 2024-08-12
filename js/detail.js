$(document).ready(function () {
    var price= 12200;
    $('#product-price').text(price.toLocaleString()+'원');
    var totalPrice = Number($('#count').text())*price;
    
    $('#minus-button').on('click', function() {
        if(Number($('#count').text())<=1) {
            
        }else{
            var num = Number($('#count').text())-1;
            $('#count').text(num);
            totalPrice = Number($('#count').text())*price;
            $('.total-price').text(totalPrice.toLocaleString()+'원');
        }
    })
    
    $('#plus-button').on('click', function() {
        var num = Number($('#count').text())+1;
        $('#count').text(num);
        totalPrice = Number($('#count').text())*price;
        $('.total-price').text(totalPrice.toLocaleString()+'원');
    })
    
    $('.total-price').text(totalPrice.toLocaleString()+'원');

    $('#buy').on('click', function() {
        window.location.href='../html/cart.html'
    })

    $('#move-info').on('click', function() {
        $('#detail-img1')[0].scrollIntoView();
    })
    
    $('#move-detail').on('click', function() {
        $('#detail-img2')[0].scrollIntoView();
    })
    
    $('#move-review').on('click', function() {
        $('#review-container')[0].scrollIntoView();
    })
    
});