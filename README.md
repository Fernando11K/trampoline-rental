# MVP - Sistema de Organização de Aluguéis de Pula Pula

Aplicação front-end (HTML, CSS e JavaScript) para apoiar o **locador** no gerenciamento de aluguéis de pula pula, com cadastro, visualização, cancelamento, reagendamento e exclusão de reservas.

Este projeto faz parte da sprint **Desenvolvimento Full Stack Básico** da **PUC-Rio**.

## Objetivo do projeto

Este MVP foi desenvolvido para **gerenciar os aluguéis de pula pula por parte do locador**, centralizando o controle operacional das reservas em uma interface simples e prática.

Com ele, o locador consegue:

- cadastrar um aluguel;
- listar aluguéis já registrados;
- cancelar um aluguel existente;
- reagendar um aluguel cancelado;
- excluir um agendamento;
- receber feedback de validação no formulário.

Como evolução do produto, a proposta é ampliar o sistema para **aluguel de outros brinquedos** e permitir que o **próprio locatário realize o agendamento**.

## Funcionalidades implementadas

- Cadastro de aluguel com os campos:
  - data do aluguel;
  - horas de festa;
  - valor do aluguel;
  - locatário.
- Listagem dos aluguéis em tabela.
- Cancelamento de aluguel por ação direta na tabela.
- Reagendamento de aluguel cancelado por ação direta na tabela.
- Exclusão de agendamento por ação direta na tabela.
- Exibição de status por agendamento (`Agendado` e `Cancelado`).
- Exibição de mensagens de validação amigáveis em português.
- Formatação de data e moeda no padrão brasileiro (`pt-BR`).

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- [Font Awesome](https://cdnjs.com/libraries/font-awesome) para ícones

## Estrutura do projeto

```text
trampoline-rental/
├── index.html
├── css/
│   ├── default.css
│   └── styles.css
└── js/
    ├── index.js
    └── validation-messages.js
```

## Integração com API

O front-end consome uma API local configurada em:

`http://127.0.0.1:5000`

Repositório do backend:

- [trampoline-rental-api](https://github.com/Fernando11K/trampoline-rental-api)

Endpoints utilizados:

- `GET /rent` - listar aluguéis;
- `POST /rent` - cadastrar novo aluguel;
- `PATCH /rent/{id}` - cancelar aluguel.
- `PATCH /rent/{id}/reactivate` - reagendar aluguel cancelado;
- `DELETE /rent/{id}` - excluir agendamento.

> Importante: para o sistema funcionar completamente, a API precisa estar em execução nesse endereço.

## Como executar o front-end

Como este projeto é estático, basta servir os arquivos em um servidor local. Exemplo com Python:

```bash
python3 -m http.server 5500
```

Depois, acesse no navegador:

`http://127.0.0.1:5500`

## Fluxo de uso

1. Preencha os dados do aluguel no formulário.
2. Clique no botão de adicionar para agendar.
3. Veja os registros na tabela com coluna de status (`Agendado`/`Cancelado`).
4. Use o botão de cancelamento para desativar um aluguel ativo.
5. Se o aluguel estiver cancelado, use o botão de reagendar.
6. Use o botão de lixeira para excluir o agendamento.

## Melhorias futuras (próximos passos do MVP)

- expansão do catálogo para outros brinquedos além do pula pula;
- agendamento self-service realizado pelo próprio locatário;
- filtro por período e por locatário;
- edição de aluguel já cadastrado;
- paginação da tabela;
- autenticação de usuários (locador/equipe);
- dashboard com indicadores de ocupação e faturamento.

## Autor

Projeto acadêmico de MVP para organização de aluguéis de pula pula.
