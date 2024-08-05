$(document).ready(function() {
    const productGrid = $('.product-grid');
    const numberOfItems = 12; // 3행 4열 = 12개 항목

    for (let i = 0; i < numberOfItems; i++) {
        // Create a new product item
        const productItem = $('<div>', { class: 'product-item' });
        const productImage = $('<img>', { src: '../images/211.jpg', alt: '제품 이미지' });
        const productPrice = $('<div>', { class: 'price', text: '55,900원' });
        const productRating = $('<div>', { class: 'rating', text: '4.9 ★' });

        // Append elements to product item
        productItem.append(productImage);
        productItem.append(productPrice);
        productItem.append(productRating);

        // Append product item to product grid
        productGrid.append(productItem);
    }
});