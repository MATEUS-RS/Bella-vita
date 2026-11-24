<?php
// Conexão com o banco de dados MySQL do XAMPP
// Este arquivo é incluído (require) em todos os outros arquivos PHP

$con = new PDO("mysql:host=localhost;dbname=bella_vita;charset=utf8", "root", "");

// Todas as respostas do back-end são enviadas em formato JSON
header("Content-Type: application/json; charset=utf-8");


// Função com parâmetros e sem retorno:
// escreve a resposta em JSON para o JavaScript e encerra o PHP
function responder($sucesso, $mensagem)
{
    echo json_encode(array("sucesso" => $sucesso, "mensagem" => $mensagem));
    exit;
}
?>
