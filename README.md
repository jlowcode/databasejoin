# Database join element

O elemento Database join é extremamente poderoso. Ele permite que você procure dados em outra tabela de banco de dados e preencha previamente uma lista de opções ou uma lista suspensa com os dados retornados da pesquisa. Por exemplo, você pode criar facilmente uma lista suspensa contendo todos os seus artigos Joomla ou uma lista de países.

### Sumário
- [Configurações](#configuracoes)
  - [Opções](#opcoes)
  - [Dados] (dados)
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

# Dados 

- `Render as`: Define se exibe a associação como uma caixa dropdown ou uma série de botões de rádio. Além disso, se não estiver oculto, é possível renderizae os elemento como:
    - `Dropdown`
    - `Lista de radio`
    - `Árvore/Autocompletar`
    - `Árvores Multi Seleção/Caixa de verificação`
    - `Multi seleção dropdown`
        **Observação**: Há 2 modos de renderização de muitos para muitos e a Fabrik cria uma nova tabela de links chamada tablename_repeat_elementname para manter as referências de muitos para muitos.

        - Como sincronizar dados entre duas caixas de seleção de junção de banco de dados[http://fabrikar.com/forums/index.php?wiki/how-to-syncronize-two-tables-with-dbjoin-checkbox/] em duas tabelas diferentes.


- `Conexão`:
- `Tabela`:
- `Valor`:
- `Rótulo`: 
- `Parente`:
- `Categoria raiz`: 
- `Estilo`:
- `Sincronismo de listas`:
- `Ou concatenar rótulo`:
- `Sugestão Inicial`:
- `Tags`:


