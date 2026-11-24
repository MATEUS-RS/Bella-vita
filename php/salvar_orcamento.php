<?php
// Grava a solicitação do formulário "Solicitar orçamento"
// (servico1.html, servico2.html e servico3.html) na tabela orcamentos
// Chamado pela função enviarOrcamento() do js/script.js

require "conexao.php";

$servico       = trim($_POST["servico"]);
$nome          = trim($_POST["nome"]);
$email         = trim($_POST["email"]);
$telefone      = trim($_POST["telefone"]);
$endereco      = trim($_POST["endereco"]);
$cidade        = trim($_POST["cidade"]);
$uf            = strtoupper(trim($_POST["uf"]));
$data_desejada = $_POST["data_desejada"];
$observacoes   = trim($_POST["observacoes"]);

// Observações é o único campo que pode ficar vazio
if ($servico == "" || $nome == "" || $email == "" || $telefone == "" ||
    $endereco == "" || $cidade == "" || $uf == "" || $data_desejada == "") {
    responder(false, "Preencha todos os campos obrigatórios.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(false, "Informe um e-mail válido.");
}

// O input type="date" já envia a data no formato do MySQL (AAAA-MM-DD)
$sql = "insert into orcamentos (servico, nome, email, telefone, endereco, cidade, uf, data_desejada, observacoes)
        values (:s, :n, :e, :t, :en, :c, :uf, :d, :o)";
$qry = $con->prepare($sql);
$qry->bindParam(":s", $servico, PDO::PARAM_STR);
$qry->bindParam(":n", $nome, PDO::PARAM_STR);
$qry->bindParam(":e", $email, PDO::PARAM_STR);
$qry->bindParam(":t", $telefone, PDO::PARAM_STR);
$qry->bindParam(":en", $endereco, PDO::PARAM_STR);
$qry->bindParam(":c", $cidade, PDO::PARAM_STR);
$qry->bindParam(":uf", $uf, PDO::PARAM_STR);
$qry->bindParam(":d", $data_desejada, PDO::PARAM_STR);
$qry->bindParam(":o", $observacoes, PDO::PARAM_STR);
$qry->execute();

if ($qry->rowCount() > 0) {
    responder(true, "Orçamento solicitado com sucesso! Entraremos em contato em breve.");
} else {
    responder(false, "Não foi possível enviar o orçamento.");
}
?>
