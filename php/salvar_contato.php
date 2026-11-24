<?php
// Grava a mensagem do formulário "Entre em Contato" na tabela contatos
// Chamado pela função enviarContato() do js/script.js

require "conexao.php";

// Recebe os dados enviados pelo formulário (trim tira os espaços das pontas)
$nome     = trim($_POST["nome"]);
$email    = trim($_POST["email"]);
$mensagem = trim($_POST["mensagem"]);

// Validação
if ($nome == "" || $email == "" || $mensagem == "") {
    responder(false, "Preencha todos os campos.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(false, "Informe um e-mail válido.");
}

// Insert com parâmetros
$sql = "insert into contatos (nome, email, mensagem) values (:n, :e, :m)";
$qry = $con->prepare($sql);
$qry->bindParam(":n", $nome, PDO::PARAM_STR);
$qry->bindParam(":e", $email, PDO::PARAM_STR);
$qry->bindParam(":m", $mensagem, PDO::PARAM_STR);
$qry->execute();

// rowCount() devolve quantos registros foram inseridos
if ($qry->rowCount() > 0) {
    responder(true, "Mensagem enviada com sucesso! Em breve entraremos em contato.");
} else {
    responder(false, "Não foi possível enviar a mensagem.");
}
?>
