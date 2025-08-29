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
$id = $_GET['value'];
$join_name = $_GET['join_name'];
$join_val_column = $_GET['join_val_column'];
$join_key_column = $_GET['join_key_column'];
$tree_parent_id = $_GET['tree_parent_id'];
$filter_sortedby = isset($_GET['filter_sortedby']) ? $_GET['filter_sortedby'] : 2;
$data_where = $_GET['data_where'];
$concat_val = $_GET['concat_val'];
$rootCategory = $_GET['rootCategory'];
$modalValue = $_GET['valueFromModal'];

$order = $filter_sortedby == 1 ? ' DESC' : ' ASC';
$repeat_join_name = $join_name . '_repeat_' . $tree_parent_id;

// Recebe o obj para acessar o DB
$db = Factory::getDBO();
// Cria novo obj query
$query = $db->getQuery(true);
// // Seleciona identificador e valor
$query->select("{$join_name}." . $db->qn($join_key_column) . ' AS id');
$query->select("{$repeat_join_name}." . $db->qn($tree_parent_id) . ' AS parent');

//if there are {thistable} clauses in concat then replace all of them to the table name
if(preg_match('/{thistable}/', $concat_val)){
	$concat_val = str_replace('{thistable}', $db->qn($join_name), $concat_val);
}

if(isset($concat_val) && !empty($concat_val)){
	$query->select('CONCAT_WS("", ' . $concat_val . ')' . 'AS name');
} else {
	$query->select("{$join_name}." . $db->qn($join_val_column) . 'AS name');
}

//if there is {$my->id} clauses in data-WHERE then replace fot the user id
if(preg_match('/{\$my->id}/', $data_where)){
	$data_where = str_replace('{$my->id}', Factory::getUser()->get('id'), $data_where);
}

//if there are {thistable} clauses in data-WHERE then replace all of them to the table name
if(preg_match('/{thistable}/', $data_where)){
	$data_where = str_replace('{thistable}', $db->qn($join_name), $data_where);
}

// Da tabela $join_name
$query->from($db->qn($join_name) . ' AS ' . $db->qn($join_name));
$query->join('LEFT', $db->qn($repeat_join_name) . " AS {$db->qn($repeat_join_name)} ON {$repeat_join_name}.parent_id = {$join_name}.id");

$query->order('name ASC');

// Salva resultado da query em results
$results = array();

// Não tem id no parametro da url então busca a tabela toda
if(!$id){
	//se for categoria root
	if(isset($rootCategory) && !empty($rootCategory)) {
		$query->where("{$join_name}." . $db->qn('id') . " = " . $db->quote($rootCategory));
	}
	
	if(isset($modalValue) && !empty($modalValue)){
		$query->where($db->qn($join_name) . '.' . $db->qn($join_val_column) . ' LIKE ' . $db->quote(urldecode($modalValue)));
	}

	$order = StringHelper::stristr($data_where, 'ORDER BY');
	if(isset($data_where) && !empty($data_where) && !$order) {
		$query->where($data_where);
	}
	
	if($order) {
		$order = preg_split("/" . preg_quote('order by', "/") . "/i", $order)[1];
		$query->order(trim($order));
	}
	
	// Aonde o valor inicie com $id
	// Aplica a query no obj DB
	$db->setQuery($query);
	//$table recebe toda a tabela
	$table = $db->loadObjectList();
	//se for categoria root então retornar o que foi trago, pois ele é o pai
	if(isset($rootCategory) && !empty($rootCategory)) {
		$results = $table;
	} else {
		if(isset($modalValue) && !empty($modalValue)){
			$results = $table;
		} else {
			$results = getRoots($table);
		}
	}
	
} else {
	// Aonde o valor inicie com $id
	// Aplica a query no obj DB
	$db->setQuery($query);
	$table = $db->loadObjectList();
	$results = getChildren($id, $query, $db, $table, $tree_parent_id, $data_where, $repeat_join_name);
}

function getRoots($tableArray){
	// Array para armazenar raizes
	$roots = array();
	foreach($tableArray as $key => $item){
		if(empty($item->parent)){
			array_push($roots, $item);
			unset($tableArray[$key]);
		}
	}
	foreach($roots as $key => $root){
		foreach($tableArray as $item){
			if($root->id == $item->parent){
				$roots[$key]->children = true;
				$roots[$key]->counter = 0;
				unset($roots[$key]->parent);
				break;
			}
		}
	}
	return $roots;
}

function getChildren($parentId, $query, $db, $tableArray, $tree_parent_id, $data_where, $repeat_join_name) {
	$query->where("{$repeat_join_name}." . $db->qn($tree_parent_id) . ' = '. $parentId);

	$order = StringHelper::stristr($data_where, 'ORDER BY');
	if(isset($data_where) && !empty($data_where) && !$order) {
		$query->where($data_where);
	}
	
	if($order) {
		$order = preg_split("/" . preg_quote('order by', "/") . "/i", $order)[1];
		$query->order(trim($order));
	}
	
	$db->setQuery($query);
	$childreen = $db->loadObjectList();
	foreach($childreen as $key => $child){
		foreach($tableArray as $item){
			if($child->id == $item->parent){
				$childreen[$key]->children = true;
				$childreen[$key]->counter = 0;
				unset($childreen[$key]->parent);
				break;
			}
		}
	}
	return $childreen;
}

// Codifica $results para JSON
echo json_encode($results);