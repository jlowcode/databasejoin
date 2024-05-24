var initDiv = document.getElementsByClassName('tree-view2');
if(initDiv.length){
    const root_url = jQuery(initDiv).find('.root_url')[0].value;
    define(['jquery', root_url + '/plugins/fabrik_element/databasejoin/tree.jquery.js'], function ($) {
        multiSelectTreeView();

        function multiSelectTreeView() {
            [].forEach.call(document.getElementsByClassName('tree-view2'), function (element) {
                var mainDiv = element;
                
                const nameElement = $(mainDiv).find('.attribute_name')[0].value;
                const join_name = $(mainDiv).find(String('.join_name-' + nameElement))[0].value;
                const el_name = $(mainDiv).find(String('.el_name-' + nameElement))[0].value;
                const elementTreeId = String('#' + 'tree_' + nameElement);
                var el = $(mainDiv).find(elementTreeId)[0];
                const elSelectedCheckbox = String('.' + 'selected-checkbox-' + nameElement);
                var selectedCheckbox = $(mainDiv).find(elSelectedCheckbox)[0];
                const table_name = $(mainDiv).find('.table_name-' + nameElement)[0].value;
                const join_val_column = $(mainDiv).find('.join_val_column-' + nameElement)[0].value;
                const join_key_column = $(mainDiv).find('.join_key_column-' + nameElement)[0].value;
                const tree_parent_id = $(mainDiv).find('.tree_parent_id-' + nameElement)[0].value;
                const filter_sortedby = $(mainDiv).find('.filter_sortedby-' + nameElement)[0].value;
                const rootCategory = $(mainDiv).find('.category_root-' + nameElement)[0].value;
                
                //If the user set the data-WHERE propriety in the administrator page
                const dataWhereInput = $(mainDiv).find('.data_where-' + nameElement);
                const data_where = dataWhereInput[0] ? JSON.parse(dataWhereInput[0].value) : '';

                const concatInput = $(mainDiv).find('.concat-' + nameElement);
                const concat_val = concatInput[0] ? JSON.parse(concatInput[0].value) : '';

                const databasejoin_linked_items = $(mainDiv).find('.databasejoin_linked_items-' + nameElement)[0].value;

                let tags = [];
        
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
        
                loadTags(selectedCheckbox);

                // Build the tree making an AJAX request getting only the root nodes
                $.ajax({
                    url: root_url + 'plugins/fabrik_element/databasejoin/multipleTreeViewSearch.php',
                    data: {
                        value: null,
                        join_name: join_name,
                        join_val_column: join_val_column,
                        join_key_column: join_key_column,
                        tree_parent_id: tree_parent_id,
                        filter_sortedby: filter_sortedby,
                        data_where: data_where,
                        concat_val: concat_val,
                        rootCategory: rootCategory
                    },
                    success: function (result) {
                        var res = result;
                        res.forEach(node => {
                            if (node.children) {
                                node.children = [{}];
                            } else {
                                node.children = [{}];
                            }
                        });
        
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
        
                    },
                    dataType: "json"
                });

                var parentDiv = jQuery(mainDiv).parent()[0];
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
                        // Build the tree making an AJAX request getting only the root nodes
                        $.ajax({
                            url: root_url + 'plugins/fabrik_element/databasejoin/multipleTreeViewSearch.php',
                            data: {
                                value: null,
                                join_name: join_name,
                                join_val_column: join_val_column,
                                join_key_column: join_key_column,
                                tree_parent_id: tree_parent_id,
                                filter_sortedby: filter_sortedby,
                                data_where: data_where,
                                concat_val: concat_val
                            },
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
        
                // Make an AJAX request when open a tree branch
                $(elementTreeId).off('tree.open').on(
                    'tree.open',
                    function (e) {
                        var id = parseInt(e.node.id);
                        $.ajax({
                            url: root_url + 'plugins/fabrik_element/databasejoin/multipleTreeViewSearch.php',
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
        
                function buscaSelecionados(handleData) {
                    $.ajax({
                        url: root_url + 'plugins/fabrik_element/databasejoin/selectedNodesForMultipleTreeview.php',
                        data: {
                            attribute_name: nameElement,
                            table_name: table_name,
                        },
                        success: function (result) {
                            handleData(result);
                        },
                        dataType: "json"
                    });
                }
        
                function addTag(text, id) {
                    var tag = {
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
                    tag.input.setAttribute('name', el_name);
                    tag.input.setAttribute('style', 'display: block');
                    tag.input.setAttribute('checked', 'true');
                    tag.input.setAttribute('class', 'fabrikinput');
                    tag.input.setAttribute('data-role', 'fabrikinput');
                    
                    tag.input.setAttribute('hidden', true);
                    //tag.input.setAtttribute('data', )
        
                    selectedCheckbox.appendChild(tag.input);
        
                    tag.content.textContent = tag.text;
                    tag.closeButton.textContent = 'x';
        
                    tag.closeButton.addEventListener('click', function () {
                        removeTag(tags.indexOf(tag));
                    });
        
                    tag.container.appendChild(tag.content);
                    tag.container.appendChild(tag.closeButton);
        
                    tags.push(tag);
        
                    mainDiv.insertBefore(tag.container, el);
                }
        
                function removeTag(index) {
                    var tag = tags[index];
                    tags.splice(index, 1);
                    mainDiv.removeChild(tag.container);
                    selectedCheckbox.removeChild(tag.input);
                }
        
                // Load the selected options to tags 
                function loadTags(selectOptions) {
        
                    for (const option of selectOptions.getElementsByTagName('input')) {
                        var tag = {
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
        
                        tags.push(tag);
        
                        mainDiv.insertBefore(tag.container, el);
                    }
                }
        
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
        
                                var bool = false;
                                for (var i = 0; i < tags.length; i++) {
                                    if (tags[i].id == node.id) {
                                        bool = true;
                                        return;
                                    }
                                }
        
                                if (!bool) {
                                    addTag(node.name, node.id);
                                    return;
                                }
                            });
                        } else {
                            var found = false;
                            //Verifica se o elemento que ele clicou já está adicionado na lista de tags	   
                            tags.forEach(tag => {
                                if (tag.id == node.id) {
                                    found = true;
                                    return;
                                }
                            });
        
                            //Se não encontrou o elemento na lista então adiciona uma tag	
                            if (!found) {
                                addTag(node.name, node.id);
                            }
        
                        }
                    }
                );
            });
        }

        return {
            multiSelectTreeView: multiSelectTreeView
        }
    });
}