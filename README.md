# Database join element

O elemento Database join é extremamente poderoso. Ele permite que você procure dados em outra tabela de banco de dados e preencha previamente uma lista de opções ou uma lista suspensa com os dados retornados da pesquisa. Por exemplo, você pode criar facilmente uma lista suspensa contendo todos os seus artigos Joomla ou uma lista de países.

### Sumário
- [Configurações](#configurações)
  - [Opções](#opções)
  - [Dados](#dados)
    - [Ou concatenar rótulo - exemplos](#exemplos)
  - [Data-where](#data-where)
      - [Notas sobre o uso do AJAX Update](#notas-sobre-o-uso-do-AJAX-Update)
  - [Por favor selecione](#por-favor-selecione)
  - [Adicionar opção no frontend](#adicionar-opção-no-frontend)
  - [Layout](#layout)
  - [Avançado](#avançado)
- [Validações](#validações)
  - [Se database join não for de seleção múltipla](#se-database-join-não-for-de-seleção-múltipla)
  - [Se database join for de seleção múltipla](#se-database-join-for-de-seleção-múltipla)

### Configurações

### Opções

<img src="/images/1.png" width="900px" />

- `Opções de avaliação`: Código PHP para executar para alteração nas opções de elementos. Cada opção é um objeto e pode ser referenciado no código de avaliação com a variável $opt. Ela tem duas propriedades $opt->value e $opt->text.
-  `Padão`: O valor padrão para selecionar ao mostrar um novo formulário.
- `Oculto`:  É o elemento mostrado no formulário como um campo oculto.

# Dados 

<img src="/images/2.jpeg" width="900px" />

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

<img src="/images/3.jpeg" width="900px" />

- `Ocultar itens já vinculados`:
 
- `Joins where and/or order  by statement (SQL)`: OPCIONAL - Uma cláusula SQL Select "Where" que filtra os dados retornados. 
  - Por exemplo, para mostrar apenas registros com publicado = 1:

      **Código(SQL)**:

          WHERE `published` = 1

  - Ou para mostrar apenas um conjunto de usuários que pertencem ao grupo id 14:

      **Código(SQL)**:

        WHERE {thistable}.`username`
            IN ( SELECT jos_users.username FROM jos_users, jos_user_usergroup_map
                WHERE jos_users.id = jos_user_usergroup_map.user_id
                AND jos_user_usergroup_map.group_id = 14)

  - Você também pode adicionar um ORDER BY:

      **Código(SQL)**:

        WHERE {thistable}.published = '1' ORDER BY {thistable}.somefield ASC

  - Se você precisar adicionar um pedido, mas não precisar de uma cláusula WHERE, basta usar alguma cláusula que sempre retorne true, como:

      **Código(SQL)**:

        WHERE 1=1 ORDER BY {thistable}.somefield ASC
    
**Nota**: Use o espaço reservado {thistable} para referenciar a tabela que você está juntando, em vez do nome da tabela real. Isso ocorre porque, se você tiver várias junções na mesma tabela, a Fabrik usará aliases para diferenciar as junções, como "SELECT yourtable AS yourtable_0", e não há como saber qual alias uma determinada junção terá. Portanto, a Fabrik substituirá {thistable} pelo alias apropriado.

- `Aplicar a`: Selecione qual nível de visualização do usuário terá a instrução join where aplicada a eles.

- `Aplicar onde e quando`: Quando o filtro onde deve ser aplicado à consulta do elemento de junção do banco de dados.

- `AJAX Update`: Se você usar espaços reservados de elemento em sua instrução WHERE, habilite isso para forçar o filtro a atualizar quando você alterar qualquer um dos elementos de referência. Sem a atualização do AJAX ativada, o filtro é baseado no valor do espaço reservado referido no carregamento. Se esse espaço reservado estiver vazio, talvez você não obtenha os resultados desejados.
  - O `AJAX Update` é aplicado com base na configuração em `Aplicar onde quando`
  - Exemplo com `AJAX Update`:
    Se eu tiver uma tabela de códigos postais por município e quiser apresentar apenas os códigos postais dentro de um município selecionado {esse município está no elemento "table_name___selected_county" então este código apresentará apenas os códigos postais desse município.
    
        WHERE county = '{table_name___selected_county_raw}'
        
   #### Notas sobre o uso do AJAX Update.
   
   - Um dos desafios do AJAX Updateé que você pode precisar 'disparar' o evento que faz com que o dbjoin seja preenchido no carregamento da página. O elemento 'controlling' não é 'alterado' no carregamento, portanto, a atualização do AJAX nunca é acionada para preencher o menu suspenso. Se a primeira etapa do usuário for preencher/escolher algo no elemento de controle, o evento change será acionado e esse elemento dbjoin será preenchido.
   - No entanto, talvez você queira que o elemento "controlador" seja definido como padrão no carregamento. Isso significa que, no carregamento, o elemento de controle é definido com um valor padrão que o usuário não precisa selecionar, portanto, nenhum evento de alteração é acionado e o dbjoin não será preenchido. O usuário seria obrigado a alterar o valor 'padrão' do elemento de controle - o que anula o propósito de ter um padrão.
   - O padrão AJAX (veja abaixo) pode ser usado, em alguns casos, para definir o padrão para o dbjoin, mas se você não deseja um valor padrão, mas deseja que a lista (filtrada) seja preenchida, isso exigiria o usuário desmarque e selecione novamente o valor no elemento de controle.
   - O que você pode fazer é disparar um evento de alteração para o elemento de controle no carregamento do elemento dbjoin.
   - Exemplo:
   - Se o campo dbjoin que você deseja preencher for "table___dbjoin" e o campo de controle for "table___controlling", o código a seguir fará disparar um evento 'change' para o campo de controle no carregamento do formulário. Isso fará com que o campo dbjoin seja preenchido como se o usuário tivesse alterado o campo de controle.
   - Adicione o evento javascript "onLoad" ao elemento "table___dbjoin" (realmente não importa qual elemento você usa, apenas para que o elemento seja carregado para que o onload java seja acionado).
   - Na caixa javascript, adicione o seguinte. **Nota**: modificado para usar jQuery em vez de mootools.bg

  **Código(JavaScript)**:
 
      loadDBList(this);


   - Isso chamará uma função no arquivo form_x.js (onde _x é o número do formulário).
   - Essa função deve ser:

 **Código(JavaScript)**:
 
      function loadDBList(el) {
          var usedID = jQuery('#table___controlling' );
          usedID[0].fireEvent('change');
      }
 
 
  - Isso causará um evento de 'alteração' do elemento de controle, como se o usuário o tivesse alterado - portanto, o elemento dbjoin será preenchido. Se você definir o padrão no elemento de controle, o dbjoin será filtrado pelo valor padrão.
  - Se o campo de controle e o campo dbjoin estiverem em um grupo repetido, você precisará modificar o código para contabilizar o _x adicionado ao nome do campo no grupo repetido. O código é então.


 **Código(JavaScript)**:
 
      função loadDBList ( el ) {
          var repeat = el. getRepeatNum ( ) ;
          var usadoID = jQuery ( 'table___controlling' + repeat ) ;
          ID usado [ 0 ] . fireEvent ( 'alterar' ) ;
      }
      
  
  - Versão um pouco mais elegante. Se você chamar o javascript do elemento "controlador", poderá evitar parte do incômodo de criar o nome do elemento. Isso é particularmente bom se você estiver trabalhando em grupos repetidos onde precisa lidar com repeatNum.


 **Código(JavaScript)**:
 
    function loadStateList(el) {
        var elementName = '#' + el['strElement'];
        var usedID = jQuery(elementName);
        usedID[0].fireEvent('change');
    }
    
   Ou
  
  
 **Código(JavaScript)**:
 
     function loadStateList(el) {
      var usedID = jQuery('#' + el['strElement']);
      usedID[0].fireEvent('change');
    }
 

 Neste caso, *el* contém o nome do elemento em ['strElement']. Você pode adicionar o "#" e disparar o evento.

**Observação**: Muitas vezes, os menus suspensos em cascata serão menos complicados - mas podem não funcionar em todos os casos . 


- `Filter Where`: OPCIONAL - semelhante a "instrução de joins where", mas adiciona uma cláusula where à consulta usada para criar a lista de opções quando esse elemento é usado como um filtro de lista. Atualmente aplicado apenas se você estiver usando o método "Mostrar tudo" para suas opções de filtro, em que todas as linhas da tabela unida são incluídas na lista de filtros. Não prefixe isso com WHERE, AND, OR, etc. Portanto, por exemplo, para restringir seu filtro suspenso apenas às linhas com um campo chamado show_in_filter definido como 1, você usuário:

 **Código(SQL)**:
 
    {thistable}.show_in_filter = '1'
    
**Dica**:
Se você estiver ingressando em uma lista que possui um elemento que armazena um view_level, você pode filtrar as opções suspensas disponíveis para o usuário conectado com base no view_level armazenado nesse elemento de sua lista ingressada.

A consulta de exemplo ficaria assim: 

**Código(Texto)**:

    {thistable}.view_level IN (SELECT DISTINCT `#__viewlevels`.`id`
    FROM #__user_usergroup_map
    LEFT JOIN #__viewlevels ON REPLACE(REPLACE(rules,'[',','),']',',') LIKE CONCAT('%,',`group_id`,',%')
    WHERE user_id ='{$my->id}')
    
No exemplo acima, {thistable}.view_level é o elemento de suas listas que armazena o ID de viewlevels do Joomla. A consulta faz referência à tabela viewlevels do Joomla e à tabela user_usergroup_map do Joomla para determinar quais registros na tabela unida correspondem aos níveis de exibição autorizados do usuário conectado no momento. Isso remove do menu suspenso do filtro de junção do banco de dados todos os registros que o usuário não está autorizado a ver. 

### Por favor selecione

<img src="/images/4.png" width="900px" />

- `Exibir por favor selecione`: Se definido para renderizar como um dropdown, você pode alternar se uma opção de seleção está incluída na lista. Não afeta listas de rádio.
-  `Valor da opção 'Por favor selecione'`: O texto a ser registrado no banco de dados se nenhuma opção for selecionada no elemento.
-  `Rótulo da opção 'Por favor selecione'`: O rótulo a ser exibido para a opção 'Selecione' - se nenhum for inserido, o padrão é 'Selecione'. Para modificar o rótulo mostrado no filtro suspenso (padrão "Todos"), anexe-o com ::, então selecione uma cidade::Mostrar todas as cidades.
-  `Placeeholdere`: Espaço reservado HTML5 para campo de preenchimento automático.

### Adicionar opção no frontend

<img src="/images/5.png" width="900px" />

- `Formulário popup`: Selecione o formulário que corresponde à tabela do banco de dados à qual a associação está conectada. Este é o formulário que é carregado na janela popup quando o botão "adicionar" é pressionado.
- `Adicionar opção no frontend`: Se um 'Formulário popup' for selecionado, um botão Adicionar será adicionado ao elemento. Quando clicado, abrirá um formulário para adicionar novos registros.
- `Abrir em páina em branco`: Se selecionado então abre o formulário em uma nova aba.
- `Largura da janela popup`: A largura da janela popup em pixels.
- `Link para registro associado`: Aplica-se quando em uma exibição detalhada ou se os níveis de acesso do elemento significam que ele está configurado para ler somente quando estiver em um formulário. Se esta opção for selecionada, o valor somente leitura será colocado em um link. Este link aponta para uma visualização detalhada do registro referenciado pelos dados do elemento join do banco de dados.
- `Seleção de frontend`:Fornece um botão que exibe a lista unida, permitindo que o usuário pesquise o registro que deseja.

**OBSERVAÇÃO** - Você também deve selecionar um formulário na seleção 'Formulário pop-up' acima, mesmo que não esteja usando a opção 'Adicionar no frontend'.

**NOTA**: O 'Valor' do elemento DEVE ser definido como a chave primária para que esta opção funcione.

### Layout

<img src="/images/6.png" width="900px" />

- `Enhanced Dropdowns`: Aprimora o comportamento do menu suspenso usando jQuery Chosen (semelhante ao Select2), que, por exemplo, fornece uma caixa de pesquisa se houver mais de 10 itens e fornece widgets que podem ser excluídos para seleção múltipla.
        **Observação***: Para que o Enhanced Dropdowns funcionem, você deve ativar o Enhanced Dropdowns na guia opções de Formulários do Fabrik. Você pode desativar ou ativar o Enhanced Dropdowns globalmente ou por elemento. 
- `Opções por linha`:  Ao renderizar como um rádio ou lista de caixa de seleção, isso define quantos botões de rádio mostrar por linha, o padrão é 1.
- `Multi select max`: Trabalho em andamento: recurso experimental para permitir a especificação de um número máximo de seleções ao usar menus suspensos aprimorados, no modo de seleção múltipla.
- `Tamanho da multi-lista`: Se a junção for renderizada como uma lista múltipla, esse valor inteiro especifica a altura da lista.
- `Auto-complete widh`: Valor do atributo de tamanho para campo de entrada/exibição de preenchimento automático. Só afeta o tamanho visível se não estiver dentro de um modelo bootstrap. Caso contrário, use a opção "classe de inicialização".
- `Auto-complete rows`: Defina o número máximo de opções de preenchimento automático a serem exibidas no Enhanced Dropdowns.
- `Bootstrap class` - Use isso para definir a largura do campo, se o seu site usar um modelo Bootstrap.
- `Tamanho da sugestão inicial`: Defina a quantidade de linhas a serem sugeridas se o campo sugestão inicial estiver ativado.
- `Comprimento dos caracteres dos valores de pesquisa`: Comprimento dos caracteres dos valores de pesquisa para não passar da caixa de seleção. Veja o tamanho necessário no frontend.

### Avançado

<img src="/images/7.png" width="900px" />

- `Eval options`: Código PHP a ser executado para alterar as opções do elemento. Seu código é chamado repetidamente, uma vez para cada opção. Cada opção é um objeto e pode ser referenciada no código eval com a variável $opt. Ele tem duas propriedades que você pode alterar, $opt->value e $opt->text. Você também pode definir $opt->disable como true, o que desativará essa opção em um contexto suspenso (embora ainda funcione como o valor atualmente selecionado durante a edição). Retorne false para remover a opção.

    Este é um recurso extremamente poderoso. Você pode usar $row para obter valores de outros elementos na linha - e para remover uma opção, simplesmente retorne false.

Por exemplo, neste código estou verificando 2 outros elementos que determinam se uma determinada opção deve estar disponível. E eu quero mudar o rótulo dessa mesma opção de outra forma. 

**Código(PHP)**:

```php
    if($opt->value == 1) {
        if( (int) $data['fb_conglomerates___hosp_count_raw'] > 0 && (int) $data['fb_conglomerates___part_of_hospital_system_raw'] <> 2 ){
            return false;
        } else {
            $opt->text = 'Hospital';
        }
    }
 ```  
 
Aqui está um exemplo de uso: se você juntar seu elemento a um campo de data, os valores exibidos estarão no formato MySQL. Ou seja, '7 de dezembro de 2014' seria exibido como '2014-12-07 00:00:00', o que não é muito amigável. Portanto, se você deseja mostrar datas legíveis, use o seguinte código:

**Código(PHP)**:

    $date = new DateTime($opt->text);
    $opt->text =  $date->format('l j F Y');

**Observação** - O código a seguir retornaria apenas a data em inglês. Se você tiver um site multilíngue, use a função JDate (observe o "F" maiúsculo em "Formato"):

**Código(PHP)**:

    $date = new JDate($opt->text);
    $opt->text = $date->Format('l j F Y');
    
**Nota**: isso funcionaria no Joomla 3. Para o Joomla 2.5, use 'toFormat' em vez de 'Format'.
- `Descrição do campo`: Selecione um campo da tabela unida que contém uma descrição adicional. Isso será mostrado ao lado do elemento e será atualizado com o conteúdo relacionado cada vez que o usuário selecionar uma opção diferente.
- `Auto-complete how`: Para junções de preenchimento automático, controla se as opções são todas as entradas que contêm a *string* fornecida, apenas aquelas que começam com a *string* ou aquelas que contêm todas as palavras individualmente.
- `Trim empty concats`: Usado quando você está usando a opção 'data->Or Concat label' com constantes de string, por exemplo <pre>'ref:',{thistable}.field</p.

### Validações 

<img src="/images/8.png" width="900px" />

Para verificar se uma opção está selecionada, adicione uma validação "isnot".

#### Se database join **não** for de seleção múltipla

Adicione um valor padrão à opção "Selecione"
Na validação "isnot" coloque este valor no campo "isnot".

#### Se database join for de seleção múltipla

Na validação "isnot" deixe o campo "isnot" vazio.
