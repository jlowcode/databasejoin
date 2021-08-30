PlgFabrik_ElementDatabasejoin
===============

Plugin element to render list of data looked up from a database table
 Can render as checkboxes, radio buttons, select lists, multi select lists and auto-complete




* Class name: PlgFabrik_ElementDatabasejoin
* Namespace: 
* Parent class: PlgFabrik_ElementList





Properties
----------


### $cn

    protected \FabrikFEModelConnection $cn = null

connection



* Visibility: **protected**


### $i

    protected mixed $i





* Visibility: **protected**


### $joinDb

    protected mixed $joinDb = null





* Visibility: **protected**


### $join

    protected \FabrikFEModelJoin $join = null

Created in getJoin



* Visibility: **protected**


### $sql

    protected array $sql = array()

Simple join query



* Visibility: **protected**


### $optionVals

    protected array $optionVals = array()

Option values



* Visibility: **protected**


### $optionLabels

    protected array $optionLabels = array()

Option values



* Visibility: **protected**


### $linkedForms

    protected array $linkedForms = null

Linked form data



* Visibility: **protected**


### $autocomplete_where

    public string $autocomplete_where = ''

Additional where for auto-complete query



* Visibility: **public**


### $dbname

    protected string $dbname = null

Name of the join db to connect to



* Visibility: **protected**


### $labelParam

    protected string $labelParam = 'join_val_column'

J Parameter name for the field containing the cdd label value



* Visibility: **protected**


### $concatLabelParam

    protected string $concatLabelParam = 'join_val_column_concat'

J Parameter name for the field containing the concat label



* Visibility: **protected**


### $valueFormat

    protected string $valueFormat = 'array'

The value's required format (int/string/json/array/object)



* Visibility: **protected**


### $orderBy

    protected string $orderBy = ''





* Visibility: **protected**


Methods
-------


### getAsField_html

    void PlgFabrik_ElementDatabasejoin::getAsField_html(array $aFields, array $aAsFields, array $opts)

Create the SQL select 'name AS alias' segment for list/form queries



* Visibility: **public**


#### Arguments
* $aFields **array** - &lt;p&gt;&amp;$aFields   array of element names&lt;/p&gt;
* $aAsFields **array** - &lt;p&gt;&amp;$aAsFields array of &#039;name AS alias&#039; fields&lt;/p&gt;
* $opts **array** - &lt;p&gt;options&lt;/p&gt;



### getSlugName

    string PlgFabrik_ElementDatabasejoin::getSlugName(boolean $raw)

Get the field name to use in the list's slug url



* Visibility: **public**


#### Arguments
* $raw **boolean** - &lt;p&gt;Use raw value (true) or label (false)&lt;/p&gt;



### getRawColumn

    string PlgFabrik_ElementDatabasejoin::getRawColumn(boolean $useStep)

Get raw column name



* Visibility: **public**


#### Arguments
* $useStep **boolean** - &lt;p&gt;use step in name&lt;/p&gt;



### filterValueList_Exact

    array PlgFabrik_ElementDatabasejoin::filterValueList_Exact(boolean $normal, string $tableName, string $label, string $id, boolean $incjoin)

Create an array of label/values which will be used to populate the elements filter dropdown
returns only data found in the table you are filtering on



* Visibility: **protected**


#### Arguments
* $normal **boolean** - &lt;p&gt;do we render as a normal filter or as an advanced search filter&lt;/p&gt;
* $tableName **string** - &lt;p&gt;table name to use - defaults to element&#039;s current table&lt;/p&gt;
* $label **string** - &lt;p&gt;field to use, defaults to element name&lt;/p&gt;
* $id **string** - &lt;p&gt;field to use, defaults to element name&lt;/p&gt;
* $incjoin **boolean** - &lt;p&gt;include join&lt;/p&gt;



### getJoinLabelColumn

    string PlgFabrik_ElementDatabasejoin::getJoinLabelColumn(boolean $useStep)

Get the field name to use as the column that contains the join's label data



* Visibility: **public**


#### Arguments
* $useStep **boolean** - &lt;p&gt;use step in element name&lt;/p&gt;



### parseThisTable

    mixed PlgFabrik_ElementDatabasejoin::parseThisTable(string $string, \FabrikTableJoin $join, string $alias)





* Visibility: **protected**


#### Arguments
* $string **string** - &lt;p&gt;Search string&lt;/p&gt;
* $join **FabrikTableJoin** - &lt;p&gt;Join table&lt;/p&gt;
* $alias **string** - &lt;p&gt;Table alias - defaults to the join-&gt;table_join_alias&lt;/p&gt;



### getJoinLabel

    string PlgFabrik_ElementDatabasejoin::getJoinLabel()

Get the join label name



* Visibility: **protected**




### getAsField_csv

    void PlgFabrik_ElementDatabasejoin::getAsField_csv(array $aFields, array $aAsFields, string $table)

Get as field for csv export
can be overwritten in the plugin class - see database join element for example
testing to see that if the aFields are passed by reference do they update the table object?



* Visibility: **public**


#### Arguments
* $aFields **array** - &lt;p&gt;&amp;$aFields   containing field sql&lt;/p&gt;
* $aAsFields **array** - &lt;p&gt;&amp;$aAsFields containing field aliases&lt;/p&gt;
* $table **string** - &lt;p&gt;table name (depreciated)&lt;/p&gt;



### getJoin

    \FabrikTableJoin PlgFabrik_ElementDatabasejoin::getJoin()

Get join row



* Visibility: **protected**




### getJoins

    array PlgFabrik_ElementDatabasejoin::getJoins()

Load this elements joins



* Visibility: **public**




### getJoinsToThisKey

    array PlgFabrik_ElementDatabasejoin::getJoinsToThisKey(\JTable $table)

Get other joins that point to this element



* Visibility: **public**


#### Arguments
* $table **JTable** - &lt;p&gt;&amp;$table Table&lt;/p&gt;



### evalOptions

    mixed PlgFabrik_ElementDatabasejoin::evalOptions(array $opts)

Run any eval'ed option code from element settings



* Visibility: **protected**


#### Arguments
* $opts **array** - &lt;p&gt;array of option objects&lt;/p&gt;



### _getOptionVals

    array PlgFabrik_ElementDatabasejoin::_getOptionVals(array $data, integer $repeatCounter, boolean $incWhere, array $opts)

Get array of option values



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;Data&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;Repeat group counter&lt;/p&gt;
* $incWhere **boolean** - &lt;p&gt;Do we add custom where statement into sql&lt;/p&gt;
* $opts **array** - &lt;p&gt;Additional options passed into buildQuery()&lt;/p&gt;



### emptyConcatString

    boolean PlgFabrik_ElementDatabasejoin::emptyConcatString(string $label)

For fields that use the concat label, it may try to insert constants, but if no
replacement data found then the concatenated constants should be considered as empty



* Visibility: **protected**


#### Arguments
* $label **string** - &lt;p&gt;Concatenate label&lt;/p&gt;



### addSpaceToEmptyLabels

    null PlgFabrik_ElementDatabasejoin::addSpaceToEmptyLabels(array $rows, string $txt)

Fix html validation warning on empty options labels



* Visibility: **private**


#### Arguments
* $rows **array** - &lt;p&gt;&amp;$rows option objects $rows&lt;/p&gt;
* $txt **string** - &lt;p&gt;object label&lt;/p&gt;



### _getOptions

    array PlgFabrik_ElementDatabasejoin::_getOptions(array $data, integer $repeatCounter, boolean $incWhere, array $opts)

Get a list of the HTML options used in the database join drop down / radio buttons



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;From current record (when editing form?)&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;Repeat group counter&lt;/p&gt;
* $incWhere **boolean** - &lt;p&gt;Do we include custom where in query&lt;/p&gt;
* $opts **array** - &lt;p&gt;Additional options passed into _getOptionVals()&lt;/p&gt;



### _getSelectLabel

    string PlgFabrik_ElementDatabasejoin::_getSelectLabel(boolean $filter)

Get select option label



* Visibility: **protected**


#### Arguments
* $filter **boolean** - &lt;p&gt;get alt label for filter, if present using :: splitter&lt;/p&gt;



### showPleaseSelect

    boolean PlgFabrik_ElementDatabasejoin::showPleaseSelect()

Do you add a please select option to the list



* Visibility: **protected**




### mustApplyWhere

    boolean PlgFabrik_ElementDatabasejoin::mustApplyWhere(integer $gid, string $ref)

Check to see if pre-filter should be applied
Kind of an inverse access lookup



* Visibility: **protected**


#### Arguments
* $gid **integer** - &lt;p&gt;group id to check against&lt;/p&gt;
* $ref **string** - &lt;p&gt;for filter&lt;/p&gt;



### buildQuery

    mixed PlgFabrik_ElementDatabasejoin::buildQuery(array $data, boolean $incWhere, array $opts)

Create the sql query used to get the join data



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;data&lt;/p&gt;
* $incWhere **boolean** - &lt;p&gt;include where&lt;/p&gt;
* $opts **array** - &lt;p&gt;query options&lt;/p&gt;



### buildQueryDescription

    void PlgFabrik_ElementDatabasejoin::buildQueryDescription(\JQuery $query, array $data)

Add the description field to the buildQuery select statement



* Visibility: **protected**


#### Arguments
* $query **JQuery** - &lt;p&gt;&amp;$query BuildQuery&lt;/p&gt;
* $data **array** - &lt;p&gt;BuildQuery data&lt;/p&gt;



### getAdditionalQueryFields

    string PlgFabrik_ElementDatabasejoin::getAdditionalQueryFields()

If buildQuery needs additional fields then set them here, used in notes plugin



* Visibility: **protected**




### buildQueryJoin

    string|\JQueryerBuilder PlgFabrik_ElementDatabasejoin::buildQueryJoin(mixed $query)

If buildQuery needs additional joins then set them here, used in notes plugin
$$$ hugh - added new "Additional join statement" option in join element, which now gets
parsed here.  Should probably take the main logic in this, and put it in a helper, as this
is probably something we'll need to do elsewhere.



* Visibility: **protected**


#### Arguments
* $query **mixed** - &lt;p&gt;false to return string, or JQueryBuilder object&lt;/p&gt;



### buildQueryWhere

    string|\JDatabaseQuery PlgFabrik_ElementDatabasejoin::buildQueryWhere(array $data, boolean $incWhere, string $thisTableAlias, array $opts, boolean|\JDatabaseQuery $query)

Create the where part for the query that selects the list options



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;Current row data to use in placeholder replacements&lt;/p&gt;
* $incWhere **boolean** - &lt;p&gt;Should the additional user defined WHERE statement be included&lt;/p&gt;
* $thisTableAlias **string** - &lt;p&gt;Db table alias&lt;/p&gt;
* $opts **array** - &lt;p&gt;Options&lt;/p&gt;
* $query **boolean|JDatabaseQuery** - &lt;p&gt;Append where to JDatabaseQuery object or return string (false)&lt;/p&gt;



### getFullLabelOrConcat

    string PlgFabrik_ElementDatabasejoin::getFullLabelOrConcat()

Get the FULL element name or concat statement used currently in sum calculations



* Visibility: **protected**




### getLabelOrConcatVal

    string PlgFabrik_ElementDatabasejoin::getLabelOrConcatVal()

Get the element name or concat statement used to build the dropdown labels or
table data field



* Visibility: **protected**




### getDb

    \JDatabaseDriver PlgFabrik_ElementDatabasejoin::getDb()

Get the database object



* Visibility: **public**




### getConnection

    object PlgFabrik_ElementDatabasejoin::getConnection()

Get connection



* Visibility: **public**




### connectionParam

    string PlgFabrik_ElementDatabasejoin::connectionParam()

Get the name of the connection parameter



* Visibility: **protected**




### loadConnection

    \FabTable PlgFabrik_ElementDatabasejoin::loadConnection()

Load connection object



* Visibility: **protected**




### getROValue

    string PlgFabrik_ElementDatabasejoin::getROValue(array $data, integer $repeatCounter)

Determines the value for the element in the form view



* Visibility: **public**


#### Arguments
* $data **array** - &lt;p&gt;form data&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;when repeating joined groups we need to know what part of the array to access&lt;/p&gt;



### render

    string PlgFabrik_ElementDatabasejoin::render(array $data, integer $repeatCounter)

Draws the html form element



* Visibility: **public**


#### Arguments
* $data **array** - &lt;p&gt;to pre-populate element with&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;repeat group counter&lt;/p&gt;



### renderFrontEndSelect

    string PlgFabrik_ElementDatabasejoin::renderFrontEndSelect(array $data, string $repeatCounter)

Render the front end select / add buttons in a JLayout file



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;row data in case template override wants it&lt;/p&gt;
* $repeatCounter **string** - &lt;p&gt;repeat count, in case override wants it&lt;/p&gt;



### renderDescription

    void PlgFabrik_ElementDatabasejoin::renderDescription(array $options, array $default)

Add the description to the element's form HTML



* Visibility: **protected**


#### Arguments
* $options **array** - &lt;p&gt;Select options&lt;/p&gt;
* $default **array** - &lt;p&gt;Default values&lt;/p&gt;



### addReadOnlyLinks

    void PlgFabrik_ElementDatabasejoin::addReadOnlyLinks(array $defaultLabels, array $defaultValues)

Add read only links, if option set and related 'add options in front end'
form found.



* Visibility: **protected**


#### Arguments
* $defaultLabels **array** - &lt;p&gt;&amp;$defaultLabels Default labels&lt;/p&gt;
* $defaultValues **array** - &lt;p&gt;Default values&lt;/p&gt;



### popUpFormUrl

    boolean|string PlgFabrik_ElementDatabasejoin::popUpFormUrl()

Build Pop up form URL



* Visibility: **protected**




### renderReadOnlyTrimOptions

    mixed PlgFabrik_ElementDatabasejoin::renderReadOnlyTrimOptions($tmp, $defaultValue)





* Visibility: **protected**


#### Arguments
* $tmp **mixed**
* $defaultValue **mixed**



### renderDropdownList

    void PlgFabrik_ElementDatabasejoin::renderDropdownList(array $data, integer $repeatCounter, array $html, array $tmp, string $defaultValue)

Render dropdown in form



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;Form data&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;Repeat group counter&lt;/p&gt;
* $html **array** - &lt;p&gt;&amp;$html         HTML to assign output to&lt;/p&gt;
* $tmp **array** - &lt;p&gt;List of value/label objects&lt;/p&gt;
* $defaultValue **string** - &lt;p&gt;Default value&lt;/p&gt;



### renderRadioList

    void PlgFabrik_ElementDatabasejoin::renderRadioList(array $data, integer $repeatCounter, array $html, array $tmp, string $defaultValue)

Render radio buttons in form



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;Form data&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;Repeat group counter&lt;/p&gt;
* $html **array** - &lt;p&gt;&amp;$html         HTML to assign output to&lt;/p&gt;
* $tmp **array** - &lt;p&gt;List of value/label objects&lt;/p&gt;
* $defaultValue **string** - &lt;p&gt;Default value&lt;/p&gt;



### renderAutoComplete

    void PlgFabrik_ElementDatabasejoin::renderAutoComplete(array $data, integer $repeatCounter, array $html, array $default)

Render auto-complete in form



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;Form data&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;Repeat group counter&lt;/p&gt;
* $html **array** - &lt;p&gt;&amp;$html         HTML to assign output to&lt;/p&gt;
* $default **array** - &lt;p&gt;Default values&lt;/p&gt;



### renderMultiSelectAutoComplete

    void PlgFabrik_ElementDatabasejoin::renderMultiSelectAutoComplete(array $data, integer $repeatCounter, array $html, array $default)

Render auto-complete in form



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;Form data&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;Repeat group counter&lt;/p&gt;
* $html **array** - &lt;p&gt;&amp;$html         HTML to assign output to&lt;/p&gt;
* $default **array** - &lt;p&gt;Default values&lt;/p&gt;



### renderMultiSelectList

    void PlgFabrik_ElementDatabasejoin::renderMultiSelectList(array $data, integer $repeatCounter, array $html, array $tmp, array $default)

Render multi-select list in form



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;Form data&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;Repeat group counter&lt;/p&gt;
* $html **array** - &lt;p&gt;&amp;$html         HTML to assign output to&lt;/p&gt;
* $tmp **array** - &lt;p&gt;List of value/label objects&lt;/p&gt;
* $default **array** - &lt;p&gt;Default values&lt;/p&gt;



### renderCheckBoxList

    void PlgFabrik_ElementDatabasejoin::renderCheckBoxList(array $data, integer $repeatCounter, array $html, array $tmp, array $default)

Render checkbox list in form



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;Form data&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;Repeat group counter&lt;/p&gt;
* $html **array** - &lt;p&gt;&amp;$html         HTML to assign output to&lt;/p&gt;
* $tmp **array** - &lt;p&gt;List of value/label objects&lt;/p&gt;
* $default **array** - &lt;p&gt;Default values - the lookup table&#039;s primary key values&lt;/p&gt;



### getValueFullName

    string PlgFabrik_ElementDatabasejoin::getValueFullName(array $opts)

Called from within function getValue
needed so we can append _raw to the name for elements such as db joins



* Visibility: **protected**


#### Arguments
* $opts **array** - &lt;p&gt;Options&lt;/p&gt;



### getTitlePart

    string PlgFabrik_ElementDatabasejoin::getTitlePart(array $data, integer $repeatCounter, array $opts)

Determines the label used for the browser title
in the form/detail views



* Visibility: **public**


#### Arguments
* $data **array** - &lt;p&gt;Form data&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;When repeating joined groups we need to know what part of the array to access&lt;/p&gt;
* $opts **array** - &lt;p&gt;Options&lt;/p&gt;



### getLinkedForms

    array PlgFabrik_ElementDatabasejoin::getLinkedForms()

Get an array of potential forms that will add data to the db joins table.

Used for add in front end

* Visibility: **protected**




### getFieldDescription

    string PlgFabrik_ElementDatabasejoin::getFieldDescription()

Get database field description



* Visibility: **public**




### getEmailValue

    string PlgFabrik_ElementDatabasejoin::getEmailValue(mixed $value, array $data, integer $repeatCounter)

Used to format the data when shown in the form's email



* Visibility: **public**


#### Arguments
* $value **mixed** - &lt;p&gt;Element&#039;s data&lt;/p&gt;
* $data **array** - &lt;p&gt;Form records data&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;Repeat group counter&lt;/p&gt;



### renderListData

    string PlgFabrik_ElementDatabasejoin::renderListData(string $data, \stdClass $thisRow, array $opts)

Shows the data formatted for the list view



* Visibility: **public**


#### Arguments
* $data **string** - &lt;p&gt;Elements data&lt;/p&gt;
* $thisRow **stdClass** - &lt;p&gt;&amp;$thisRow All the data in the lists current row&lt;/p&gt;
* $opts **array** - &lt;p&gt;Rendering options&lt;/p&gt;



### listPreformat

    void PlgFabrik_ElementDatabasejoin::listPreformat(array $data, array $thisRow)

Optionally pre-format list data before rendering to <ul>



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;&amp;$data   Element Data&lt;/p&gt;
* $thisRow **array** - &lt;p&gt;Row data&lt;/p&gt;



### modHTMLId

    void PlgFabrik_ElementDatabasejoin::modHTMLId(string $id)

Used in things like date when its id is suffixed with _cal
called from getLabel();



* Visibility: **protected**


#### Arguments
* $id **string** - &lt;p&gt;&amp;$id Initial id&lt;/p&gt;



### getFilterCondition

    mixed PlgFabrik_ElementDatabasejoin::getFilterCondition()

TESTING for JFQ, issue with auto-complete filters using 'contains' instead of '='
Need to override this for joins, make sure exact match is applied
return  string



* Visibility: **protected**




### getDefaultFilterVal

    string PlgFabrik_ElementDatabasejoin::getDefaultFilterVal(boolean $normal, integer $counter)

Get the default value for the list filter



* Visibility: **protected**


#### Arguments
* $normal **boolean** - &lt;p&gt;is the filter a normal or advanced filter&lt;/p&gt;
* $counter **integer** - &lt;p&gt;filter order&lt;/p&gt;



### getFilter

    string PlgFabrik_ElementDatabasejoin::getFilter(integer $counter, boolean $normal, $container)

Get the list filter for the element



* Visibility: **public**


#### Arguments
* $counter **integer** - &lt;p&gt;filter order&lt;/p&gt;
* $normal **boolean** - &lt;p&gt;do we render as a normal filter or as an advanced search filter
if normal include the hidden fields as well (default true, use false for advanced filter
rendering)&lt;/p&gt;
* $container **mixed**



### filterHiddenFields

    string PlgFabrik_ElementDatabasejoin::filterHiddenFields()

Get the hidden fields used to store additional filter information



* Visibility: **protected**




### filterSelectLabel

    string PlgFabrik_ElementDatabasejoin::filterSelectLabel()

Get drop-down filter select label



* Visibility: **protected**




### buildFilterJoin

    string PlgFabrik_ElementDatabasejoin::buildFilterJoin()

If filterValueList_Exact incjoin value = false, then this method is called
to ensure that the query produced in filterValueList_Exact contains at least the database join element's
join



* Visibility: **protected**




### filterValueList_All

    array PlgFabrik_ElementDatabasejoin::filterValueList_All(boolean $normal, string $tableName, string $label, string $id, boolean $incjoin)

Create an array of label/values which will be used to populate the elements filter dropdown
returns all possible options



* Visibility: **protected**


#### Arguments
* $normal **boolean** - &lt;p&gt;do we render as a normal filter or as an advanced search filter&lt;/p&gt;
* $tableName **string** - &lt;p&gt;table name to use - defaults to element&#039;s current table&lt;/p&gt;
* $label **string** - &lt;p&gt;field to use, defaults to element name&lt;/p&gt;
* $id **string** - &lt;p&gt;field to use, defaults to element name&lt;/p&gt;
* $incjoin **boolean** - &lt;p&gt;include join&lt;/p&gt;



### getOrderBy

    string PlgFabrik_ElementDatabasejoin::getOrderBy(string $view, boolean|\JDatabaseQuery $query)

Get options order by



* Visibility: **protected**


#### Arguments
* $view **string** - &lt;p&gt;View mode &#039;&#039; or &#039;filter&#039;&lt;/p&gt;
* $query **boolean|JDatabaseQuery** - &lt;p&gt;Set to false to return a string&lt;/p&gt;



### getJoinValueColumn

    string PlgFabrik_ElementDatabasejoin::getJoinValueColumn()

Get the column name used for the value part of the db join element



* Visibility: **protected**




### getJoinValueFieldName

    string PlgFabrik_ElementDatabasejoin::getJoinValueFieldName()

Get the field name for the joined tables' pk



* Visibility: **protected**




### getFilterValue

    array PlgFabrik_ElementDatabasejoin::getFilterValue(string $value, string $condition, string $eval)

Builds an array containing the filters value and condition



* Visibility: **public**


#### Arguments
* $value **string** - &lt;p&gt;Initial value&lt;/p&gt;
* $condition **string** - &lt;p&gt;Initial $condition&lt;/p&gt;
* $eval **string** - &lt;p&gt;How the value should be handled&lt;/p&gt;



### getFilterQuery

    string PlgFabrik_ElementDatabasejoin::getFilterQuery(string $key, string $condition, string $value, string $originalValue, string $type, string $evalFilter)

Build the filter query for the given element.

Can be overwritten in plugin - e.g. see checkbox element which checks for partial matches

* Visibility: **public**


#### Arguments
* $key **string** - &lt;p&gt;element name in format &lt;code&gt;tablename&lt;/code&gt;.&lt;code&gt;elementname&lt;/code&gt;&lt;/p&gt;
* $condition **string** - &lt;p&gt;=/like etc.&lt;/p&gt;
* $value **string** - &lt;p&gt;search string - already quoted if specified in filter array options&lt;/p&gt;
* $originalValue **string** - &lt;p&gt;original filter value without quotes or %&#039;s applied&lt;/p&gt;
* $type **string** - &lt;p&gt;filter type advanced/normal/prefilter/search/querystring/searchall&lt;/p&gt;
* $evalFilter **string** - &lt;p&gt;evaled&lt;/p&gt;



### checkboxRows

    array PlgFabrik_ElementDatabasejoin::checkboxRows(string $groupBy, string $condition, string $value, string $where, integer $offset, integer $limit)

Helper function to get an array of data from the checkbox joined db table.

Used for working out the filter sql and filter dropdown contents

* Visibility: **protected**


#### Arguments
* $groupBy **string** - &lt;p&gt;Field name to key the results on - avoids duplicates&lt;/p&gt;
* $condition **string** - &lt;p&gt;If supplied then filters the list (must then supply $where and $value)&lt;/p&gt;
* $value **string** - &lt;p&gt;If supplied then filters the list (must then supply $where and $condition)&lt;/p&gt;
* $where **string** - &lt;p&gt;If supplied then filters the list (must then supply $value and $condition)&lt;/p&gt;
* $offset **integer** - &lt;p&gt;Query offset - default 0&lt;/p&gt;
* $limit **integer** - &lt;p&gt;Query limit - default 0&lt;/p&gt;



### getFilterFullName

    string PlgFabrik_ElementDatabasejoin::getFilterFullName()

Used for the name of the filter fields
Over written here as we need to get the label field for field searches



* Visibility: **public**




### getLabelParamVal

    string PlgFabrik_ElementDatabasejoin::getLabelParamVal()

Get the label parameter's value



* Visibility: **protected**




### getFilterLabel

    string PlgFabrik_ElementDatabasejoin::getFilterLabel(string $rawval)

Not used



* Visibility: **public**


#### Arguments
* $rawval **string** - &lt;p&gt;raw value&lt;/p&gt;



### dataConsideredEmpty

    boolean PlgFabrik_ElementDatabasejoin::dataConsideredEmpty(array $data, integer $repeatCounter)

Does the element consider the data to be empty
Used in isempty validation rule



* Visibility: **public**


#### Arguments
* $data **array** - &lt;p&gt;data to test against&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;repeat group #&lt;/p&gt;



### elementJavascript

    array PlgFabrik_ElementDatabasejoin::elementJavascript(integer $repeatCounter)

Returns javascript which creates an instance of the class defined in formJavascriptClass()



* Visibility: **public**


#### Arguments
* $repeatCounter **integer** - &lt;p&gt;Repeat group counter&lt;/p&gt;



### containerClass

    string PlgFabrik_ElementDatabasejoin::containerClass(object $element)

Get the class name for the element wrapping dom object



* Visibility: **protected**


#### Arguments
* $element **object** - &lt;p&gt;element model item&lt;/p&gt;



### jsJLayouts

    void PlgFabrik_ElementDatabasejoin::jsJLayouts()

Add any jsJLayout templates to Fabrik.jLayouts js object.



* Visibility: **public**




### elementJavascriptOpts

    array PlgFabrik_ElementDatabasejoin::elementJavascriptOpts(integer $repeatCounter)

Get element JS options



* Visibility: **protected**


#### Arguments
* $repeatCounter **integer** - &lt;p&gt;Group repeat counter&lt;/p&gt;



### getChangeEvent

    string PlgFabrik_ElementDatabasejoin::getChangeEvent()

Return JS event required to trigger a 'change'



* Visibility: **public**




### elementJavascriptJoinOpts

    void PlgFabrik_ElementDatabasejoin::elementJavascriptJoinOpts(object $opts)

Get some common element JS options



* Visibility: **protected**


#### Arguments
* $opts **object** - &lt;p&gt;&amp;$opts Options&lt;/p&gt;



### onAjax_getOptions

    void PlgFabrik_ElementDatabasejoin::onAjax_getOptions()

Gets the options for the drop down - used in package when forms update



* Visibility: **public**




### onSave

    boolean PlgFabrik_ElementDatabasejoin::onSave(array $data)

Called when the element is saved



* Visibility: **public**


#### Arguments
* $data **array** - &lt;p&gt;posted element save data&lt;/p&gt;



### getDbName

    string PlgFabrik_ElementDatabasejoin::getDbName()

Get the join to database name



* Visibility: **protected**




### updateFabrikJoins

    void PlgFabrik_ElementDatabasejoin::updateFabrikJoins(array $data, string $tableJoin, string $keyCol, string $label)

On save of element, update its jos_fabrik_joins record and any descendants join record



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;data&lt;/p&gt;
* $tableJoin **string** - &lt;p&gt;join table&lt;/p&gt;
* $keyCol **string** - &lt;p&gt;key column&lt;/p&gt;
* $label **string** - &lt;p&gt;label&lt;/p&gt;



### updateFabrikJoin

    \FabTableJoin PlgFabrik_ElementDatabasejoin::updateFabrikJoin(array $data, integer $elementId, string $tableJoin, string $keyCol, string $label)

Update an elements jos_fabrik_joins record



* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;data&lt;/p&gt;
* $elementId **integer** - &lt;p&gt;element id&lt;/p&gt;
* $tableJoin **string** - &lt;p&gt;join table&lt;/p&gt;
* $keyCol **string** - &lt;p&gt;key&lt;/p&gt;
* $label **string** - &lt;p&gt;label&lt;/p&gt;



### onRemove

    boolean PlgFabrik_ElementDatabasejoin::onRemove(boolean $drop)

Called from admin element controller when element is removed



* Visibility: **public**


#### Arguments
* $drop **boolean** - &lt;p&gt;has the user elected to drop column?&lt;/p&gt;



### getValidationWatchElements

    array PlgFabrik_ElementDatabasejoin::getValidationWatchElements(integer $repeatCounter)

Get an array of element html ids and their corresponding
js events which trigger a validation.

Examples of where this would be overwritten include timedate element with time field enabled

* Visibility: **public**


#### Arguments
* $repeatCounter **integer** - &lt;p&gt;repeat group counter&lt;/p&gt;



### getLabelForValue

    string PlgFabrik_ElementDatabasejoin::getLabelForValue(string $v, string $defaultLabel, boolean $forceCheck)

Used by elements with sub-options, given a value, return its label



* Visibility: **public**


#### Arguments
* $v **string** - &lt;p&gt;Value&lt;/p&gt;
* $defaultLabel **string** - &lt;p&gt;Default label&lt;/p&gt;
* $forceCheck **boolean** - &lt;p&gt;Force check even if $v === $defaultLabel&lt;/p&gt;



### getDefaultFilterCondition

    string PlgFabrik_ElementDatabasejoin::getDefaultFilterCondition()

If no filter condition supplied (either via querystring or in posted filter data
return the most appropriate filter option for the element.



* Visibility: **public**




### inJDb

    boolean PlgFabrik_ElementDatabasejoin::inJDb()

Is the element's cnn the same as the main Joomla db



* Visibility: **protected**




### cacheAutoCompleteOptions

    string PlgFabrik_ElementDatabasejoin::cacheAutoCompleteOptions(\PlgFabrik_ElementDatabasejoin $elementModel, string $search, array $opts)

Cache method to populate auto-complete options



* Visibility: **public**
* This method is **static**.


#### Arguments
* $elementModel **[PlgFabrik_ElementDatabasejoin](PlgFabrik_ElementDatabasejoin.md)** - &lt;p&gt;element model&lt;/p&gt;
* $search **string** - &lt;p&gt;search string&lt;/p&gt;
* $opts **array** - &lt;p&gt;options, &#039;label&#039; =&gt; field to use for label (db join)&lt;/p&gt;



### _autocompleteWhere

    string PlgFabrik_ElementDatabasejoin::_autocompleteWhere(string $how, string $field, string $search)

Get the auto-complete Where clause based on the parameter



* Visibility: **private**


#### Arguments
* $how **string** - &lt;p&gt;Dbjoin_autocomplete_how setting - contains, words, starts_with&lt;/p&gt;
* $field **string** - &lt;p&gt;Field&lt;/p&gt;
* $search **string** - &lt;p&gt;Search string&lt;/p&gt;



### getOrderByName

    string PlgFabrik_ElementDatabasejoin::getOrderByName()

Get the name of the field to order the table data by
can be overwritten in plugin class - but not currently done so



* Visibility: **public**




### selfDiagnose

    string PlgFabrik_ElementDatabasejoin::selfDiagnose()

PN 19-Jun-11: Construct an element error string.



* Visibility: **public**




### isJoin

    boolean PlgFabrik_ElementDatabasejoin::isJoin()

Does the element store its data in a join table (1:n)



* Visibility: **public**




### buildQueryElementConcat

    string PlgFabrik_ElementDatabasejoin::buildQueryElementConcat(string $jKey, boolean $addAs)

Build the sub query which is used when merging in in repeat element
records from their joined table into the one field.

Overwritten in database join element to allow for building the join
to the table containing the stored values required labels

* Visibility: **public**


#### Arguments
* $jKey **string** - &lt;p&gt;key&lt;/p&gt;
* $addAs **boolean** - &lt;p&gt;add &#039;AS&#039; to select sub query&lt;/p&gt;



### buildQueryParentKey

    string PlgFabrik_ElementDatabasejoin::buildQueryParentKey()

Get the parent key element name



* Visibility: **protected**




### buildQueryElementConcatId

    string PlgFabrik_ElementDatabasejoin::buildQueryElementConcatId()

Build the sub query which is used when merging in
repeat element records from their joined table into the one field.

Overwritten in database join element to allow for building
the join to the table containing the stored values required ids

* Visibility: **protected**




### getJoinDataNames

    array PlgFabrik_ElementDatabasejoin::getJoinDataNames()

Used in form model setJoinData.



* Visibility: **public**




### getJoinRepeatCount

    integer PlgFabrik_ElementDatabasejoin::getJoinRepeatCount(array $data, object $oJoin)

When the element is a repeatable join (e.g. db join checkbox) then figure out how many
records have been selected



* Visibility: **public**


#### Arguments
* $data **array** - &lt;p&gt;data&lt;/p&gt;
* $oJoin **object** - &lt;p&gt;join model&lt;/p&gt;



### getDisplayType

    string PlgFabrik_ElementDatabasejoin::getDisplayType()

Get the display type (list,checkbox,multiselect etc.)



* Visibility: **protected**




### quoteLabel

    boolean PlgFabrik_ElementDatabasejoin::quoteLabel()

Should the 'label' field be quoted.  Overridden by databasejoin and extended classes,
which may use a CONCAT'ed label which mustn't be quoted.



* Visibility: **protected**




### canIncludeInSearchAll

    boolean PlgFabrik_ElementDatabasejoin::canIncludeInSearchAll(boolean $advancedMode)

Is it possible to include the element in the  Search all query?
true if basic search
true/false if advanced search



* Visibility: **public**


#### Arguments
* $advancedMode **boolean** - &lt;p&gt;Is the list using advanced search&lt;/p&gt;



### dataIsNull

    boolean PlgFabrik_ElementDatabasejoin::dataIsNull(array $data, mixed $val)

Use in list model storeRow() to determine if data should be stored.

Currently only supported for db join elements whose values are default values
avoids casing '' into 0 for int fields

* Visibility: **public**


#### Arguments
* $data **array** - &lt;p&gt;Data being inserted&lt;/p&gt;
* $val **mixed** - &lt;p&gt;Element value to insert into table&lt;/p&gt;



### multiOptionTargetIds

    array|boolean PlgFabrik_ElementDatabasejoin::multiOptionTargetIds(array $data, integer $repeatCounter)

When rendered as a multi-select / checkbox getValue() returns the id for the x-ref table.

This method gets the ids for the records in the x-ref target table.

* Visibility: **protected**


#### Arguments
* $data **array** - &lt;p&gt;Form data&lt;/p&gt;
* $repeatCounter **integer** - &lt;p&gt;Repeat group counter&lt;/p&gt;



### getValuesToEncrypt

    void PlgFabrik_ElementDatabasejoin::getValuesToEncrypt(array $values, array $data, integer $c)

Called by form model to build an array of values to encrypt



* Visibility: **public**


#### Arguments
* $values **array** - &lt;p&gt;&amp;$values Previously encrypted values&lt;/p&gt;
* $data **array** - &lt;p&gt;Form data&lt;/p&gt;
* $c **integer** - &lt;p&gt;Repeat group counter&lt;/p&gt;



### onDeleteRows

    mixed PlgFabrik_ElementDatabasejoin::onDeleteRows(array $groups)

Trigger called when a row is deleted, if a join (multiselect/checbox) then remove
rows from _repeat_foo table.



* Visibility: **public**


#### Arguments
* $groups **array** - &lt;p&gt;grouped data of rows to delete&lt;/p&gt;


