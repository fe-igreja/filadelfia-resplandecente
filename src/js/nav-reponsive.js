function MenuResponsivo() {
    let navHamburguer = window.document.getElementById('toggler');
    var StyleMain = window.document.getElementById("main_do_index");

    if (navHamburguer.checked) {
        console.log("tudo certo!");
        StyleMain.style.marginTop = "0%";
    } else {
        StyleMain.style.marginTop = "36%";
    }
}