<?php

// Identifica tipo de conteúdo como JSON
header('Content-Type: application/json');

// Importando obj necessários para acessar o database
define('_JEXEC', 1);
define('JPATH_BASE', '../../../');
require_once JPATH_BASE . 'includes/defines.php';
require_once JPATH_BASE . 'includes/framework.php';

use Joomla\CMS\Factory;

// Recebe atributos para acessar a tabela
$table_name = $_GET['table_name'];
$attribute_name = $_GET['attribute_name'];

// Recebe o obj para acessar o DB
$db = Factory::getDBO();
// Cria novo obj query
$query = $db->getQuery(true);
// // Seleciona identificador e valor
$query->select($db->quoteName(array($attribute_name), array('id')));
// Da tabela $join_name
$query->from($db->quoteName($table_name . '_repeat_' . $attribute_name));

// Aonde o valor inicie com $id
// Aplica a query no obj DB
$db->setQuery($query);
// Salva resultado da query em results
$table = $db->loadObjectList();

// Codifica $results para JSON
echo json_encode($table);