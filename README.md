# Database join element

O elemento Database join é extremamente poderoso. Ele permite que você procure dados em outra tabela de banco de dados e preencha previamente uma lista de opções ou uma lista suspensa com os dados retornados da pesquisa. Por exemplo, você pode criar facilmente uma lista suspensa contendo todos os seus artigos Joomla ou uma lista de países.

### Sumário
- [Configurações](#configuracoes)
  - [Opções](#opcoes)
  - [Dados]
  - [Data-where]
  - [Por favor seleciona]
  - [Adicionar opção no frontend]
  - [Layout]
  - [Avançado]

### Configurações

### Opções

- `Opções de avaliação`: Código PHP para executar para alteração nas opções de elementos. Cada opção é um objeto e pode ser referenciado no código de avaliação com a variável $opt. Ela tem duas propriedades $opt->value e $opt->text.
-  `Padão`: O valor padrão para selecionar ao mostrar um novo formulário.
- `Oculto`:  É o elemento mostrado no formulário como um campo oculto.


