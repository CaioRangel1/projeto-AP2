function verificaSenha() {

    const entrada = document.getElementById('senha').value;
    const senha = CryptoJS.MD5(entrada).toString();

    if (senha === "0f057dfdd5b58437ffc9d16cbe228787") {
        localStorage.setItem('autenticado', 'true');
        window.location.href = "detalhes.html";
    } else {
        alert("Errooooouuuuuu!");
    }
}

function verificaTecla(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        verificaSenha();
    }
}