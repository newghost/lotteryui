/*
* Lottery UI
* Author: Kris Zhang
* Lincense: MIT
* Support: IE9+, FF, Chrome
* https://github.com/newghost/lotteryui.git
*/

//Compatible with zepto
var jQuery  = jQuery || Zepto;

//Shortcuts
var define = Object.defineProperty;

/*
Plugin: Hash Change Event for Zepto / jQuery
Support: IE8+, FF, Chrome, Safari
*/
(function() {
  var eventName = "hashchange"
    , handlers  = [];

  var trigger = function(el, evtName) {
    //For IE9+, FF, Chrome
    if (document.createEvent) {
      var event = document.createEvent("HTMLEvents");
      event.initEvent(evtName, true, true);
      el.dispatchEvent(event);
    } else if (document.fireEvent) {  
      //For IE9-, window doesn't have fireEvent
      document.fireEvent("on" + evtName);
    }
  };

  var bind = function(el, handler) {
    el.addEventListener && el.addEventListener(eventName, handler);
    el.attachEvent && el.attachEvent("on" + eventName, handler);
  };

  var unbind = function(el, handler) {
    el.removeEventListener && el.removeEventListener(eventName, handler);
    el.detachEvent && el.detachEvent("on" + eventName, handler);
  };

  $.fn.hashchange = function(handler) {
    var $this = $(this);

    if ($this.size()) {
      var el = $this[0];

      if (handler) {
        handlers.push(handler);
        bind(el, handler);
      } else {
        trigger(el, eventName);
      }
    }

    return $this;
  };

  //change hash without trigger the hashchange event
  $.fn.updatehash = function(hash) {
    var $this = $(this);

    if ($this.size()) {
      var el = $this[0];

      /*
      unbind hashchange event first, and then bind again after a bit of delay (for FF)
      */
      handlers.forEach(function(handler) {
        unbind(el, handler);
      });

      location.hash = hash;

      window.setTimeout(function() {
        handlers.forEach(function(handler) {
          bind(el, handler);
        });
      }, 300);
    }

    return $this;
  };

})();

/*
Public method
*/
(function(window) {
  window.isMobile = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  //On fixed panel using MOUSEDOWN
  //On scrollable panel using CLICK
  window.MOUSEDOWN = "mousedown";
  window.CLICK     = "click";

  if (isMobile()) {
    $.fn.mousedown = function(handler) { 
      return $(this).on("touchstart", handler);
    };
    $.fn.click = $.fn.tap || $.fn.click;

    window.MOUSEDOWN = "touchstart";
    window.CLICK     = "tap";
  }

})(window);


/*
Lottery: Slider
*/
var Lottery = (function() {

  var lottery = {}

  var timer           = null,
      itemWidth       = 142,
      curPos          = 0,
      curIdx          = 0,
      speed           = 100;

  var $container      = $("#lottery")
    , $wrapper        = $(".lot-ui")
    , contentWrapper  = "#lottery>ul"
    , contentSliders  = "#lottery>ul>li";

  var init = function() {
    itemWidth = $container.width();
    speed = itemWidth / 3 | 0;
    $(contentWrapper).width(200000);
    $(contentSliders).width(itemWidth);
  };

  //Index of the slkider in Lottery, doesn't found return -1
  var index = function(hash) {
    //Remove prefix "#", if it has
    hash = hash.charAt(0) == "#" ? hash.substr(1) : hash;
    hash = "#lot-" + hash;
    //This expression is not stable on Android 2.2: /^[\w-]+$/g.test(hash)
    return $(hash).index();
  };

  var mvto  = function(hash, callback) {
    var idx;

    if (hash.constructor == String) {
      idx = index(hash);
    } else if (hash.constructor == Number && hash > -1) {
      idx   = hash;
      hash  = $(contentSliders).eq(idx).attr("id").replace("lot-", "");
    } else {
      return;
    }

    location.hash.indexOf(hash) < 0 && $(window).updatehash(hash);

    //if current idx is not equal target index, set running is true, or just resize
    (curIdx != idx) && (lottery.running = true);
    //start running animation.
    var tarPos = (0 - idx) * itemWidth;
    clearInterval(timer);
    timer = setInterval(function() {

      if (Math.abs(curPos - tarPos) < speed ) {

        stop(idx, callback);

      } else {
        curPos = parseInt($(contentWrapper).css("left")) | 0;

        curPos > tarPos
          ? (curPos -= speed)
          : (curPos += speed);

        $(contentWrapper).css("left", curPos);
      }

    }, 100);
  };

  var stop = function(idx, callback) {
    lottery.running = false;
    clearInterval(timer);

    curPos = (0 - idx) * itemWidth;
    curIdx = idx;

    $(contentWrapper).css("left", curPos);
    $(contentSliders).each(function(i, el) {
      var $this = $(this);
      (i == idx) 
        ? $this.addClass("selected")
        : $this.removeClass("selected");
    });

    var hash = location.hash;
    hash && $wrapper.attr("lot-hash", hash.replace('#', ''));

    callback && callback();
  };

  var add = function(idx, html) {
    idx = "#lot-" + (idx.charAt(0) == "#" ? idx.substr(1) : idx);

    var $slide = $(idx);
    if ($slide.size() < 1) {
      $slide = $("<li></li>")
        .attr({id: idx.substr(1)})
        .width(itemWidth);

      $(contentWrapper).append($slide);
    };

    $slide
      .addClass("selected")
      .html(html);
  };

  //write html on lot-slide
  var html = function(idx, html) {
    idx = "#lot-" + (idx.charAt(0) == "#" ? idx.substr(1) : idx);
    var $slide = $(idx);
    $slide.html(html);
  };

  var resize = function() {
    init();    
    //after resize, move to the new position
    mvto(curIdx);
  };

  //trigger after resize
  $(window).resize(resize);
  // Trigger the init after a bit of delay
  setTimeout(init, 100);

  define(lottery, "running", {
    get: function() {
      return this._running;
    }
    , set: function(value) {
      value
        ? $wrapper.addClass("lot-running")
        : $wrapper.removeClass("lot-running");
    }
  });

  lottery.init    = init;
  lottery.index   = index;
  lottery.resize  = resize;
  lottery.mvto = mvto;
  lottery.stop = stop;
  lottery.add  = add;
  lottery.html = html;

  return lottery;
})();


/*
Navigation buttons: swap page
*/
var Nav = (function() {
  var nav = {};

  var $navbtns = $(".lot-nav a"),
      $loading = $("#lot-loading"),
      clickTimer;

  //load new content to slide
  var load = function(hash, url) {
    var tmpl = $("style[data-url='" + url + "']");
    var html = tmpl.size()
             ? tmpl.html().trim()
             : "";

    //Pre add, so can move
    Lottery.add(hash, html);

    //If cannot found the html on the page, load the content via ajax.
    if (html.length < 1) {
      nav.loading = true;
      $.ajax({
        url: url,
        success: function(html) {
          Lottery.add(hash, html);
          //Lottery.mvto(hash);
          nav.loading = false;
        },
        error: function() {
          //if not found will hidden the loading layer
          nav.loading = false;
        }
      });
    }
  };

  //Selected at the NavBar, lottery will triggered by hashchanged
  var select = function(navbtn) {
    $navbtn = $(navbtn);

    if ($navbtn && $navbtn.size() && $navbtn.attr("href")) {
      //will used as id, so need to remove special characters.
      var hash = $navbtn.attr("href").replace(/[^\w-]/g, '');

      //Load new content into slider?
      var url = $navbtn.attr("data-url");
      url && load(hash, url);

      //Switch lottery.
      Lottery.mvto(hash);

      $navbtns.removeClass("selected");
      $navbtn.addClass("selected");
    }
  };

  //change current slide
  var mvto = function(hash) {
    var hash = hash.constructor == String ? hash : location.hash;

    $navbtns.each(function() {
      var $this = $(this);
      if ($this.attr("href") == hash) {
        return select($this);
      }
    });
  };

  //Bind nav functions on links: Click
  var bind = function(selector) {
    $(selector).click(function(e) {
      e.preventDefault();
      if (clickTimer) return;
      var $this = $(this);
      clickTimer = window.setTimeout(function() {
        select($this);
        clickTimer = null;
      }, 100);
    });
  };

  //Property, support IE9+
  define(nav, 'loading', {
    get: function() {
      return this._loading;
    }
    , set: function(value) {
      value
        ? $loading.show()
        : $loading.hide();

      this._loading = value;
    }
  });

  //On hash change
  $(window).hashchange(mvto);
  $(window).hashchange();

  //Public Method
  nav.select  = select;
  nav.bind    = bind;
  nav.load    = load;
  nav.mvto    = mvto;

  return nav;
}());


/*
Message
*/
var Msg = (function() {

  var destory;

  var confirm = function(msg, func, opts) {
    opts = opts || {};
    opts.cancel   = opts.cancel  || "Cancel";
    opts.confirm  = opts.confirm || "&nbsp;&nbsp;OK&nbsp;&nbsp;";
    create(msg, func, opts);
  };

  var alert = function(msg, opts) {
    opts = opts || {};
    opts.cancel   = opts.cancel  || "Cancel";
    create(msg, null, opts);
  };

  var create = function(msg, func, opts) {
    var msghtml
      = '<div class="dialog">'
      + '<div class="msg">'
      +   '<h3 class="msgh">Message</h3>'
      +   '<div class="msgb"></div>'
      +   '<table class="msgf">'
      +   (opts.confirm
             ? '<tr class="col2"><td><button class="msgcancel">' + opts.cancel + '</button></td><td><button class="msgconfirm">' + opts.confirm + '</button></td></tr>'
             : '<tr class="col1"><td><button class="msgcancel">' + opts.cancel + '</button></td></tr>'
          )
      +   '</table>'
      + '</div>'
      + '<div class="mask"></div>'
      + '</div>';

    var $msgbox = $(msghtml);

    $(document.body).append($msgbox);

    var   $title    = $(".msgh", $msgbox)
        , $body     = $(".msgb", $msgbox)
        , $cancel   = $(".msgcancel", $msgbox)
        , $confirm  = $(".msgconfirm", $msgbox);

    $title.html(opts.title || "Message");
    $body.html(msg);

    destory = function() {
      $msgbox.remove();
    };

    $cancel.click(destory);

    $confirm.click(function() {
      func && func();
      destory();
    });

    $msgbox.show();
  };

  return {
      alert: alert
    , confirm: confirm
    , destory: destory
  }
})();

/*
MenuBar
*/
var MenuBar = (function() {

  var $panels;

  var init = function() {
    $panels = $(".menubar > li > a");

    $panels.click(function(e) {
      e.preventDefault();

      var $this   = $(this),
          $panel  = $this.closest("li");

      $panel.toggleClass("expand");
    });

    Nav.bind($(".menubar > li a"));
  };

  return { 
    init: init
  }

})();

//Bind immediately
MenuBar.init();