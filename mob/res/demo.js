/*
Namespace of Company
*/
var Demo = (function() {

  var list = function() {
    $("#outs > li").click(function(e) {
      var $outlet = $(this);

      $outlet.hasClass("selected")
        ? $outlet.removeClass("selected")
        : $outlet.addClass("selected");
    });
  };

  var init = function() {
    $("#btnlogin").click(function(e) {
    	e.preventDefault();
    	Nav.mvto("#settings");
    });
  };

  return {
  	  init: init
  	, list: list
  }

})();

Demo.init();