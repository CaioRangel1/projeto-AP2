document.getElementById('saida').addEventListener('click', function() {
    window.location.href = 'index.html'; 
  });

  document.addEventListener("DOMContentLoaded", function () {
    var informacoesDiv = document.getElementById("informacoesJogadores");
    var loadingMessage = document.getElementById("loadingMessage");
  
    function exibirMensagemDeCarregamento() {
      loadingMessage.style.display = "block";
    }
  
    function ocultarMensagemDeCarregamento() {
      loadingMessage.style.display = "none";
    }
  
    function carregarInformacoes(url) {
      exibirMensagemDeCarregamento();
  
      fetch(url)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Não foi possível obter os dados. Código de status: " + response.status);
          }
          return response.json();
        })
        .then(function (data) {
          informacoesDiv.innerHTML = "";
          exibirInformacoesJogadores(data);
        })
        .catch(function (error) {
          console.error("Erro ao obter os dados:", error);
        })
        .finally(function () {
          ocultarMensagemDeCarregamento();
        });
    }
  
    function exibirInformacoesJogadores(data) {
      data.forEach(function (jogador) {
        // Para cada jogador, obter informações detalhadas
        fetch(`https://botafogo-atletas.mange.li/${jogador.id}`)
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Não foi possível obter os detalhes do jogador. Código de status: " + response.status);
            }
            return response.json();
          })
          .then(function (detalhesJogador) {
            // Criar um card com a imagem e descrição
            var cardDiv = document.createElement("div");
            cardDiv.classList.add("card");
  
            var imagem = document.createElement("img");
            imagem.src = jogador.imagem;
            imagem.alt = jogador.nome;
  
            var descricaoParagrafo = document.createElement("p");
            descricaoParagrafo.textContent = `Nome: ${jogador.nome}, Posição: ${jogador.posicao}, Descrição: ${detalhesJogador.descricao}`;
  
            cardDiv.appendChild(imagem);
            cardDiv.appendChild(descricaoParagrafo);
  
            informacoesDiv.appendChild(cardDiv);
          })
          .catch(function (error) {
            console.error("Erro ao obter os detalhes do jogador:", error);
          });
      });
    }
  
    document.getElementById("masculinoBtn").addEventListener("click", function () {
      carregarInformacoes("https://botafogo-atletas.mange.li/masculino");
    });
  
    document.getElementById("femininoBtn").addEventListener("click", function () {
      carregarInformacoes("https://botafogo-atletas.mange.li/feminino");
    });
  
    document.getElementById("elencoCompletoBtn").addEventListener("click", function () {
      carregarInformacoes("https://botafogo-atletas.mange.li/all");
    });
  });
  