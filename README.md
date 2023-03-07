# Database join element

The database join element is an extremely powerful element. It allows you to look up data in another database table and to pre-populate a radio list or drop down list with the data returned from the look up. For example, you could easily make a drop-down list containing all of your Joomla articles, or a list of countries.

## Contents
  - [Options](#options)
  - [Data](#data)
    - [Or Concat label examples](#or-concat-label-examples)
  - [Data - where](#data-where)
    - [Notes on using AJAX Update](#notes-on-using-ajax-update)
  - [Please select](#please-select)
  - [Add option in front end](#add-option-in-front-end)
  - [Layout](#layout)
  - [Advanced](#advanced)
  - [Validation](#validation)
      - [If dbjoin is not multiselect](#if-dbjoin-is-not-multiselect)
      - [If dbjoin is multiselect](#if-dbjoin-is-multiselect) 
  
  ### Options
  
  <img src="/images/9.png" width="900px" />
  
 - `Eval defaut`: Should the default value be evaluated as a PHP expression. Element default examples.
    
 - `Default`: The default value to select when showing a new form.
    
 - `Hidden`: Is the element shown on the form as a hidden field.

### Data

<img src="/images/10.png" width="900px" />
<img src="/images/10b.png" width="900px" />

- `Render as`: If not hidden do we render the element as a:
   - `radio list`
   - `treeview`
   - `multiple treeview/checkbox`
   - `Multi select dropdown`

- `Connection`: The Fabrik connection that contains the database table whose data we want to look up to create the list.

**Note**: Fabrik can not join across connections, so the selected connection must be the same as the list's connection!

- `Table`: The database table that contains the lookup data (populated once a connection has been selected).
    
- `Value`: In the form, this element's value is used as the dropdown's value. It is this value that is recorded in the database. Must be a unique value in the joined table, usually the Primary Key

- `Label`: The database table field to use as the label for each of the list options.

- `Parent`: Select the element to represent the parent of the nodes tree.

- `Root category`: Indicate the element that will be the root of the category tree

- `Style`: Select the field's display style. You can set tree view, autocomplete or both views. See the use of this item in the figure below:

<img src="/images/9pt.png" width="900px" />

- `List synchronicity`: Synchronization of the two lists by the name of their fields.

- `Or Concat label`: Alternatively you can select multiple fields from the database table by supplying a mySQL concat string e.g.

    #### Or Concat label examples

    **Code (Text)**:

    ```
      lastname, ' ', firstname
    ```

    If your fields contain NULL values you would need to convert these to empty strings. 

    **Code (Text)**:

    ```
      ISNULL(FirstName,''),'',ISNULL(LastName,'')
    ```

    If you wish to set a label from a data value that is not an available placeholder, you can use MySQL Concat to retrieve the value by embedding a subquery within the CONTACT Label field:

    **Code (Text)**:

    ```
      (SELECT `column_containing_desired_value` FROM other_table WHERE `id` = {thistable}.field_containing_foreign_key)
    ```

    When concatenating dates, please be aware that they will be returned as the GMT date, without your Joomla timezone applied to them, To set them to the correct timezone you can do the following (setting the timezone offset to +2 hours)

    **Code (SQL)**:

    ```sql
      DATE_FORMAT(CONVERT_TZ(gs_list_talks.talk_date,'+00:00','+2:00'), '%d-%m-%Y'),' - ',gs_list_talks.talk_name
    ```

    If the label of your dbjoin is a dbjoin value itself get it's label with

    **Code (SQL)**:

    ```sql
     (SELECT name FROM table2 WHERE table2.id = {thistable}.element)
    ```
- `Initial Suggest`: By clicking on the selection box, a suggestion of the data present in this element will be displayed.

- `Tags`: Performs the operation of this plugin as tags. Applicable to Treeview / Auto-complete and Multiple Treeview / Checkbox.

### Data-where

<img src="/images/11.png" width="900px" />

- ` Hide linked items`:

- `Joins where and/or order by statement (SQL)`: An SQL Select "Where" clause which filters the returned data. For example, to show only records with published = 1:

  **Code (SQL)**:

  ```sql
    WHERE `published` = 1
  ```

  Or to show only a set of users who belong to the group id 14:

  **Code (SQL)**:

  ```sql
    WHERE {thistable}.`username`
      IN ( SELECT jos_users.username FROM jos_users, jos_user_usergroup_map
          WHERE jos_users.id = jos_user_usergroup_map.user_id
          AND jos_user_usergroup_map.group_id = 14)
  ```

  You can also add an ORDER BY to this

  **Code (SQL)**:

  ```sql
     WHERE {thistable}.published = '1' ORDER BY {thistable}.somefield ASC
  ```

  If you need to add an order by but don't need a WHERE clause, you can just use some clause which always returns true, like ...

  **Code (SQL)**:

  ```sql
     WHERE 1=1 ORDER BY {thistable}.somefield ASC
  ```

  Use the placeholder {thistable} to reference the table you are joining, rather than the actual table name. This is because if you have multiple joins to the same table, Fabrik uses aliases to differentiate the joins, like "SELECT yourtable AS yourtable_0", and there is no way of knowing which alias a given join will have. So Fabrik will replace {thistable} with the appropriate alias.

- `Apply where to`: Select which user view level will have the join where statement applied to them.
    
- `Apply where when`: When should the where filter be applied to the database join's element's query.

- `AJAX Update`: If you use element placeholders in your WHERE statement, enable this to force the fiter to update when you change any of the referring elements. Without having AJAX update on, the filter is based on the value of the referred to placeholder on load. If that placeholder is empty you may not get the results you want.
  - Ajax update is applied based on the setting in "Apply where when"

  - Example. With AJAX Update

  If I have a table of zip codes by county and I want to present only the zip codes within a selected county {that county is in element "table_name___selected_county" then this code will present only those zipcodes from that county.
  
  **Code (SQL)**:
  
  ```sql
    WHERE county = '{table_name___selected_county_raw}'
  ```
 - Don't forget the raw....
   **Note**: In this simple example it might be easier to use a cascading dropdown.

#### Notes on using AJAX Update

- One of the challenges of AJAX update is you may need to 'fire' the event that causes the dbjoin to be populated on page load. The 'controlling' element is not 'changed' on load so the AJAX update never fires to populate the dropdown. If the first user step is to populate/choose something in the controlling element then the change event will fire and this dbjoin element will be populated.
    
- However, perhaps you want the "controlling" element to be set to default on load. That means that, on load, the controlling element is set to a default value that the user need not select, so no change event is triggered and the dbjoin will not populate. The user would be required to change the 'default' value of the controlling element - which defeats the purpose of having a default.

- The AJAX default (see below) can be used, in some cases, to set the default for the dbjoin, but if you don't want a default value, but you do want the (filtered) list to be populated, this would require the user to deselect and re-select the value in the controlling element.

- What you can do is fire a change event for the controlling element on load of the dbjoin element. Example:
    
 - If the dbjoin field you want to populate is "table___dbjoin" and the controlling field is "table___controlling" then the following code will cause fire a 'change' event for the controlling field on form load. This will cause the dbjoin field to populate as if the user had changed the controlling field.

- Add "onLoad" javascript event to the "table___dbjoin" element (really it does not matter what element you use, just so the element is loaded so the onload java is fired).
    
 - In the javascript box add the following. Note: modified to use jQuery instead of mootools. bg

   **Code (Javascript)**:

    ```javascript
        loadDBList(this);
    ```

 - This will call a function in the form_x.js file (where _x is the form number). That function should be:

   **Code (Javascript)**:

    ```javascript
        function loadDBList(el) {
            var usedID = jQuery('#table___controlling' );
            usedID[0].fireEvent('change');
        }
     ```

- This will cause a 'change' event of the controlling element just as if the user had changed it - so the dbjoin element will be populated. If you set the default in the controlling element, then the dbjoin will be filtered by the default value.
    
- If the controlling field and dbjoin field are in a repeated group - you will need to modify the code to account for the _x added onto the field name in the repeated group. The code is then.


  **Code (javaScript):**

    ```javascript
        function loadDBList(el) {
            var repeat = el.getRepeatNum();
            var usedID = jQuery('table___controlling' + repeat);
            usedID[0].fireEvent('change');
        }
     ```
      
- Slightly more elegant version. If you call the javascript from the "controlling" element, you can avoid some of the hassle of building the element name. This is particularly nice if you are working in repeated groups where you need to deal with repeatNum.

  **Code (javaScript):**

    ```javascript
       function loadStateList(el) {
          var elementName = '#' + el['strElement'];
          var usedID = jQuery(elementName);
          usedID[0].fireEvent('change');
       }
     ```
  
  Or
  
  **Code (JavaScript)**:

    ```javascript
       function loadStateList(el) {
          var elementName = '#' + el['strElement'];
          var usedID = jQuery(elementName);
          usedID[0].fireEvent('change');
       }
    ```
  
 In this case el contains the element name in ['strElement']. You can add the "#" on and fire the event.
  
  **Note**: Often cascading drop downs will be less hassle - but they may not work in all cases. 

- `Distinct for group_concat command`: 
If so the query for this element returns the values using DISTINCT in the SQL group_concat command. If not, the returned values will possibly be repeated.

- `Filter Where`: - OPTIONAL - similar to "Joins where statement", but adds a where clause to the query used to build the list of options when this element is used as a list filter. Currently only applied if you are using the "Show All" method for your filter options, whereby all rows from the joined table are included in the filter list. Do not prefix this with WHERE, AND, OR, etc. So for instance, to restrict your dropdown filter to only those rows with a field called show_in_filter set to 1, you would use:

   **Code (SQL)**:

    ```sql
     {thistable}.show_in_filter = '1'
    ```
  
 Tip: If you are joining a list that has an element that stores a view_level, you can filter the available drop-down options for the logged in user based on the view_level stored in that element of your joined list.

The example query would look like this:

**Código(SQL)**:
  ```sql
      {thistable}.view_level IN (SELECT DISTINCT `#__viewlevels`.`id`
      FROM #__user_usergroup_map
      LEFT JOIN #__viewlevels ON REPLACE(REPLACE(rules,'[',','),']',',') LIKE CONCAT('%,',`group_id`,',%')
      WHERE user_id ='{$my->id}')
   ```

In the above example, the {thistable}.view_level is the element of your lists element that stores the Joomla viewlevels id. The query references the Joomla viewlevels table and the Joomla user_usergroup_map table to determine which records in the joined table match the current logged in user's authorized view levels. This removes from the drop-down of the database join's filter, any records that the user is not authorized to see.

### Please select

<img src="/images/13.png" width="900px" />

- `Show please select`: If set to render as a dropdown you can toggle whether a please select option is included in the list. Does not effect radio / checkbox lists.

- `Value of please select option`: The text to record in the database if no option selected from the element. Defaults to .
    
- `Label of please select option`: The label to show for the 'Please select' option - if none entered this defaults to 'Please select'. To modify the label shown in the dropdown filter (default "All") append it with ::, so:
    Please select a city::Show all cities
    
- `Placeholder`: HTML5 placeholder for autocomplete field.

### Add option in front end

<img src="/images/16.png" width="900px" />

If you have created a Fabrik table pointing to the database table you selected for this database join element then you can decide if you want your users to be able to add records into that form. The element will then appear with an "add" button like this:


- Clicking on "Add" will open an AJAX Fabrik form as such:

<img src="/images/14.png" width="900px" />

- Entering Holland and pressing "Save" will post the form via AJAX to the Fabrik form processing code. Once processed the pop-up window will close and your database join element will be updated to contain.

<img src="/images/15.png" width="900px" />

- `Popup form`: Select the form that corresponds to the database table the join is connected to. This is the form that is loaded in the popup window when the "add" button is pressed.
    
- `Add option in front end`: If a 'Popup form' selected, then an add button is added to the element. When clicked on this will open a form to add in new records.
   
- `Open in a blank page`: If 'Yes' then open the form in a new tab.

- `Popup window width`: The popup window width in pixels.
    
- `Link to joined record`: Applies when in a detailed view, or if the element's access levels mean that it is set to read only when in a form. If this option is selected, then the read only value is encased in a link. This link points to a detailed view of the record referenced by the database join element's data.
    
- `Front end select`: Provides a button which pops up the joined list, allowing the user to search for the record they want.
    **NOTE**: You must also select a form from the 'Popup form' selection above, even if you are not using the 'Add option in front end'.
    **NOTE**: The element's 'Value' MUST be set to the primary key for this option to work.

### Layout

<img src="/images/17.png" width="900px" />

- `Enhanced Dropdowns`: Enhances Dropdown behaviour using jQuery Chosen (similar to Select2), which e.g. provides a search box if there are more than 10 items and provides deletable widgets for multi-select.
        **Note**: For Enhanced Dropdowns to work you must have turned on Enhanced Dropdowns in the Fabrik Options Forms Tab. You can turn Enhanced Dropdowns off or on globally, or per element. 
    
- `Options per row`: When rendering as a radio or checkbox list, this defines how many radio buttons to show per row, defaults to 1.
    
- `Multi select max` - Work In Progress: experimental feature to allow specifying a maximum number of selections when using Enhanced Dropdowns, in multi-select mode.
    
- `Multilist size`: If the join is rendered as a multi list, then this integer value specifies the list height.
   
- `Auto-complete width`: Value of size attribute for auto-complete input / display field. Only effects visible size if not within a bootstrap template. Otherwise use the "bootstrap class" option.
    
- `Auto-complete rows`: Set the maximum number of auto-complete options to display in the dropdown menu.
    
- `Bootstrap class`: Use this to define the width of the field, if your site uses a Bootstrap template.

- `Initial suggestion size`: Set the number of lines to be suggested if the initial suggestion field is activated.

- `Characters lenght of search values`: Number of characters of search values to not pass of select box. Look the size needed in front-end!


### Advanced

<img src="/images/18.png" width="900px" />

- `Eval options`: PHP code to run to alter the element options. Your code is called repeatedly, once for each option. Each option is an object and can be referenced in the eval code with the variable $opt. It has two properties you can change, $opt->value and $opt->text. You may also set $opt->disable to true, which will disable that option in a dropdown context (although it will still work as the currently selected value when editing). Return false to remove the option.

    This is an extremely powerful feature. You may use $row to get values from other elements in the row - and to remove an option, simply return false. For example, in this code I am checking 2 other elements which determine whether a certain option should be available. And I want to change the label of that same option otherwise.
    
    **CODE(PHP):**
    
```php
    if($opt->value == 1) {
        if( (int) $data['fb_conglomerates___hosp_count_raw'] > 0 && (int) $data['fb_conglomerates___part_of_hospital_system_raw'] <> 2 ){
            return false;
        } else {
            $opt->text = 'Hospital';
        }
    }
```

Here is an example of use: if you join your element to a date field, the values displayed are in MySQL format. That is, 'December 7, 2014' would display as '2014-12-07 00:00:00', which is not very user friendly. So if you want to show readable dates, use the following code:​

 **CODE(PHP):**
 
```php
  $date = new DateTime($opt->text);
  $opt->text =  $date->format('l j F Y');
```

Note: the following code would return only the date in English. If you have a multilingual site, use the JDate function instead (please notice the uppercase "F" in "Format"):

```php
    $date = new JDate($opt->text);
    $opt->text = $date->Format('l j F Y');
```

Note: this would work in Joomla 3. For Joomla 2.5 use 'toFormat' instead of 'Format'.

- `Description field`: Select a field from the joined table that contains an additional description. This will be shown next to the element and will be updated with the related content each time the user selects a different option.

- `Auto-complete how`: For auto-complete joins, controls whether choices are all entries containing the supplied string, or only those starting with the string, or those containing all the words individually.

- `Trim empty concats`: Used when you are using the 'data->Or Concat label' option with string constants, e.g. <pre>'ref:',{thistable}.field</pre>. If this option is off, and {thistable}.ref is an empty value, then Fabrik shows 'ref:' as the concatinated label. By turning this option on the 'ref:' will be stripped from the concat label

### Validation
To check if an option is selectet, add a "is not" validation.

#### If dbjoin is not multiselect

Add a default value to the "Please select" option
In "is not" validation put this value in "is not" field

#### If dbjoin is multiselect 

In "is not" validation leave "is not" field empty 

