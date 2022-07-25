jQuery(document).ready(function() {
    var id = jQuery('.elementIdAutoComplete').val();
    var urlAjax = jQuery('.urlAjax').val();
    var limitResults = jQuery('.limitResults').val();

    jQuery('#' + id + '-auto-complete').on('click', function() {
        jQuery('.dropdown-menu').css({'visibility': 'visible'});
        if(jQuery(this).val() == '') {
            jQuery('.dropdown-menu').empty();
            let element = document.getElementById(id + '-auto-complete');
            let coordsElement = element.getCoordinates();
            
            jQuery.ajax({
                url: urlAjax,
                type: 'post',
                beforeSend: function () {
                    var elementLoading = '<div class=\"spinner\" id=\"spinner-l5bxtram\" style=\"display: block; width: 1075px; height: 55px; position: absolute; left: 210px; top: 280px; opacity: 0.9;\">';
                        elementLoading += '<div class=\"spinner-content\" style=\"position: absolute; left: 523.5px; top: 0px;\">';
                        elementLoading += '<p class=\"spinner-msg\">Loading...</p>';
                        elementLoading += '<div class=\"spinner-img\"</div>';
                        elementLoading += '</div>';
                        elementLoading += '</div>';
                    jQuery('.fb_el_prot_livros___escritor .controls .fabrikElement').append(elementLoading);
                }
            }).done(function (response) {
                var results = response.slice(0, limitResults);
                jQuery('.dropdown-menu').css({'visibility': 'visible', 'display': 'block', 'left': coordsElement.left, 'top': (coordsElement.top + coordsElement.height) - 1, 'width': coordsElement.width});
                ul = document.querySelector('.dropdown-menu');
                jQuery.each(results, function (index, value) {
                    a = new Element('a', {'href': '#', 'data-value': value.value, tabindex: '-1'}).set('text', value.text);
                    li = new Element('li').adopt(a);
                    li.inject(ul);
                });

                jQuery('.spinner').remove();
            });
        }
    });

    jQuery('#' + id + '-auto-complete').on('blur', function() {
        jQuery('.dropdown-menu').css({'visibility': 'hidden', 'display': 'initial'});
    });
});