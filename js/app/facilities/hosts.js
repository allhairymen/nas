+function ($, Handlebars, NAS) { 'use strict';
  $(document).ready(function ($) {
    var $hosts = $('.hosts-management'),
        $opNav = $('ul.operation-nav'),
        $editModal = $('#myModal_2'),
        $deleteModal = $('#myModal_1'),
        hostTemplate = Handlebars.compile($('#host-template').html());

    $hosts.on('click', 'li.new', function (e) {
      e.preventDefault();
      var $target = $(this);
      $editModal.one('click', 'button.js-confirm-btn', function (e) {
        var $input = $editModal.find('input[name=name]'),
            name = $input.val();
        if (name) {
          $editModal.one('hidden.bs.modal', function (e) {
            $target.before(hostTemplate({name: name}));
            NAS.facilities.updateFacilityAmount($('.facilities-item'));
          });
          $input.val('');
        }
        $editModal.modal('hide');
      });
      $editModal.modal('show');
    });

    $opNav.on('click', 'a.js-edit-btn', function (e) {
      e.preventDefault();
      var $toEditHosts = $hosts.find(':checkbox:checked').parent('li'),
          quant = $toEditHosts.length;
      if (quant == 1) {
        var $input = $editModal.find('input[name=name]'),
            $hostName = $toEditHosts.find('span.name');
        $input.val($hostName.text());
        $editModal.one('click', '.js-confirm-btn', function (e) {
          $editModal.one('hidden.bs.modal', function (e) {
            var newName = $input.val();
            $hostName.text(newName);
            $input.val('');
          });
          $editModal.modal('hide');
        });
        $editModal.modal('show');
      } else {
        if ($toEditHosts.length > 1) {
          alert('只能对单个主机进行操作');
        } else if ($toEditHosts.length < 1) {
          alert('请选择主机');
        }
      }
    });

    $opNav.on('click', 'a.js-delete-btn', function (e) {
      e.preventDefault();
      var $toDeleteHosts = $hosts.find(':checkbox:checked').parent('li');
      if ($toDeleteHosts.length < 1) return alert('请选择主机');
      $deleteModal.one('click', '.js-confirm-btn', function (e) {
        $deleteModal.one('hidden.bs.modal', function (e) {
          $toDeleteHosts.remove();
          NAS.facilities.updateFacilityAmount($('.facilities-item'));
        });
        $deleteModal.modal('hide');
      });
      $deleteModal.modal('show');
    });

    $hosts.on('change', ':checkbox', NAS.facilities.onFacilityChecked);
  });
}(window.jQuery, window.Handlebars, window.NAS);
