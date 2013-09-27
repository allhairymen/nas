+function ($, NAS) { 'use strict';
  NAS.facilities.onFacilityChecked = function (e) {
    e.stopPropagation();
    $(this).parent('li').toggleClass('active', $(this).prop('checked'));
  };

  NAS.facilities.updateFacilityAmount = function ($facilityItems) {
    $facilityItems.each(function (index, items) {
      var $items = $(items),
          $facilityAmount = $items.find('span.amount'),
          curAmount = $facilityAmount.text(),
          newAmount = $items.find('li').not('.new,.create').length;
      $facilityAmount.text(curAmount.replace(/\d+/, newAmount));
    });
  };

}(window.jQuery, window.NAS);
