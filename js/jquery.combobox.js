/*
Description: $.fn.combobox
Author: Kris Zhang
*/

(function($) {

  $.fn.combobox = function(method, options) {

    var $this = $(this);

    //handle: $().datagrid("loadData", {rows: []})
    if (method == "loadData") {
      var selector = $this[0];
      if (selector && options) {
        selector.options.length = 0;
        options.forEach(function(opt) {
          selector.options.add(new Option(opt.text, opt.value));
        });
      }
    }

    if (method == "getValue") {
      return $this.val();
    }

    return $this;
  };

})(jQuery);