+function ($) { 'use strict';
  var NAS = this.NAS;

  NAS.facilities.onFacilityChecked = function (e) {
    e.stopPropagation();
    $(this).parent('li').toggleClass('active', $(this).prop('checked'));
  };

}.call(this, window.jQuery);
