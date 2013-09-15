+function ($) { 'use strict';
  $(document).ready(function () {
    var ui = {
      $headerBar: $('.header-bar'),
      $headerBtn: $('.logo .caret')
    },

    bindShowHeaderBar = function () {
      ui.$headerBtn.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        ui.$headerBar.css('top', '0');
      });
    },

    bindHideHeaderBar = function () {
      $('body').on('click', function (e) {
        if ($(e.target)[0] === ui.$headerBar[0]) return;
        if (parseInt(ui.$headerBar.css('top'), 10) >= 0) {
          ui.$headerBar.css('top', '-206px');
        }
      });
    };

    bindShowHeaderBar();
    bindHideHeaderBar();
  });
}(window.jQuery);
