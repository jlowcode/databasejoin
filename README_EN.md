# Database join element

The database join element is an extremely powerful element. It allows you to look up data in another database table and to pre-populate a radio list or drop down list with the data returned from the look up. For example, you could easily make a drop-down list containing all of your Joomla articles, or a list of countries.

## Contents
  - [Options](#options)
  - [Data](#data)
    - [Or Concat label examples](#or-concat-label-examples)
  - [Data - where](#data-where)
  Notes on using AJAX Update.
  Please select
  Add option in front end
  Layout
  Advanced
  Validation (empty/is not)
  If dbjoin is not multiselect
  If dbjoin is multiselect 
  
  ### Options
  
 - `Eval defaut`: Should the default value be evaluated as a PHP expression. Element default examples.
    
 - `Default`: The default value to select when showing a new form.
    
 - `Hidden`: Is the element shown on the form as a hidden field.

### Data

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

- `Root category`: 

- `Style`:

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

### Data - where

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
