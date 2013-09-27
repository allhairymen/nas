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

  NAS.facilities.bindSearchOnKeypressed = function ($searchInput, $toSearchItems, filterFunc) {
    $searchInput.keyup(function (e) {
      var searchStr = $searchInput.val();
      if (searchStr) {
        var $itemsMatched = $toSearchItems.filter(function () {
          var $item = $(this),
              itemTitle = $.trim($item.text()),
              found = itemTitle.indexOf(searchStr) !== -1;
          return filterFunc ? found && filterFunc($item) : found;
        });
        $itemsMatched.show();
        $toSearchItems.not($itemsMatched).hide();
      } else {
        if (filterFunc) {
          $toSearchItems = $toSearchItems.filter(function () {
            return filterFunc($(this));
          });
        }
        $toSearchItems.show();
      }
    });
  };

}(window.jQuery, window.NAS);
