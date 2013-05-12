/*
Description: $.fn.dialog
Author: Kris Zhang
*/

(function($) {

  $.fn.dialog = function(options) {

    var self    = this
      , $this   = $(self)
      , $msgbox = $this.closest(".dialog");

    var create = function(msg, func, opts) {
      var msghtml
        = '<div class="dialog">'
        + '<div class="msg">'
        +   '<h3 class="msgh"></h3>'
        +   '<div class="msgb"></div>'
        +   '<table class="msgf">'
        +   '<tr></tr>'
        +   '</table>'
        + '</div>'
        + '<div class="mask"></div>'
        + '</div>';

      $msgbox = $(msghtml);
      $(document.body).append($msgbox);
      $msgbox.find(".msgb").append($this);
      $this.show();
    };

    var createButton = function() {
      var buttons = options.buttons || {}
        , $btnrow = $msgbox.find(".msgf tr");

      console.log($btnrow);

      for (var button in buttons) {
        var btnObj  = buttons[button]
          , id      = ""
          , text    = ""
          , click   = "";

        if (btnObj.constructor == Object) {
          id    = btnObj.id;
          text  = btnObj.text;
          click = btnObj.click;
        }

        if (btnObj.constructor == Function) {
          click = btnObj;
        }

        var $button = $("<td>{0}</td>".format(text));

        id && $button.attr("id", id);
        click && $button.click(function() {
          console.log("click", click);
          click.call(self);
        });

        $btnrow.append($button);
      }
    };

    var destroy = function() {
      $msgbox.hide();
    };

    if (options.constructor == Object) {
      if ($msgbox.size() < 1) {
        create();
        createButton();
      }

      $msgbox.show();
      $(".msgh", $msgbox).html(options.title || "");      
    }

    if (options == "destroy") {
      console.log("destroy, here", $this);
      destroy();
    }

    return $this;
  };

})(jQuery);