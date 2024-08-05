document.getElementById('sub-button').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block' ;
    // document.getElementById('popup').classList.add('popup-visible');
});

document.getElementById('close-button').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none' ;
});