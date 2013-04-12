/*
Namespace of Company
*/
var DEMO = DEMO || {};

DEMO.List = function() {

  var init = function() {
    $("#outs > li").click(function(e) {
      var $outlet = $(this);

      $outlet.hasClass("selected")
        ? $outlet.removeClass("selected")
        : $outlet.addClass("selected");
    });
  };

  init();
};