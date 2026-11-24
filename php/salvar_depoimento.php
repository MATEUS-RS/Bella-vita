<?php
// Grava um novo depoimento do formulário "Deixe seu depoimento"
// na tabela depoimentos
// Chamado pela função enviarDepoimento() do js/script.js

require "conexao.php";

$nome  = trim($_POST["nome"]);
$texto = trim($_POST["texto"]);

if ($nome == "" || $texto == "") {
    responder(false, "Preencha o nome e o depoimento.");
}

// Novos depoimentos não têm foto, então a coluna foto fica NULL
$sql = "insert into depoimentos (nome, texto) values (:n, :t)";
$qry = $con->prepare($sql);
$qry->bindParam(":n", $nome, PDO::PARAM_STR);
$qry->bindParam(":t", $texto, PDO::PARAM_STR);
$qry->execute();

if ($qry->rowCount() > 0) {
    responder(true, "Obrigado pelo seu depoimento!");
} else {
    responder(false, "Não foi possível enviar o depoimento.");
}
?>
