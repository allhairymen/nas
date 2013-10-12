+function ($) { 'use strict';
  if (typeof window.NAS === 'undefined') {
    var NAS = window.NAS = {};

    NAS.universal = {};
    NAS.scheduling = {};
    NAS.facilities = {};
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

    NAS.utils.syncActionbar = function (e, $entries, $activeFunc) {
      var $actionBar = $('ul.operation-nav'),
          $editBtn = $actionBar.find('a.js-edit-btn'),
          $deleteBtn = $actionBar.find('a.js-delete-btn'),
          activeNum = $activeFunc ? $activeFunc() : $entries.find('li.active').length;
      e.stopPropagation();
      if (activeNum > 1) {
        $editBtn.hide();
        $deleteBtn.show();
      } else if (activeNum > 0) {
        $editBtn.show();
        $deleteBtn.show();
      } else {
        $editBtn.hide();
        $deleteBtn.hide();
      }
    };
  }
}(jQuery);

+function ($, NAS) {
  $(document).ready(function () {
    NAS.universal.bindNavBar();
  });
}(jQuery, NAS);
