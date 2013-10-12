+function ($, Handlebars) { 'use strict';
  $(document).ready(function (e) {
    var $people = $('.people-stats'),
        $deleteModal = $('#myModal_1'),
        delPopTemplate = Handlebars.compile(
          $('#delete-popover-template').html()),
        $menuDel = $('ul.operation-nav a.js-delete-btn');

    $people.on('click', ' span.del a', function (e) {
      e.preventDefault();
      var $target = $(this);
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
        $(document).trigger('sync.nas.actionbar', [$people, selectedNum]);
      });
    });

    $menuDel.on('click', function (e) {
      e.preventDefault();
      var $toDeleteFacilities = $people.find(':checkbox:checked')
                                       .parents('li'),
          delQuant = $toDeleteFacilities.length;
      if (delQuant < 1) return alert('请选择要删除的设备');
      $deleteModal.one('click', 'button.js-confirm-btn', function (e) {
        $deleteModal.one('hidden.bs.modal', function (e) {
          $toDeleteFacilities.remove();
          $(document).trigger('sync.nas.actionbar', [$people, selectedNum]);
        });
        $deleteModal.modal('hide');
      });
      $deleteModal.modal('show');
    });

    function selectedNum () {
      return $people.find(':checkbox:checked').length;
    }
    $people.on('change', ':checkbox', function (e) {
      $(document).trigger('sync.nas.actionbar', [$people, selectedNum]);
    });
    $(document).on('sync.nas.actionbar', NAS.utils.syncActionbar);
  });
}(jQuery, Handlebars);
