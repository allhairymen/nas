+function ($, Handlebars, NAS) { 'use strict';
  var nowDraggingItemData = '',

  _grabDragData = function (dataTransfer) {
    return JSON.parse(nowDraggingItemData);
  },

  onFacilityDragstart = function (e) {
    var $target = $(e.target),
        dt = e.originalEvent.dataTransfer,
        typeClass = $target.parent('ul').attr('data-type-class');

    dt.effectAllowed = 'move';
    nowDraggingItemData = JSON.stringify({
      type_class: typeClass,
      ip: $.trim($target.text()),
      srcId: $target.attr('id')
    });
  },

  onDragFacilityOverDropzone = function (e) {
    var $dropzone = $(this),
        dragData = _grabDragData(e.originalEvent.dataTransfer),
        $container = $($dropzone.parents('.facilities-item')[0]);
    if ($container.is('.' + dragData.type_class)) {
      $(e.currentTarget).addClass("active");
      return false;
    }
  };

  $(document).ready(function (e) {
    var facilityTemplate = Handlebars.compile($('#facility-template').html()),
        $facilities = $('.js-facilities'),
        $hosts = $('.nav-pane-container ul'),
        $opNav = $('ul.operation-nav'),
        $search = $('input.search-box');

    $opNav.on('click', 'a.js-edit-btn', function (e) {
      e.preventDefault();
      var $toEditFacilities = $facilities.find(':checkbox:checked').parent('li'),
          quant = $toEditFacilities.length,
          $facilityItems = $($toEditFacilities.parents('.facilities-item')[0]);
      if (quant == 1) {
        var $modal = $('.modal[data-type-class=' + $facilityItems.attr(
          'data-type-class') + ']'),
            $input = $modal.find('input[name=facility-name]'),
            $facilityName = $toEditFacilities.find('span.facility-name');
        $input.val($facilityName.text());
        $modal.one('click', '.js-confirm-btn', function (e) {
          var newName = $input.val();
          if (newName) {
            $modal.one('hidden.bs.modal', function (e) {
              $facilityName.text(newName);
              $($toEditFacilities.attr('data-bind-host')).find('span.facility-name-ip').text(newName);
              $input.val('');
            });
          }
          $modal.modal('hide');
        });
        $modal.modal('show');
      } else {
        if ($toEditFacilities.length > 1) {
          alert('只能对单个设备进行操作');
        } else if ($toEditFacilities.length < 1) {
          alert('请选择设备');
        }
      }
    });

    $facilities.on('drop', 'ul li.new', function (e) {
      var dragData = _grabDragData(e.originalEvent.dataTransfer),
          $modal = $($(this).find('a').attr('href')),
          $dropzone = $(this),
          $facilityItems = $($dropzone.parents('.facilities-item')[0]);
      $modal.one('click', '.js-confirm-btn', function (e) {
        var $input = $modal.find('input[name=facility-name]'),
            facilityName = $input.val();
        if (facilityName) {
          $modal.one('hidden.bs.modal', function (e) {
            var $src = $('#' + dragData.srcId),
                facility = facilityTemplate({
                  name: facilityName,
                  ip: dragData.ip,
                  srcId: dragData.srcId
                });
            $dropzone.before(facility);
            $dropzone.removeClass('active');
            $src.hide()
                .data('set', true);
            NAS.facilities.updateFacilityAmount($facilityItems);
          });
        }
        $input.val('');
        $modal.modal('hide');
      });
      $modal.modal('show');
    });

    $opNav.on('click', 'a.js-delete-btn', function (e) {
      var $modal = $($(this).attr('href'));
      $modal.one('click', 'button.js-confirm-btn', function (e) {
        var $toDeleteFacilities = $facilities.find(':checked').parent('li');
        $modal.one('hidden.bs.modal', function (e) {
          $toDeleteFacilities.each(function (index, el) {
            var $el = $(el),
                $bindHost = $($el.attr('data-bind-host')),
                facilityName = $.trim($el.find('span.facility-name').text()),
                ip = $.trim($el.find('span.ip').text());
            $bindHost.show()
                     .data('set', false);
          });
          $toDeleteFacilities.remove();
          NAS.facilities.updateFacilityAmount($('.facilities-item'));
          $(document).trigger('sync.nas.actionbar', [$facilities]);
        });
        $modal.modal('hide');
      });
      $modal.modal('show');
      e.preventDefault();
    });

    $hosts.on('dragstart', 'li[draggable=true]', onFacilityDragstart);
    $facilities.on('dragover', 'ul li.new', onDragFacilityOverDropzone);
    $facilities.on('change', ':checkbox', function (e) {
      NAS.facilities.onFacilityChecked(e);
      $(document).trigger('sync.nas.actionbar', [$facilities]);
    });
    $(document).on('sync.nas.actionbar', NAS.utils.syncActionbar);
    $facilities.on('dragleave', 'ul li.new', function (e) {
      $(e.currentTarget).removeClass("active");
    });
    $facilities.on('click', 'ul li.new', false);
    NAS.facilities.bindSearchOnKeypressed($search, $hosts.find('li'), function ($host) {
      var set = $host.data('set');
      return typeof set === 'undefined' ? true : !set;
    });
  });
}(window.jQuery, window.Handlebars, window.NAS);
