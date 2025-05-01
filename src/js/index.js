// ano atual
const mensagem = document.getElementById("copyright");
const anoAtual = new Date().getFullYear();
mensagem.innerHTML = `© 2003-${anoAtual} Filadélfia Resplandescente`;


// menu mobile
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    void mobileMenu.offsetWidth;
    mobileMenu.classList.toggle('opacity-0');
    mobileMenu.classList.toggle('max-h-0');
});