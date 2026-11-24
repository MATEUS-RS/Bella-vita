# Bella Vita Nutrição

Site de uma clínica de nutrição desenvolvido na disciplina **Fundamentos ao Desenvolvimento Web** (Unoesc, 2026/2), com back-end em **PHP** e banco de dados **MySQL**.

Desenvolvido por Mateus Rocha da Silva.

## Seções implementadas (Avaliação A1.3)

| Seção | Tabela | Funcionalidade | Arquivo PHP | Função JavaScript |
|---|---|---|---|---|
| Orçamento | `orcamentos` | Inserção | `php/salvar_orcamento.php` | `enviarOrcamento()` |
| Contato | `contatos` | Inserção | `php/salvar_contato.php` | `enviarContato()` |
| Depoimentos | `depoimentos` | Listagem | `php/listar_depoimentos.php` | `carregarDepoimentos()` |
| Depoimentos | `depoimentos` | Inserção | `php/salvar_depoimento.php` | `enviarDepoimento()` |

## Estrutura de pastas

```
Bella-vita/
├── index.html          → página principal (contato e depoimentos)
├── servico1.html       → Consulta Nutricional (formulário de orçamento)
├── servico2.html       → Plano Alimentar (formulário de orçamento)
├── servico3.html       → Acompanhamento Nutricional (formulário de orçamento)
├── style.css
├── img/
├── js/
│   └── script.js       → funções JavaScript que chamam o back-end (fetch)
├── php/
│   ├── conexao.php     → conexão com o MySQL (PDO)
│   ├── salvar_contato.php
│   ├── salvar_orcamento.php
│   ├── listar_depoimentos.php
│   └── salvar_depoimento.php
└── banco/
    └── bella_vita.sql  → script do banco de dados
```

## Como rodar no XAMPP

1. Copie a pasta do projeto para `C:\xampp\htdocs\Bella-vita`.
2. Abra o XAMPP Control Panel e inicie o **Apache** e o **MySQL**.
3. Acesse `http://localhost/phpmyadmin`, clique em **Importar**, escolha o arquivo `banco/bella_vita.sql` e clique em **Importar**. O banco `bella_vita` será criado com as 3 tabelas e os 5 depoimentos iniciais.
4. Abra o site em `http://localhost/Bella-vita/index.html`.

> O site precisa ser aberto pelo `http://localhost/...`. Se abrir o arquivo com dois cliques (endereço `file:///...`), o PHP não é executado e os formulários não funcionam.

Se o seu MySQL tiver senha ou outro usuário, altere as variáveis no início do arquivo `php/conexao.php`.

## Como funciona

1. O usuário preenche um formulário e clica em **Enviar**.
2. A função JavaScript (`js/script.js`) impede o recarregamento da página (`preventDefault`), junta os campos com `FormData` e envia para o arquivo PHP com `fetch` usando o método `POST`.
3. O PHP lê os dados em `$_POST`, valida (campos obrigatórios, e-mail, data, UF) e grava no banco com `INSERT` usando *prepared statements* (protege contra SQL Injection).
4. O PHP responde em JSON (`{"sucesso": true, "mensagem": "..."}`) e o JavaScript mostra a mensagem na tela com um alerta do Bootstrap.

Para os depoimentos, ao abrir o `index.html` a função `carregarDepoimentos()` faz um `fetch` em `listar_depoimentos.php`, que executa um `SELECT` e devolve a lista em JSON. O JavaScript cria um card para cada depoimento. Ao enviar um novo depoimento, a lista é recarregada automaticamente.

Nas páginas de serviço, um campo escondido (`<input type="hidden" name="servico">`) informa ao back-end qual serviço o orçamento se refere.

## Consultas úteis no phpMyAdmin

```sql
SELECT * FROM orcamentos ORDER BY data_cadastro DESC;
SELECT * FROM contatos ORDER BY data_cadastro DESC;
SELECT * FROM depoimentos;
```
