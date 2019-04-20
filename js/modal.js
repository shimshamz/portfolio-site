var navItems = document.getElementsByClassName('nav-item');
Array.from(navItems).forEach(function(element) {
    element.addEventListener('click', openModal);
});
var id, modal;
var closeBtns = document.getElementsByClassName('closeBtn');
Array.from(closeBtns).forEach(function(element) {
    element.addEventListener('click', closeModal);
});

function openModal() {
    href = this.firstElementChild.getAttribute('href').slice(1);
    id = href;
    modal = document.getElementById(href);
    modal.style.display = 'flex';
    setTimeout(function() {
        modal.style.opacity = 1;
    }, 50);
}

function closeModal() {
    modal.style.opacity = 0;
    setTimeout(function() {
        modal.style.display = 'none';
    }, 150);
}