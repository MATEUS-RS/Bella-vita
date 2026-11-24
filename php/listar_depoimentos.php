<?php
// Busca os depoimentos da tabela depoimentos e devolve em JSON
// Chamado pela função carregarDepoimentos() do js/script.js

require "conexao.php";

$sql = "select * from depoimentos order by id";
$qry = $con->prepare($sql);
$qry->execute();

// fetchAll transforma o resultado do select em um vetor de objetos
$registros = $qry->fetchAll(PDO::FETCH_OBJ);

echo json_encode($registros);
?>
