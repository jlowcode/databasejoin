var initDivTA = document.getElementsByClassName('autocomplete-multiple');
if (initDivTA.length) {
    const root_urlTA = jQuery(initDivTA).find('.root_url')[0].value;
    define(['jquery', root_urlTA + '/plugins/fabrik_element/databasejoin/tree.jquery.js'], function ($) {
        multiSelectTreeviewAutocomplete();

        function multiSelectTreeviewAutocomplete() {
            [].forEach.call(document.getElementsByClassName('autocomplete-multiple'), function (element) {
                const elementIdInput = $(element).find('.input-autocompletetreeview-id')[0].value;
                let mainInput = document.getElementById(elementIdInput),      //create main input to select elements
                    tags = [];

                element.classList.add("autocomplete");
                const selectElement = element.querySelector('select');           // Select element to save the selected elements
                const selectOptions = selectElement.children;
                const nameElement = $(element).find('.attribute_name')[0].value;
                const join_name = $(element).find(String('.join_name-' + nameElement))[0].value;
                const join_val_column = $(element).find('.join_val_column-' + nameElement)[0].value;
                const join_key_column = $(element).find('.join_key_column-' + nameElement)[0].value;
                const root_url = $(element).find('.root_url')[0].value;
                const databasejoin_linked_items = $(element).find('.databasejoin_linked_items-' + nameElement)[0].value;
                const table_name = $(element).find('.table_name-' + nameElement)[0].value;
                const attribute_name = $(element).find('.attribute_name')[0].value;
                const elementTreeId = String('#' + 'tree_' + attribute_name);
                const tree_parent_id = $(element).find('.tree_parent_id-' + nameElement)[0].value;
                const filter_sortedby = $(element).find('.filter_sortedby-' + nameElement)[0].value;
                const rootCategory = $(element).find('.category_root-' + nameElement)[0].value;

                //If the user set the data-WHERE propriety in the administrator page
                const dataWhereInput = $(element).find('.data_where-' + nameElement);
                const data_where = dataWhereInput[0] ? JSON.parse(dataWhereInput[0].value) : '';

                const concatInput = $(element).find('.concat-' + nameElement);
                const concat_val = concatInput[0] ? JSON.parse(concatInput[0].value) : '';

                //Limit of query results
                const limitQuery = $(element).find('.limit_query-' + nameElement);
                const limit_query = limitQuery[0] ? JSON.parse(limitQuery[0].value) : '';

                var dataObj = {
                    value: null,
                    join_name: join_name,
                    join_val_column: join_val_column,
                    join_key_column: join_key_column,
                    tree_parent_id: tree_parent_id,
                    filter_sortedby: filter_sortedby,
                    data_where: data_where,
                    concat_val: concat_val,
                    rootCategory: rootCategory
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
                var cssId = 'jqtree';  // you could encode the css path itself to generate id..
                if (!document.getElementById(cssId)) {
                    var head = document.getElementsByTagName('head')[0];
                    var link = document.createElement('link');
                    link.id = cssId;
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = root_url + 'plugins/fabrik_element/databasejoin/jqtree.css';
                    link.media = 'all';
                    head.appendChild(link);
                }

                var autoTree = 'autocompletetreeview';  // you could encode the css path itself to generate id..
                if (!document.getElementById(autoTree)) {
                    var head = document.getElementsByTagName('head')[0];
                    var link = document.createElement('link');
                    link.id = autoTree;
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = root_url + 'plugins/fabrik_element/databasejoin/autocompletetreeview.css';
                    link.media = 'all';
                    head.appendChild(link);
                }

                $.ajax({
                    url: root_url + 'plugins/fabrik_element/databasejoin/multipleTreeViewSearch.php',
                    data: dataObj,
                    success: function (result) {
                        var res = result;
                        res.forEach(node => {
                            if (node.children) {
                                node.children = [{}];
                            } else {
                                node.children = [{}];
                            }
                        });

                        if (Boolean(Number(databasejoin_linked_items))) {
                            buscaSelecionados(function (result2) {
                                $(elementTreeId).tree({
                                    data: res,
                                    selectable: false,
                                    onCreateLi: function (node, $li) {
                                        if (Boolean(Number(databasejoin_linked_items))) {
                                            spanElement = $li[0].firstChild.lastElementChild;
                                            result2.forEach(value => {
                                                if (value.id == node.id) {
                                                    spanElement.setAttribute("style", "color: #A9A9A9; font-style:italic;");
                                                    return;
                                                }
                                            })
                                        }

                                    }
                                });
                            })
                        } else {
                            $(elementTreeId).tree({
                                data: res,
                                selectable: false
                            });
                        }
                    },
                    dataType: "json"
                });

                //add the selected options here        
                loadTags(selectOptions);

                var parentDiv = jQuery(element).parent()[0];
                var btnRefreshTree = parentDiv ? jQuery(parentDiv).find("a.refreshTree")[0] : null;
                //add a refresh in the tree when there is a refresh button in the form
                if (btnRefreshTree) {
                    btnRefreshTree.addEventListener("click", function (e) {
                        var tree = $(elementTreeId).tree('getTree');
                        //fechar todos os nós da árvore primeiro
                        tree.iterate(function(node) {
                            if (node.hasChildren()) {
                                $(elementTreeId).tree('closeNode', node, true);
                            }
                        });
                        dataObj.value = null;
                        // Build the tree making an AJAX request getting only the root nodes
                        $.ajax({
                            url: root_url + 'plugins/fabrik_element/databasejoin/multipleTreeViewSearch.php',
                            data: dataObj,
                            success: function (result) {
                                var res = result;
                                res.forEach(node => {
                                    if (node.children) {
                                        node.children = [{}];
                                    }
                                });
                                $(elementTreeId).tree('loadData', res);
                            },
                            dataType: "json"
                        });
                    });
                }

                function addTag(text, id) {

                    var tag = {
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

                    element.insertBefore(tag.container, mainInput);

                    refreshTags();
                }

                // Load the selected options to tags 
                function loadTags(selectOptions) {
                    for (const option of selectOptions) {
                        var tag = {
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

                        element.insertBefore(tag.container, mainInput);
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
                    var tag = tags[index];
                    tags.splice(index, 1);
                    element.removeChild(tag.container);
                    selectElement.removeChild(tag.option);
                    refreshTags();
                }

                function refreshTags() {
                    mainInput.value = '';
                }

                function closeAllLists(elmnt) {
                    /*close all autocomplete lists in the document,
                    except the one passed as an argument:*/
                    var x = document.getElementsByName(join_name + "-autocomplete-list");
                    for (var i = 0; i < x.length; i++) {
                        if (elmnt != x[i] && elmnt != mainInput) {
                            x[i].parentNode.removeChild(x[i]);
                        }
                    }
                }

                function addActive(x) {
                    /*a function to classify an item as "active":*/
                    if (!x) return false;
                    /*start by removing the "active" class on all items:*/
                    removeActive(x);
                    if (currentFocus >= x.length) currentFocus = 0;
                    if (currentFocus < 0) currentFocus = (x.length - 1);
                    /*add class "autocomplete-active":*/
                    x[currentFocus].classList.add(this.id + "autocomplete-active");
                }

                function removeActive(x) {
                    /*a function to remove the "active" class from all autocomplete items:*/
                    for (var i = 0; i < x.length; i++) {
                        x[i].classList.remove(this.id + "autocomplete-active");
                    }
                }

                /*execute a function when someone clicks in the document:*/
                document.addEventListener("click", function (e) {
                    closeAllLists(e.target);
                });

                /*execute a function presses a key on the keyboard:*/
                mainInput.addEventListener("keydown", function (e) {
                    var x = document.getElementById(join_name + "-autocomplete-list");
                    if (x) x = x.getElementsByTagName("div");
                    if (e.keyCode == 40) {
                        /*If the arrow DOWN key is pressed,
                        increase the currentFocus variable:*/
                        currentFocus++;
                        /*and and make the current item more visible:*/
                        addActive(x);
                    } else if (e.keyCode == 38) { //up
                        /*If the arrow UP key is pressed,
                        decrease the currentFocus variable:*/
                        currentFocus--;
                        /*and and make the current item more visible:*/
                        addActive(x);
                    } else if (e.keyCode == 13) {
                        /*If the ENTER key is pressed, prevent the form from being submitted,*/
                        e.preventDefault();
                        if (currentFocus > -1) {
                            /*and simulate a click on the "active" item:*/
                            if (x) x[currentFocus].click();
                        }
                    }
                });

                // Make an AJAX request when open a tree branch
                $(elementTreeId).off('tree.open').on(
                    'tree.open',
                    function (e) {
                        var id = parseInt(e.node.id);
                        dataObj.value = id;
                        $.ajax({
                            url: root_url + 'plugins/fabrik_element/databasejoin/multipleTreeViewSearch.php',
                            data: dataObj,
                            success: function (result) {
                                var res = result;
                                res.forEach(node => {
                                    if (node.children) {
                                        node.children = [{}];
                                    }
                                });
                                $(elementTreeId).tree('loadData', res, e.node);
                            },
                            dataType: "json"
                        });

                    }
                );

                // On click on a node adds it to tags
                $(elementTreeId).off('tree.click').on(
                    'tree.click',
                    function (event) {
                        var node = event.node;
                        if (Boolean(Number(databasejoin_linked_items))) {
                            buscaSelecionados(function (result2) {
                                var bool = false;
                                for (var i = 0; i < result2.length; i++) {
                                    if (result2[i].id == node.id) {
                                        bool = true;
                                        alert('This node has already been selected.');
                                        return;
                                    }
                                }
                            });
                        }

                        if (!alreadyInTagsList(node.name)) {
                            addTag(node.name, node.id);
                        }
                    }
                );

                function alreadyInTagsList(text) {
                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i].text === text) {
                            return true;
                        }
                    }
                    return false;
                }

                function buscaSelecionados(handleData) {
                    $.ajax({
                        url: root_url + 'plugins/fabrik_element/databasejoin/selectedNodesForMultipleTreeview.php',
                        data: {
                            attribute_name: attribute_name,
                            table_name: table_name,
                        },
                        success: function (result) {
                            handleData(result);
                        },
                        dataType: "json"
                    });
                }

                mainInput.addEventListener("input", function (e) {
                    var a, b, i, val = this.value;
                    /*close any already open lists of autocompleted values*/
                    closeAllLists();
                    if (!val) { return false; }
                    currentFocus = -1;
                    /*create a DIV element that will contain the items (values):*/
                    a = document.createElement("DIV");
                    a.setAttribute("id", join_name + "autocomplete-list");
                    a.setAttribute("name", join_name + "-autocomplete-list");
                    a.setAttribute("class", "autocomplete-items");
                    /*append the DIV element as a child of the autocomplete container:*/
                    this.parentNode.appendChild(a);
                    if (val.length < 2)
                        return;

                    $.ajax({
                        url: root_url + 'plugins/fabrik_element/databasejoin/autocompleteSearch.php',
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
                            data.forEach(result => {
                                b = document.createElement("DIV");
                                /*make the matching letters bold:*/
                                b.innerHTML = "<strong>" + result.text.substr(0, val.length) + "</strong>";
                                b.innerHTML += result.text.substr(val.length);
                                /*insert a input field that will hold the current array item's value:*/
                                b.innerHTML += "<input type='hidden' value='" + result.text + "'>";
                                /*execute a function when someone clicks on the item value (DIV element):*/
                                b.addEventListener("click", function (e) {
                                    if (!alreadyInTagsList(result.text)) {
                                        addTag(result.text, result.value);
                                        closeAllLists();
                                    }
                                    refreshTags();
                                });

                                if (Boolean(Number(databasejoin_linked_items))) {
                                    if (!searchSelectedItem(selectOptions, result.text)) {
                                        a.appendChild(b);
                                    }
                                } else {
                                    a.appendChild(b);
                                }
                            });
                        },
                        dataType: "json"
                    });
                })
            })
        }

        return {
            multiSelectTreeviewAutocomplete: multiSelectTreeviewAutocomplete
        }
    })
}
