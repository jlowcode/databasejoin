# Database join element

The database join element is an extremely powerful element. It allows you to look up data in another database table and to pre-populate a radio list or drop down list with the data returned from the look up. For example, you could easily make a drop-down list containing all of your Joomla articles, or a list of countries.

## Contents
  - [Options](#options)
  - [Data](#data)
  Or Concat label examples
  Data - where
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

