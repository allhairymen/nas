+function ($) { 'use strict';
  if (typeof window.NAS === 'undefined') {
    var NAS = window.NAS = {};

    NAS.universal = {};
    NAS.scheduling = {};
    NAS.utils = {};

    NAS.universal.NAV_BAR_TOP_POS = '-206px';

    NAS.universal.bindNavBar = function () {
      var $navBar = $('.header-bar'),
          $showNavBtn = $('.logo .js-show-nav');

      $showNavBtn.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $navBar.css('top', '0');
      });

      NAS.utils.bindDismissOnClickElsewhere({
        safeZones: $navBar,
        dismissFunc: function (e) {
          if (parseInt($navBar.css('top'), 10) >= 0) {
            $navBar.css('top', NAS.universal.NAV_BAR_TOP_POS);
          }
        },
        evtNamespace: 'click.nas.navElse'
      });
    };

    NAS.utils.bindDismissOnClickElsewhere = function (options) {
      options = options || {};
      // parse options
      var safeZones = options.safeZones,
          dismissFunc = options.dismissFunc,
          evtNamespace = options.evtNamespace || 'click',
          once = options.once || false;
      safeZones = $.isArray(safeZones) ? safeZones : [safeZones];

      var $body = $('body'),
          bindMethod = once ? 'one' : 'on';

      function handler (e) {
        var $target = $(e.target),
            inSafeZone = false;
        for (var i = safeZones.length - 1; i >= 0; i--) {
          var $safeZone = $(safeZones[i]);
          if ($safeZone &&
              ($safeZone[0] === $target[0] || $safeZone.find($target)[0])) {
            inSafeZone = true;
            break;
          }
        }
        if (inSafeZone) {
          if (once) {
            $body.off(evtNamespace);
            $body[bindMethod](evtNamespace, handler);
          }
        } else {
          dismissFunc(e);
        }
      }

      $body[bindMethod](evtNamespace, handler);
    };
  }
}(window.jQuery);

+function ($, NAS) {
  $(document).ready(function () {
    NAS.universal.bindNavBar();
  });
}(window.jQuery, window.NAS);
