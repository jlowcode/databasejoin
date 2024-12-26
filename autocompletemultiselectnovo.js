var initDivTA = document.getElementsByClassName('multiselect-autocomplete');
if (initDivTA.length) {
    var root_urlStA = jQuery(initDivTA).find('.root_url')[0].value;
    define(['jquery', root_urlStA + '/plugins/fabrik_element/databasejoin/dist/js/select2.min.js'], function ($, select2) {
        autocompleteMultiselectNovo();

        function autocompleteMultiselectNovo() {
        [].forEach.call(document.getElementsByClassName('multiselect-autocomplete'), function (el) {
            const nameElement = $(el).find('.attribute_name')[0].value;
            const elName = $(el).find('.elName-' + nameElement)[0].value;
            const join_name = $(el).find('.join_name-' + nameElement)[0].value;
            const join_val_column = $(el).find('.join_val_column-' + nameElement)[0].value;
            const join_key_column = $(el).find('.join_key_column-' + nameElement)[0].value;
            const databasejoin_linked_items = $(el).find('.databasejoin_linked_items-' + nameElement)[0].value;
            const root_url = $(el).find('.root_url')[0].value;
            
            //If the user set the data-WHERE propriety in the administrator page
            const dataWhereInput = $(el).find('.data_where-' + nameElement);
            const data_where = dataWhereInput[0] ? JSON.parse(dataWhereInput[0].value) : '';

            const concatInput = $(el).find('.concat-' + nameElement);
            const concat_val = concatInput[0] ? JSON.parse(concatInput[0].value) : '';

            //Limit of query results
            const limitQuery = $(el).find('.limit_query-' + nameElement);
            const limit_query = limitQuery[0] ? JSON.parse(limitQuery[0].value) : '';

            this.select2 = el.getElement('select[name*=' + elName + ']');
            
            var cssId = 'select2Css';  // you could encode the css path itself to generate id..
            if (!document.getElementById(cssId)) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.id = cssId;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = root_url + 'plugins/fabrik_element/databasejoin/dist/css/select2.min.css';
                link.media = 'all';
                head.appendChild(link);

            }

            $(this.select2).select2({
                dropdownAutoWidth: true                    
            });

            $(this.select2).select2({
                ajax: {
                    delay: 250,
                    url: root_url + '/plugins/fabrik_element/databasejoin/autocompleteSearch.php',
                    data: function(params){
                    var query = {
                        value: params.term,
                        join_name: join_name,
                        join_val_column: join_val_column,
                        join_key_column: join_key_column,
                        data_where: data_where,
                        concat_val: concat_val,
                        limit_query: limit_query
                    }
                    return query;
                    },

                    processResults: function (data) {
                    // Transforms the top-level key of the response object from 'items' to 'results'
                    return {
                        results: data
                    };
                    }

                },
                minimumInputLength: 1,
                templateSelection: function(item) {return item.text; },
                templateResult:function(item) {return item.text; }
            });
        })
        }

        return {
            autocompleteMultiselectNovo: autocompleteMultiselectNovo
        }
    })
}