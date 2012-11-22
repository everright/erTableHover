/*
 * Plugin Name: erTableHover plugin for jQuery
 * Version: 1.0
 * Author: everright.chen
 * Email: everright.chen@gmail.com
 * Website: http://www.everright.cn
 * Testd on: jQuery 1.4+, IE 6+, Firefox, Chrome, Safari, Oprea
 * erTableHover is a jQuery plugin to highlight table rows and columns on hover..
 */

(function($) {
    $.erTableHover = function(el, options) {
        if ('table' != el.tagName.toLowerCase()) {
            return;
        }
        
        var base = this;
        base.$table = $(el);
        base.options = $.extend({}, $.erTableHover.defaults, options);
        base.current = null;
        
        var ingores = '';
        if (true === base.options.ingoreHeader === base.options.ingoreFooter) {
            ingores = 'thead > tr, tfoot > tr';
        } else if (true === base.options.ingoreHeader) {
            ingores = 'thead > tr';
        } else if (true === base.options.ingoreFooter) {
            ingores = 'tfoot > tr';
        }
        
        base.$tr = $('' === ingores ? 'tr' : 'tr:not("' + ingores + '")', base.$table).not(base.options.ingoreRows);

        base.init = function() {
            base.$tr.each(function() {
                var currentTr = $(this).index();
                $(this).children().not(base.options.ingoreCols).each(function() {
                    var currentTd = $(this).index();
                    var current = currentTr + '_' + currentTd;
                    var $td = $(this).parent().children().not(base.options.ingoreCols);
          
                    $(this).hover(function() {
                        if ('row' == base.options.hoverHandle || 'cross' == base.options.hoverHandle) {
                            $td.addClass(base.options.hoverClass);
                        }
                        if ('col' == base.options.hoverHandle || 'cross' == base.options.hoverHandle) {
                            base.$tr.each(function() {
                                $(this).children(':eq('+currentTd+')').addClass(base.options.hoverClass);
                            });
                        }
                        $(this).addClass(base.options.curClass);
                    }, function() {
                        if ('row' == base.options.hoverHandle || 'cross' == base.options.hoverHandle) {
                            $td.removeClass(base.options.hoverClass);
                        }
                        if ('col' == base.options.hoverHandle || 'cross' == base.options.hoverHandle) {
                            base.$tr.each(function() {
                                $(this).children(':eq('+currentTd+')').removeClass(base.options.hoverClass);
                            });
                        }
                        $(this).removeClass(base.options.curClass);
                    });

                    if (true === base.options.enableClick) {
                        $(this).click(function(){
                            var isClicked = false;
                            base.$tr.each(function() {
                                $(this).children().not(base.options.ingoreCols).removeClass(base.options.clickedClass).removeClass(base.options.curClickedClass);
                            });
                            if (base.current != null && current == base.current) {
                                base.current = null;
                                isClicked = true;
                                $(this).removeClass(base.options.curClickedClass);
                            } else {
                                base.current = current;
                                $(this).addClass(base.options.curClickedClass);
                            }
                            if ('row' == base.options.hoverHandle || 'cross' == base.options.hoverHandle) {
                                isClicked ? $td.removeClass(base.options.clickedClass) : $td.addClass(base.options.clickedClass);
                            }
              
                            if ('col' == base.options.hoverHandle || 'cross' == base.options.hoverHandle) {
                                if (isClicked) {
                                    base.$tr.each(function() {
                                        $(this).children(':eq('+currentTd+')').removeClass(base.options.clickedClass).removeClass(base.options.curClickedClass);
                                    });
                                } else {
                                    base.$tr.each(function() {
                                        $(this).children(':eq('+currentTd+')').addClass(base.options.clickedClass);
                                    });
                                }
                            }
              
                        });
                    }
                });
            });
        };
        // reday go
        base.init();
    };
    
    $.erTableHover.defaults = {
        hoverHandle: 'cross', //options: cross, col, row
        hoverClass: 'er_table_hover',
        curClass: 'er_table_cur',
        enableClick: false,
        clickedClass: 'er_table_click',
        curClickedClass: 'er_table_cur_clicked',
        ingoreHeader: true,
        ingoreFooter: true,
        ingoreCols: '', //support :first || eq(0), :last, :eq(1)
        ingoreRows: '' //support :first || eq(0), :last, :eq(1)
    };

    $.fn.erTableHover = function(options) {
        return this.each(function(i) {
            (new $.erTableHover(this, options));
        });
    };

})(jQuery);