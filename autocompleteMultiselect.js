define(['jquery'], function ($) {
    //Catch all elements with class, and apply function to ip
    [].forEach.call(document.getElementsByClassName('autocomplete-input'), function (el) {
        let hiddenInput = document.createElement('input'),      //create the input to save the selected data
            mainInput = document.createElement('input'),      //create main input to select elements
            dataList = document.createElement('datalist'),   //dropdown
            tags = [];                                   // array to save the selected elements
        const selectElement = el.querySelector('select');           // Select element to save the selected elements
        const selectOptions = selectElement.children;
        const dataListId = selectElement.id + '_dataList';
        const nameElement = $(el).find('.attribute_name')[0].value;
        const join_name = $(el).find('.join_name-' + nameElement)[0].value;
        const join_val_column = $(el).find('.join_val_column-' + nameElement)[0].value;
        const join_key_column = $(el).find('.join_key_column-' + nameElement)[0].value;
        const root_url = $(el).find('.root_url')[0].value;
        const databasejoin_linked_items = $(el).find('.databasejoin_linked_items-' + nameElement)[0].value;

        //If the user set the data-WHERE propriety in the administrator page
        const dataWhereInput = $(el).find('.data_where-' + nameElement);
        const data_where = dataWhereInput[0] ? JSON.parse(dataWhereInput[0].value) : '';

        const concatInput = $(el).find('.concat-' + nameElement);
        const concat_val = concatInput[0] ? JSON.parse(concatInput[0].value) : '';

        //Limit of query results
        const limitQuery = $(el).find('.limit_query-' + nameElement);
        const limit_query = limitQuery[0] ? JSON.parse(limitQuery[0].value) : '';

        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', el.getAttribute('data-name'));

        mainInput.setAttribute('type', 'text');
        mainInput.setAttribute('list', dataListId);
        mainInput.classList.add('main-input');
        dataList.classList.add('element-list');
        dataList.id = dataListId;

        //event listener to get elements and put in the array
        mainInput.addEventListener('input', function () {
            var val = mainInput.value;
            if (val.length < 2)
                return;
            var found = false;
            //Verifica se o elemento que ele clicou já está adicionado na lista de tags
            tags.forEach(tag => {
                if (tag.text == val) {
                    found = true;
                    return;
                }
            });

            var opts = dataList.childNodes;
            //Se não encontrou o elemento na lista então adiciona uma tag
            if (!found) {
                for (var i = 0; i < opts.length; i++) {
                    if (opts[i].value === val) {
                        addTag(opts[i].value, opts[i].getAttribute('data-value'));
                        break;
                    }
                }
            } else {
                refreshTags();
            }

            $.ajax({
                url: root_url + 'plugins/fabrik_element/databasejoin/autocompleteSearch.php',
                // url    : searchURL,
                data: {
                    value: val,
                    join_name: join_name,
                    join_val_column: join_val_column,
                    join_key_column: join_key_column,
                    data_where: data_where,
                    concat_val: concat_val,
                    limit_query: limit_query
                },
                success: function (data) {
                    var opts = dataList.childNodes;
                    data.forEach(result => {
                        var bool = false;
                        for (var i = 0; i < opts.length; i++) {
                            if (result.value == opts[i].getAttribute('data-value') || val == ' ' || val == '') {
                                bool = true;
                                return;
                            }
                        }

                        if (!bool) {
                            var option = document.createElement('option');
                            option.text = result.text;
                            option.setAttribute('data-value', result.value);
                            //Verifica se o usuario selecionou a config. de ocutar registros já selecionados, se sim, desabilita as opções.
                            if (Boolean(Number(databasejoin_linked_items))) {
                                if (searchSelectedItem(selectOptions, result.text)) {
                                    option.setAttribute('disabled', true);
                                }
                            }
                            dataList.appendChild(option);
                        }
                    });
                },
                dataType: "json"
            });
        });

        el.appendChild(mainInput);
        el.appendChild(hiddenInput);
        el.appendChild(dataList);

        //add the selected options here        
        loadTags(selectOptions);

        function addTag(text, id) {

            let tag = {
                text: text,
                container: document.createElement('div'),
                content: document.createElement('span'),
                option: document.createElement('option'),
                closeButton: document.createElement('span')
            };

            tag.container.classList.add('tag-container');
            tag.content.classList.add('tag-content');
            tag.closeButton.classList.add('tag-close-button');

            tag.option.text = tag.text;
            tag.option.value = id;
            tag.option.setAttribute('selected', 'selected');

            selectElement.add(tag.option);


            tag.content.textContent = tag.text;
            tag.closeButton.textContent = 'x';

            tag.closeButton.addEventListener('click', function () {
                removeTag(tags.indexOf(tag));
            });

            tag.container.appendChild(tag.content);
            tag.container.appendChild(tag.closeButton);

            tags.push(tag);

            el.insertBefore(tag.container, mainInput);

            refreshTags();
        }

        // Load the selected options to tags 
        function loadTags(selectOptions) {
            for (const option of selectOptions) {
                let tag = {
                    text: option.textContent,
                    container: document.createElement('div'),
                    content: document.createElement('span'),
                    option: option,
                    closeButton: document.createElement('span')
                };

                tag.container.classList.add('tag-container');
                tag.content.classList.add('tag-content');
                tag.closeButton.classList.add('tag-close-button');


                tag.content.textContent = tag.text;
                tag.closeButton.textContent = 'x';

                tag.closeButton.addEventListener('click', function () {
                    removeTag(tags.indexOf(tag));
                });

                tag.container.appendChild(tag.content);
                tag.container.appendChild(tag.closeButton);

                tags.push(tag);

                el.insertBefore(tag.container, mainInput);
            }
        }

        function searchSelectedItem(selectOptions, optionText) {
            for (const option of selectOptions) {
                if (option.innerHTML === optionText) {
                    return true;
                }
            }
            return false;
        }

        function removeTag(index) {
            let tag = tags[index];
            tags.splice(index, 1);
            el.removeChild(tag.container);
            selectElement.removeChild(tag.option);
            refreshTags();
        }

        function refreshTags() {
            mainInput.value = '';
        }

        function filterTag(tag) {
            return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
        }
        var cssId = 'tagsCss';  // you could encode the css path itself to generate id..
        if (!document.getElementById(cssId)) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = root_url + 'plugins/fabrik_element/databasejoin/tags.css';
            link.media = 'all';
            head.appendChild(link);
        }
    });
});