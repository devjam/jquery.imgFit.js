/*
jquery.imgFit.js v.0.2

Copyright (c) Devjam / SHIFTBRAIN INC.  
Licensed under the MIT license.  
https://github.com/devjam

#option
area:null(default:$(this).parent())
maxWidth: null
maxHeight: null
minWidth: null
minHeight: null
align:"center" ["left", "center", "right"]
valign:"middle" ["top", "middle", "bottom"]
autoResize: true

#usage
$("img.fit").imgFit();

#method
resize();
*/


(function() {

  (function(jQuery) {
    var $;
    $ = jQuery;
    return $.fn.imgFit = function(config) {
      var defaultConfig, options;
      defaultConfig = {
        area: null,
        maxWidth: null,
        maxHeight: null,
        minWidth: null,
        minHeight: null,
        align: "center",
        valign: "middle",
        autoResize: true
      };
      options = $.extend(defaultConfig, config);
      return this.each(function() {
        var img, init,
          _this = this;
        if ($(this).attr('src') == null) {
          return;
        }
        $.fn.imgFit.resize = function() {
          var areaHeight, areaWidth, nowHeight, nowWidth, nowleft, nowtop, o, rate, rateHeight, rateWidth, style;
          o = options;
          areaWidth = $(o.area).width();
          areaHeight = $(o.area).height();
          rateWidth = areaWidth / _this.srcWidth;
          rateHeight = areaHeight / _this.srcHeight;
          if (o.maxWidth > 0) {
            if (areaWidth > o.maxWidth) {
              rateWidth = o.maxWidth / _this.srcWidth;
            }
          }
          if (o.minWidth > 0) {
            if (areaWidth < o.minWidth) {
              rateWidth = o.minWidth / _this.srcWidth;
            }
          }
          if (o.maxHeight > 0) {
            if (areaHeight > o.maxHeight) {
              rateHeight = o.maxHeight / _this.srcHeight;
            }
          }
          if (o.minHeight > 0) {
            if (areaHeight < o.minHeight) {
              rateHeight = o.minHeight / _this.srcHeight;
            }
          }
          rate = rateWidth;
          if (rateWidth < rateHeight) {
            rate = rateHeight;
          }
          nowWidth = _this.srcWidth * rate;
          nowHeight = _this.srcHeight * rate;
          nowleft = (areaWidth - nowWidth) * 0.5;
          nowtop = (areaHeight - nowHeight) * 0.5;
          style = {
            width: nowWidth + "px",
            height: nowHeight + "px"
          };
          if (o.align === "left") {
            style.left = 0;
            style.right = "auto";
          } else if (o.align === "center") {
            style.left = nowleft + "px";
            style.right = "auto";
          } else {
            style.left = "auto";
            style.right = 0;
          }
          if (o.valign === "top") {
            style.top = 0;
            style.bottom = "auto";
          } else if (o.valign === "middle") {
            style.top = nowtop + "px";
            style.bottom = "auto";
          } else {
            style.top = "auto";
            style.bottom = 0;
          }
          $(_this).css(style);
          return _this;
        };
        init = function() {
          var o, r, val, _base;
          _this.srcWidth = img.width;
          _this.srcHeight = img.height;
          o = options;
          if (o.maxWidth != null) {
            val = o.maxWidth.toString();
            if ((typeof val.indexOf === "function" ? val.indexOf("%") : void 0) !== -1) {
              r = (typeof val.replace === "function" ? val.replace("%", "") : void 0) * 0.01;
              o.maxWidth = _this.srcWidth * r;
            }
          }
          if (o.minWidth != null) {
            val = o.minWidth.toString();
            if ((typeof val.indexOf === "function" ? val.indexOf("%") : void 0) !== -1) {
              r = (typeof val.replace === "function" ? val.replace("%", "") : void 0) * 0.01;
              o.minWidth = _this.srcWidth * r;
            }
          }
          if (o.maxHeight != null) {
            val = o.maxHeight.toString();
            if ((typeof val.indexOf === "function" ? val.indexOf("%") : void 0) !== -1) {
              r = (typeof val.replace === "function" ? val.replace("%", "") : void 0) * 0.01;
              o.maxHeight = _this.srcHeight * r;
            }
          }
          if (o.minHeight != null) {
            val = o.minHeight.toString();
            if ((typeof val.indexOf === "function" ? val.indexOf("%") : void 0) !== -1) {
              r = (typeof (_base = o.minHeight).replace === "function" ? _base.replace("%", "") : void 0) * 0.01;
              o.minHeight = _this.srcHeight * r;
            }
          }
          $(_this).imgFit.resize();
          if (o.autoResize) {
            $(window).bind("resize", $(_this).imgFit.resize);
          }
          return _this;
        };
        if (options.area == null) {
          options.area = $(this).parent();
        }
        if ($(options.area).css("position") === "static") {
          $(options.area).css("position", "relative");
        }
        $(this).css("position", "absolute");
        img = new Image();
        img.src = $(this).attr('src');
        if (img.complete) {
          setTimeout(function() {
            return init();
          }, 0);
        } else {
          $(img).load(function() {});
          init();
        }
        return this;
      });
    };
  })(jQuery);

}).call(this);
