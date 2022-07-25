//Check function if main functions have been overwritten
let checkEvent = setInterval(function () {
    const modMultiNovo = jQuery('.modRenderMultiNovo').val();
    const modAutoComplete = jQuery('.modRenderAutoComplete').val();
    var rewrite = true;

    if(modMultiNovo == 'multi-select-novo') {
        var idMultiNovo = jQuery('.elementIdMultiNovo').val();
        rewrite = reWriteMulti(idMultiNovo);
        
        if(rewrite.eventsInputSearch || rewrite.eventsSelect) {
            eventChange(idMultiNovo);
            eventKeyup(idMultiNovo);
        }

        if(rewrite.eventsButtonRemove) {
            deleteTags(idMultiNovo);
        }
    }

    if(modAutoComplete == 'auto-complete') {
        var idAutoComplete = jQuery('.elementIdAutoComplete').val();
        var eventsInput = jQuery('#' + idAutoComplete + '-auto-complete').data('events');
        
        jQuery.each(eventsInput['keyup'], function  () {
            if(this.handler.toString().indexOf('event.keyCode == 13 || event.keyCode == 188') > 0) {
                rewrite = false;
            }
        });
        
        if(rewrite) {
            tagsAutocomplete(idAutoComplete);
        }
    }
}, 1000);

/* BEGIN - For modRender auto-complete */
function tagsAutocomplete(id) {
    jQuery('#' + id + '-auto-complete').on('keyup', function (event) {
        var optionsMessage = jQuery('.dropdown-menu li .alert-info i').html();
        console.log(optionsMessage);
        if(optionsMessage != undefined) {
            if(event.keyCode == 13 || event.keyCode == 188) { //Important for line 26
                var Tag = jQuery(this).val();
                var valueTag = '#fabrik#' + Tag;

                jQuery('#' + id + '-auto-complete').val(Tag);
                jQuery('#' + id).val('\"' + valueTag + '\"');
                jQuery('.dropdown-menu').css({'visibility': 'hidden', 'display': 'initial'});
                
                var e = jQuery.Event('blur');
                jQuery('#' + id + '-auto-complete').trigger(e);
            }
        }
    });
}
/* END - For modRender auto-complete*/


/* BEGIN - For modRender multi-select-novo */
//Function for decision of rewrite or not
function reWriteMulti(id) {
    var eventsInputSearch = jQuery('.select2-search__field').data('events');
    var eventsSelect = jQuery('#' + id + ' select').data('events');
    var eventsButtonRemove = jQuery('.select2-selection__choice__remove').data('events');
    var rewrite = new Array();

    rewrite['eventsInputSearch'] = true;
    rewrite['eventsSelect'] = true;
    rewrite['eventsButtonRemove'] = true;

    if(eventsInputSearch != undefined) {
        jQuery.each(eventsInputSearch['keyup'], function  () {
            if(this.handler.toString().indexOf('event.keyCode == 13 || event.keyCode == 188') > 0) {
                rewrite['eventsInputSearch'] = false;
            }
        });        
    }

    if(eventsSelect != undefined) {
        jQuery.each(eventsSelect['change'], function  () {
            if(this.handler.toString().indexOf("jQuery('#' + id + ' select')") > 0) {
                rewrite['eventsSelect'] = false;
            }
        });
    }

    if(eventsButtonRemove != undefined) {
        jQuery.each(eventsButtonRemove['click'], function  () {
            if(this.handler.toString().indexOf("label == jQuery(this).html()") > 0) {
                rewrite['eventsButtonRemove'] = false;
            }
        });
    }

    return rewrite;
}

//Function for editing event of new tags in select and as span
function eventKeyup(id) {
    jQuery('.select2-search__field').on('keyup', function (event) {
        var optionsMessage = jQuery('.select2-results__message').html();
        if(optionsMessage != undefined) {
            if(event.keyCode == 13 || event.keyCode == 188) {
                var Tag = jQuery(this).val();
                jQuery(this).val('');

                if(!duplicateTags(id, Tag)) {
                    AddSpan(Tag);
                    AddSelect(id, Tag);
                }
            }
        }
    });
}

//Function to verification duplicate of tags
function duplicateTags(id, newTag) {
    var duplicate = false;
    jQuery('#' + id + ' select').find('option').each(function() {
        var oldTag = jQuery(this).html();
        if(oldTag == newTag) {
            duplicate = true;
        }
    });

    return duplicate;
}

//Function for check added items event
function eventChange(id) {
    jQuery('#' + id + ' select').off('change');
    jQuery('#' + id + ' select').on('change', function() {
        setTimeout(function() {
            jQuery('.select2-selection__choice').remove();
            jQuery('#' + id + ' select').find('option').each(function() {
                var Tag = jQuery(this).html();
                AddSpan(Tag);
            });
        }, 1);
    });
}

//Span tag addition function
function AddSpan(Tag) {
    var valueTag = '#fabrik#' + Tag;
    var htmlLi = '<li class=\"select2-selection__choice\" title=\"' + Tag + '\"data-select2-id=\"' + valueTag + '\">';
        htmlLi += 	'<span class=\"select2-selection__choice__remove\" role=\"presentation\">&times;</span>';
        htmlLi += 	Tag;
        htmlLi +='</li>';
    jQuery('.select2-selection__rendered').prepend(htmlLi);
}

//Tag addition function in select
function AddSelect(id, Tag) {
    var valueTag = '#fabrik#' + Tag;
    var htmlOption = '<option selected value=\"' + valueTag + '\">' + Tag + '</option>';
    jQuery('#' + id + ' select').prepend(htmlOption);
    jQuery('#' + id + ' select').trigger('change');
}

//Function to delete tags added in select
function deleteTags(id) {
    jQuery('.select2-selection__choice__remove').on('click', function() {
        jQuery(this).parent().remove(); //delete in spans

        var label = jQuery(this).parent().html().split('</span>')[1];
        jQuery('#' + id + ' select').children().each(function () {
            if(label == jQuery(this).html()) {
                jQuery(this).remove();
                jQuery('#' + id + ' select').trigger('change');
            }
        });
    });
};
/* END - For modRender multi-select-novo */