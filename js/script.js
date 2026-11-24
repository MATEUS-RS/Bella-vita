// =====================================================
// Funções JavaScript do site Bella Vita Nutrição
// Fazem a comunicação entre as páginas HTML e o back-end PHP
// usando fetch (requisições sem recarregar a página).
// =====================================================


// -----------------------------------------------------
// Mostra uma mensagem (alerta do Bootstrap) dentro de um elemento
// tipo: "success" (verde) ou "danger" (vermelho)
// -----------------------------------------------------
function mostrarMensagem(idElemento, texto, tipo) {
    const elemento = document.getElementById(idElemento);
    elemento.innerHTML = "";

    const alerta = document.createElement("div");
    alerta.className = "alert alert-" + tipo + " mt-3";
    alerta.textContent = texto;

    elemento.appendChild(alerta);
}


// -----------------------------------------------------
// Envia os dados de um formulário para um arquivo PHP
// e devolve a resposta (JSON) do back-end
// -----------------------------------------------------
async function enviarFormulario(formulario, arquivoPhp) {
    // FormData pega todos os campos do formulário pelo atributo "name"
    const dados = new FormData(formulario);

    const resposta = await fetch(arquivoPhp, {
        method: "POST",
        body: dados
    });

    return await resposta.json();
}


// =====================================================
// CONTATO  (index.html)
// =====================================================
async function enviarContato(evento) {
    // Impede o formulário de recarregar a página
    evento.preventDefault();

    const formulario = evento.target;

    try {
        const resultado = await enviarFormulario(formulario, "php/salvar_contato.php");

        if (resultado.sucesso) {
            mostrarMensagem("mensagemContato", resultado.mensagem, "success");
            formulario.reset();
        } else {
            mostrarMensagem("mensagemContato", resultado.mensagem, "danger");
        }
    } catch (erro) {
        mostrarMensagem("mensagemContato", "Não foi possível enviar a mensagem. Tente novamente.", "danger");
    }
}


// =====================================================
// ORÇAMENTO  (servico1.html, servico2.html, servico3.html)
// =====================================================
async function enviarOrcamento(evento) {
    evento.preventDefault();

    const formulario = evento.target;

    try {
        const resultado = await enviarFormulario(formulario, "php/salvar_orcamento.php");

        if (resultado.sucesso) {
            mostrarMensagem("mensagemOrcamento", resultado.mensagem, "success");
            formulario.reset();
        } else {
            mostrarMensagem("mensagemOrcamento", resultado.mensagem, "danger");
        }
    } catch (erro) {
        mostrarMensagem("mensagemOrcamento", "Não foi possível enviar o orçamento. Tente novamente.", "danger");
    }
}


// =====================================================
// DEPOIMENTOS  (index.html)
// =====================================================

// Busca os depoimentos no banco e monta os cards na tela
async function carregarDepoimentos() {
    const lista = document.getElementById("listaDepoimentos");

    try {
        const resposta = await fetch("php/listar_depoimentos.php");

        // O PHP devolve um vetor de objetos: [{id, nome, texto, foto}, ...]
        const depoimentos = await resposta.json();

        lista.innerHTML = "";

        if (depoimentos.length === 0) {
            lista.innerHTML = '<p class="text-center">Ainda não há depoimentos.</p>';
            return;
        }

        // Para cada depoimento vindo do banco, cria um card
        depoimentos.forEach(function (depoimento) {
            lista.appendChild(criarCardDepoimento(depoimento));
        });

    } catch (erro) {
        lista.innerHTML = '<p class="text-center">Erro ao carregar os depoimentos.</p>';
    }
}


// Cria o HTML de um card de depoimento (mesmo layout que o site já usava)
function criarCardDepoimento(depoimento) {
    const coluna = document.createElement("div");
    coluna.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card h-100";

    // Só mostra a foto se o depoimento tiver uma
    if (depoimento.foto) {
        const imagem = document.createElement("img");
        imagem.src = depoimento.foto;
        imagem.className = "card-img-top foto-depoimento";
        imagem.alt = depoimento.nome;
        card.appendChild(imagem);
    }

    const corpo = document.createElement("div");
    corpo.className = "card-body";

    // textContent é usado no lugar de innerHTML para que um texto
    // digitado pelo usuário nunca seja interpretado como código HTML
    const texto = document.createElement("p");
    texto.className = "card-text";
    texto.textContent = depoimento.texto;

    const nome = document.createElement("h5");
    nome.className = "card-title";
    nome.textContent = depoimento.nome;

    corpo.appendChild(texto);
    corpo.appendChild(nome);
    card.appendChild(corpo);
    coluna.appendChild(card);

    return coluna;
}


// Envia um novo depoimento e recarrega a lista
async function enviarDepoimento(evento) {
    evento.preventDefault();

    const formulario = evento.target;

    try {
        const resultado = await enviarFormulario(formulario, "php/salvar_depoimento.php");

        if (resultado.sucesso) {
            mostrarMensagem("mensagemDepoimento", resultado.mensagem, "success");
            formulario.reset();
            carregarDepoimentos();   // atualiza a lista com o novo depoimento
        } else {
            mostrarMensagem("mensagemDepoimento", resultado.mensagem, "danger");
        }
    } catch (erro) {
        mostrarMensagem("mensagemDepoimento", "Não foi possível enviar o depoimento. Tente novamente.", "danger");
    }
}


// =====================================================
// Liga cada formulário à sua função.
// Como o mesmo script.js é usado em todas as páginas,
// só liga o que existir na página aberta.
// =====================================================
const formContato = document.getElementById("formContato");
if (formContato) {
    formContato.addEventListener("submit", enviarContato);
}

const formOrcamento = document.getElementById("formOrcamento");
if (formOrcamento) {
    formOrcamento.addEventListener("submit", enviarOrcamento);
}

const formDepoimento = document.getElementById("formDepoimento");
if (formDepoimento) {
    formDepoimento.addEventListener("submit", enviarDepoimento);
}

if (document.getElementById("listaDepoimentos")) {
    carregarDepoimentos();
}
