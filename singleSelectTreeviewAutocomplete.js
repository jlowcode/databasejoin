let initDivStA = document.getElementsByClassName('treeview-autocomplete-single');
if (initDivStA.length) {
    const root_urlStA = jQuery(initDivStA).find('.root_url')[0].value;
    define(['jquery', root_urlStA + '/plugins/fabrik_element/databasejoin/tree.jquery.js'], function ($) {
        [].forEach.call(document.getElementsByClassName('treeview-autocomplete-single'), function (element) {
            let mainDiv = element;
            element.classList.add("autocomplete");
            const nameElement = $(element).find('.attribute_name')[0].value;
            let selectedCheckbox = $(mainDiv).find('.selected-checkbox-' + nameElement)[0];
            const join_name = $(mainDiv).find('.join_name-' + nameElement)[0].value;
            let mainInput = document.getElementById(join_name + '_single'); //create main input to select elements
            const table_name = $(mainDiv).find('.table_name-' + nameElement)[0].value;
            const attribute_name = $(mainDiv).find('.attribute_name')[0].value;
            const join_val_column = $(mainDiv).find('.join_val_column-' + nameElement)[0].value;
            const join_key_column = $(mainDiv).find('.join_key_column-' + nameElement)[0].value;
            const tree_parent_id = $(mainDiv).find('.tree_parent_id-' + nameElement)[0].value;
            const filter_sortedby = $(mainDiv).find('.filter_sortedby-' + nameElement)[0].value;
            const elName = $(mainDiv).find('.el_name-' + nameElement)[0].value;
            const elementTreeId = String('#' + 'tree_single_' + attribute_name);
            const databasejoin_linked_items = $(mainDiv).find('.databasejoin_linked_items-' + nameElement)[0].value;
            const rootCategory = $(mainDiv).find('.category_root-' + nameElement)[0].value;
            
            //Update initial suggest
            const idParent = $(mainDiv).find('.idParent-' + nameElement)[0].value;
            const suggest = $(mainDiv).find('.suggest-' + nameElement)[0].value;

            //If the user set the data-WHERE propriety in the administrator page
            const dataWhereInput = $(mainDiv).find('.data_where-' + nameElement);
            const data_where = dataWhereInput[0] ? JSON.parse(dataWhereInput[0].value) : '';

            const concatInput = $(mainDiv).find('.concat-' + nameElement);
            const concat_val = concatInput[0] ? JSON.parse(concatInput[0].value) : '';

            //Limit of query results
            const limitQuery = $(mainDiv).find('.limit_query-' + nameElement);
            const limit_query = limitQuery[0] ? JSON.parse(limitQuery[0].value) : '';

            let tags = [];

            let dataObj = {
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

            // Build the tree making an AJAX request getting only the root nodes
            $.ajax({
                url: root_urlStA + 'plugins/fabrik_element/databasejoin/treeViewSearch.php',
                data: dataObj,
                success: function (result) {
                    let res = result;
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

            loadTags(selectedCheckbox);

            let parentDiv = jQuery(mainDiv).parent()[0];
            let btnRefreshTree = parentDiv ? jQuery(parentDiv).find("a.refreshTree")[0] : null;
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
                        url: root_urlStA + 'plugins/fabrik_element/databasejoin/treeViewSearch.php',
                        data: dataObj,
                        success: function (result) {
                            let res = result;
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
            
            var cssId = 'tagsCss';  // you could encode the css path itself to generate id..
            if (!document.getElementById(cssId)) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.id = cssId;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = root_urlStA + 'plugins/fabrik_element/databasejoin/tags.css';
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
                link.href = root_urlStA + 'plugins/fabrik_element/databasejoin/jqtree.css';
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
                link.href = root_urlStA + 'plugins/fabrik_element/databasejoin/autocompletetreeview.css';
                link.media = 'all';
                head.appendChild(link);
            }

            // Make an AJAX request when open a tree branch
            $(elementTreeId).on(
                'tree.open',
                function (e) {
                    let id = parseInt(e.node.id);

                    $.ajax({
                        url: root_urlStA + 'plugins/fabrik_element/databasejoin/treeViewSearch.php',
                        data: {
                            value: id,
                            join_name: join_name,
                            join_val_column: join_val_column,
                            join_key_column: join_key_column,
                            tree_parent_id: tree_parent_id,
                            filter_sortedby: filter_sortedby,
                            data_where: data_where,
                            concat_val: concat_val

                        },
                        success: function (result) {
                            let res = result;
                            //implementar aqui
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
            $(elementTreeId).on(
                'tree.click',
                function (event) {
                    var node = event.node;
                    if (Boolean(Number(databasejoin_linked_items))) {
                        buscaSelecionados(function (result2) {
                            var found = false;
                            result2.forEach(value => {
                                if (node.id == value.id) {
                                    found = true;
                                    alert('This node has already been selected.');
                                    return;
                                }
                            })
                            if (!found) {
                                addTag(node.name, node.id, true);
                            }
                        });
                    } else {
                        addTag(node.name, node.id, true);
                    }
                }
            );

            function buscaSelecionados(handleData) {
                $.ajax({
                    url: root_urlStA + 'plugins/fabrik_element/databasejoin/selectedNodesForSingleTreeview.php',
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

            function addTag(text, id, replace) {
                let tag = {
                    id: id,
                    text: text,
                    container: document.createElement('div'),
                    content: document.createElement('span'),
                    input: document.createElement('input'),
                    closeButton: document.createElement('span')
                };

                tag.container.classList.add('tag-container');
                tag.content.classList.add('tag-content');
                tag.closeButton.classList.add('tag-close-button');

                tag.input.value = id;
                tag.input.setAttribute('type', 'checkbox');
                tag.input.setAttribute('style', 'display: none');
                tag.input.setAttribute('checked', 'checked');
                tag.input.setAttribute('name', elName);
                tag.input.setAttribute('hidden', true);

                selectedCheckbox.appendChild(tag.input);

                tag.content.textContent = tag.text;
                tag.closeButton.textContent = 'x';

                tag.closeButton.addEventListener('click', function () {
                    removeTag(tags.indexOf(tag));
                });

                tag.container.appendChild(tag.content);
                tag.container.appendChild(tag.closeButton);

                removeTag(0);
                tags[0] = tag;

                mainDiv.insertBefore(tag.container, mainInput);
            }

            function removeTag(index) {
                let tag = tags[index];
                if (tag) {
                    tags.splice(index, 1);
                    mainDiv.removeChild(tag.container);
                    selectedCheckbox.removeChild(tag.input);
                }
            }

            // Load the selected options to tags 
            function loadTags(selectOptions) {
                let option = selectOptions.firstElementChild;
                if (option) {
                    let tag = {
                        id: option.getAttribute("value"),
                        text: option.getAttribute("data"),
                        container: document.createElement('div'),
                        content: document.createElement('span'),
                        input: option,
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

                    tags[0] = tag;

                    mainDiv.insertBefore(tag.container, mainInput);
                }

            }

            function alreadyInTagsList(text) {
                for (let i = 0; i < tags.length; i++) {
                    if (tags[i].text === text) {
                        return true;
                    }
                }
                return false;
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

            function refreshTags() {
                mainInput.value = '';
            }

            /*execute a function when someone clicks in the document:*/
            document.addEventListener("click", function (e) {
                closeAllLists(e.target);
            });

            //Update initial suggest
            mainInput.addEventListener("click", function () {
                searchValues(e);
            });

            mainInput.addEventListener("input", function (e) {
                searchValues(e);
            })

            //Update initial suggest
            //Added searchValues in a function to attend input and click events
            function searchValues(e) {
                var a, b, i, val = this.value;                
                
                if(!val) {
                    val = document.getElementById(join_name + '_single').value;
                }

                /*close any already open lists of autocompleted values*/
                closeAllLists();
                if (!val && !suggest) { return false; }
                currentFocus = -1;
                /*create a DIV element that will contain the items (values):*/
                a = document.createElement("DIV");
                a.setAttribute("id", join_name + "autocomplete-list");
                a.setAttribute("name", join_name + "-autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                /*append the DIV element as a child of the autocomplete container:*/

                //Changed for update initial suggest
                //this.parentNode.appendChild(a);
                document.getElementById(idParent).appendChild(a);

                if (val.length < 2 && !suggest) return;

                $.ajax({
                    url: root_urlStA + 'plugins/fabrik_element/databasejoin/autocompleteSearch.php',
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
                                if (selectedCheckbox.firstElementChild.getAttribute("data") != result.text) {
                                    a.appendChild(b);
                                }
                            } else {
                                a.appendChild(b);
                            }
                        });
                    },
                    dataType: "json"
                });
            }
        })
    });
}

