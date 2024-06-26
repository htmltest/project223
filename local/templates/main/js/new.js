$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('form').each(function() {
        if ($(this).attr("id")!="orderForm") {
            initForm($(this));
        }
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        $('.window-link.last-active').removeClass('last-active');
        curLink.addClass('last-active');
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.icon-cat, .icon-cat').click(function(e) {
        window.location.hash = 'drop-catalog';
        e.preventDefault();
    });

    $('.icon-cat-close').click(function(e) {
        window.location.hash = '';
        e.preventDefault();
    });

    $('.docs-group-title').click(function() {
        var curGroup = $(this).parents().filter('.docs-group');
        curGroup.toggleClass('open');
    });

    $('.docs-section-title-text').click(function() {
        var curGroup = $(this).parents().filter('.docs-section');
        curGroup.toggleClass('open');
    });

    $('.docs').each(function() {
        $(window).on('load hashchange', function() {
            var curHash = window.location.hash.replace('#', '');
            if (curHash != '') {
                var curItem = $('.docs-block[data-id="' + curHash + '"]');
                if (curItem.length == 1) {
                    var curSection = curItem.parents().filter('.docs-section');
                    curSection.addClass('open');
                    var curGroup = curSection.parents().filter('.docs-group');
                    curGroup.addClass('open');
                    var curOffset = 73;
                    if ($(window).width() < 1071) {
                        curOffset = 100;
                    }
                    $('html, body').animate({'scrollTop': curItem.offset().top - curOffset - 10});
                } else {
                    var curSection = $('.docs-section[data-id="' + curHash + '"]');
                    if (curSection.length == 1) {
                        curSection.addClass('open');
                        var curGroup = curSection.parents().filter('.docs-group');
                        curGroup.addClass('open');
                        var curOffset = 73;
                        if ($(window).width() < 1071) {
                            curOffset = 100;
                        }
                        $('html, body').animate({'scrollTop': curSection.offset().top - curOffset - 10});
                    } else {
                        var curGroup = $('.docs-group[data-id="' + curHash + '"]');
                        if (curGroup.length == 1) {
                            curGroup.addClass('open');
                            var curOffset = 73;
                            if ($(window).width() < 1071) {
                                curOffset = 100;
                            }
                            $('html, body').animate({'scrollTop': curGroup.offset().top - curOffset - 10});
                        }
                    }
                }
            }
        });
    });

    $('.docs-block-title .docs-item-url').click(function(e) {
        var curItem = $(this).parents().filter('.docs-block');
        navigator.clipboard.writeText(window.location.origin + window.location.pathname + '#' + curItem.attr('data-id'));
        alert('Ссылка скопирована в буфер обмена');
        return false;
    });

    $('.docs-section-title .docs-item-url').click(function(e) {
        var curItem = $(this).parents().filter('.docs-section');
        navigator.clipboard.writeText(window.location.origin + window.location.pathname + '#' + curItem.attr('data-id'));
        alert('Ссылка скопирована в буфер обмена');
        return false;
    });

    $('.docs-group-title .docs-item-url').click(function(e) {
        var curItem = $(this).parents().filter('.docs-group');
        navigator.clipboard.writeText(window.location.origin + window.location.pathname + '#' + curItem.attr('data-id'));
        alert('Ссылка скопирована в буфер обмена');
        return false;
    });

    $('.catalogu-home-mobile-all button').click(function() {
        $('.catalog-home').addClass('open');
    });

    $('.breadcrumbs-catalogue-menu ul li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.addClass('with-submenu');
        }
    });

});

function initForm(curForm) {
    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);

            if (curForm.hasClass('window-form')) {
                var formData = new FormData(form);

                if (curForm.find('[type=file]').length != 0) {
                    var file = curForm.find('[type=file]')[0].files[0];
                    formData.append('file', file);
                }
                windowOpen(curForm.attr('action'), formData);
            } else {
                form.submit();
            }
        }
    });
}

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.header_desc').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.header_desc').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('body').css('margin-top', -curScroll);
        $('body').data('curScroll', curScroll);
    } else {
        $('.window').append('<div class="window-loading"></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container">' + html + '<a href="#" class="window-close"></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"></a>');
            $('.window .window-loading').remove();
        }

        $('.window form').each(function() {
            initForm($(this));
        });

    });
}

function windowClose() {
    if ($('.window').length > 0) {

        var isEmptyForm = true;
        $('.window .form-input input, .window .form-input textarea, .window .form-select select').each(function() {
            if ($(this).val() != '') {
                isEmptyForm = false;
            }
        });
        if (isEmptyForm) {
            $('.window').remove();
            $('html').removeClass('window-open');
            $('body').css({'margin-right': 0, 'margin-top': 0});
            $(window).scrollTop($('body').data('curScroll'));
        } else {
            if (confirm('Закрыть форму?')) {
                $('.window .form-input input, .window .form-input textarea, .window .form-select select').val('');
                windowClose();
            }
        }
    }
}

$(window).on('resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    if ($('.top-sticky:visible').length == 0) {
        $('.popup_cat__body').css({'margin-top': 100 - windowScroll});
        $('.icon-cat-close').css({'margin-left': 0});
    } else {
        $('.popup_cat__body').css({'margin-top': 14});
        $('.icon-cat-close').css({'margin-left': 119});
    }
});