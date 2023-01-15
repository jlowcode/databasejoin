# Database join element

O elemento Database join é extremamente poderoso. Ele permite que você procure dados em outra tabela de banco de dados e preencha previamente uma lista de opções ou uma lista suspensa com os dados retornados da pesquisa. Por exemplo, você pode criar facilmente uma lista suspensa contendo todos os seus artigos Joomla ou uma lista de países.

### Sumário
- [Configurações](#configuracoes)
  - [Opções](#opcoes)
  - [Dados](#dados)
    - [Ou concatenar rótulo - exemplos](#exemplos)
  - [Data-where](#data)
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
        - [Como sincronizar dados entre duas caixas de seleção de junção de banco de dados](http://fabrikar.com/forums/index.php?wiki/how-to-syncronize-two-tables-with-dbjoin-checkbox/) em duas tabelas diferentes.

- `Conexão`:A conexão Fabrik que contém a tabela de banco de dados cujos dados queremos procurar para criar a lista

     **Observação**: a Fabrik não pode unir conexões, portanto, a conexão selecionada deve ser a mesma da lista!

- `Tabela`: A tabela do banco de dados que contém os dados de pesquisa (preenchida assim que uma conexão é selecionada).

- `Valor`: No formulário, o valor desse elemento é usado como valor do menu suspenso. É esse valor que é registrado no banco de dados. Deve ser um valor exclusivo na tabela unida, geralmente a chave primária.

- `Rótulo`: No formulário, este é o dado que aparecerá na caixa dropdown. Ela também será usada ao ver uma lista do fabrik.

- `Parent`: Selecione o elemento para representar o pai da árvore de nós.

- `Categoria raiz`: 

- `Estilo`:

- `Sincronismo de listas`: Sincronização das duas listas pelo nome de seus campos.

- `Ou concatenar rótulo`: Uma lista separada por vírgulas de dados e/ou strings que você deseja usar para o rótulo de junção do banco de dados. (por exemplo, `pessoas.último_nome, ', ', pessoas.primeiro_nome` pode produzir um rótulo de `Smith, John`) Deixe em branco como padrão para o rótulo selecionado no menu suspenso acima. Use o espaço reservado {thistable} para garantir que você use o nome da tabela correto (que pode ser sufixado com '_n' no caso de mais de uma junção na mesma tabela)
    
     #### Exemplos
            
     - Se seus campos contiverem valores NULL, você precisará convertê-los em *strings* vazias. 
       
       **Código(Texto)**: 
                  
            ISNULL(FirstName,''),'',ISNULL(LastName,'')
            
            
     - Se você deseja definir um rótulo de um valor de dados que não é um espaço reservado disponível, você pode usar o MySQL Concat para recuperar o valor incorporando uma subconsulta no campo CONTACT Label: 
      
     **Código(Texto)**: 
     
       (SELECT `column_containing_desired_value` FROM other_table WHERE `id` = {thistable}.field_containing_foreign_key)
    
    
    - Ao concatenar datas, esteja ciente de que elas serão retornadas como a data GMT, sem o fuso horário do Joomla aplicado a elas. 
     
      **Código(SQL)**:
    
          DATE_FORMAT(CONVERT_TZ(gs_list_talks.talk_date,'+00:00','+2:00'), '%d-%m-%Y'),' - ',gs_list_talks.talk_name
          
          
     - Se o rótulo do seu dbjoin for um valor dbjoin, obtenha seu rótulo com 
       
       **Código(SQL)**:
      
            (SELECT name FROM table2 WHERE table2.id = {thistable}.element)
      
- `Sugestão Inicial`: Ao clicar na caixa de seleção será apresentado uma sugestão dos dados presentes neste elemento.

- `Tags`: Realiza o funcionamento deste plugin como tags. Aplicável a `Árvore/Autocompletar` e a `Árvore Multi Seleção/Caixa de verificação`.

### Data-Where

- `Ocultar itens já vinculados`:
- `Joins where and/or order  by statement (SQL)`:
- `Aplicar a`:
- `Aplicar onde e quando`:
- `AJAX Update`:
- `Filter Where`:

