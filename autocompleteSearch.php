<?php

// Identifica tipo de conteúdo como JSON
header('Content-Type: application/json');


// Importando obj necessários para acessar o database
define('_JEXEC', 1);
define('JPATH_BASE', '../../../');
require_once JPATH_BASE . 'includes/defines.php';
require_once JPATH_BASE . 'includes/framework.php';

use Joomla\CMS\Factory;
use Joomla\String\StringHelper;

// Recebe atributos para acessar a tabela
$value = $_GET['value'];
$join_name = $_GET['join_name'];
$join_val_column = $_GET['join_val_column'];
$join_key_column = $_GET['join_key_column'];
$data_where = $_GET['data_where'];
$concat_val = $_GET['concat_val'];
$limit_val = $_GET['limit_query'];

// Recebe o obj para acessar o DB
$db = Factory::getDBO();
// Cria novo obj query
$query = $db->getQuery(true);
// // Seleciona identificador e valor
$query->select($db->quoteName(array($join_key_column, $join_key_column), array('value', 'id')));

//if there are {thistable} clauses in concat then replace all of them to the table name
if(preg_match('/{thistable}/', $concat_val)){
	$concat_val = str_replace('{thistable}', $db->quoteName($join_name), $concat_val);
}

//if the concat propriety in administrado is set
if(isset($concat_val) && !empty($concat_val)){
	$query->select('CONCAT_WS("", ' . $concat_val . ')' . 'AS text');
	$query->where('CONCAT_WS("", ' . $concat_val . ')' . ' LIKE '. $db->quote('%'.$value.'%'));
} else {
	$query->select($db->quoteName($join_val_column) . 'AS text');
	$query->where($db->quoteName($join_val_column) . ' LIKE '. $db->quote('%'.$value.'%'));
}

//if there is {$my->id} clauses in data-WHERE then replace fot the user id
if(preg_match('/{\$my->id}/', $data_where)){
	$data_where = str_replace('{$my->id}', Factory::getUser()->get('id'), $data_where);
}

//if there are {thistable} clauses in data-WHERE then replace all of them to the table name
if(preg_match('/{thistable}/', $data_where)){
	$data_where = str_replace('{thistable}', $db->quoteName($join_name), $data_where);
}

// Da tabela $join_name
$query->from($db->quoteName($join_name));
// Aonde o valor inicie com $value

$order = StringHelper::stristr($data_where, 'ORDER BY');
if(isset($data_where) && !empty($data_where) && !$order) {
	$query->where($data_where);
}

if($order) {
	$order = preg_split("/" . preg_quote('order by', "/") . "/i", $order)[1];
	$query->order(trim($order));
}

//Limit the query values
$query->setLimit($limit_val);

// Aplica a query no obj DB
$db->setQuery($query);
// Salva resultado da query em results
$results = $db->loadObjectList();
// Codifica $results para JSON
echo json_encode($results);