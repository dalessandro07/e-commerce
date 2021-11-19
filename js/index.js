$("#ver-mas").click(function() {
    $(".mas-noticias").toggleClass("d-none");
    $("#ver-mas").text(function(i, text) {
        return text === "Ocultar" ? "Ver Más" : "Ocultar";
    });
});