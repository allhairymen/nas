+function () { 'use strict';
  var Handlebars = this.Handlebars;

  $(document).ready(function (e) {
    var $mainFacilities = $('.parameters-item.main'),
        delPopTemplate = Handlebars.compile(
          $('#delete-popover-template').html()),
        $menuDel = $('ul.operation-nav a.js-delete-btn');

    $mainFacilities.on('click', ' span.del a', function (e) {
      var $target = $(this);
      e.preventDefault();
      $target.popover({
        content: delPopTemplate,
        container: 'body',
        html: true,
        trigger: 'manual',
        placement: 'left'
      });
      $target.popover('show');

      var $delPanel = $('.item-delete-panel'),
          $facilityRow = $($target.parents('li')[0]);
      $delPanel.on('click', 'button.js-cancel-btn', function (e) {
        $target.popover('hide');
      });
      $delPanel.on('click', 'button.js-confirm-btn', function (e) {
        $target.popover('hide');
        $facilityRow.remove();
      });
    });

    $menuDel.on('click', function (e) {
      e.preventDefault();
      var $modal = $('#myModal_1'),
          $toDeleteFacilities = $mainFacilities.find(':checkbox:checked')
                                               .parents('li'),
          delQuant = $toDeleteFacilities.length;
      if (delQuant < 1) return alert('请选择要删除的设备');
      $modal.one('click', 'button.js-confirm-btn', function (e) {
        $modal.one('hidden.bs.modal', function (e) {
          $toDeleteFacilities.remove();
        });
        $modal.modal('hide');
      });
      $modal.modal('show');
    });
  });
}.call(this, window.jQuery);
