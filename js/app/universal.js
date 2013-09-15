+function ($) { 'use strict';
  if (typeof window.NAS === 'undefined') {
    var NAS = window.NAS = {};

    NAS.universal = {};
    NAS.scheduling = {};
    NAS.utils = {};

    NAS.universal.bindNavBar = function () {
      var $navBar = $('.header-bar'),
          $showNavBtn = $('.logo .js-show-nav');

      $showNavBtn.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $navBar.css('top', '0');
      });

      NAS.utils.bindDismissOnClickElsewhere({
        safeZone: $navBar,
        dismissFunc: function (e) {
          if (parseInt($navBar.css('top'), 10) >= 0) {
            $navBar.css('top', '-206px');
          }
        }
      });
    };

    NAS.utils.bindDismissOnClickElsewhere = function (options) {
      options = options || {};
      // parse options
      var safeZone = options.safeZone,
          dismissFunc = options.dismissFunc,
          once = options.once || false,

          $body = $('body'),
          bindMethod = once ? 'one' : 'on';

      function handler (e) {
        var $target = $(e.target);
        if (safeZone &&
           ($(safeZone)[0] === $target[0] ||
            $(safeZone).find($target)[0])) {
          if (once) $body[bindMethod]('click', handler);
        } else {
          dismissFunc(e);
        }
      }

      $body[bindMethod]('click', handler);
    };
  }
}(window.jQuery);

+function ($, NAS) {
  $(document).ready(function () {
    NAS.universal.bindNavBar();
  });
}(window.jQuery, window.NAS);
