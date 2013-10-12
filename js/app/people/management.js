+function ($) { 'use strict';
  var Handlebars = this.Handlebars,
      NAS = this.NAS;

  $(document).ready(function ($) {
    var $people = $('.people-management'),
        $opNav = $('ul.operation-nav'),
        $editModal = $('#myModal_2'),
        $deleteModal = $('#myModal_1'),
        personTemplate = Handlebars.compile($('#person-template').html());

    $people.on('click', 'li.new', function (e) {
      e.preventDefault();
      var $target = $(this);
      $editModal.one('click', 'button.js-confirm-btn', function (e) {
        var $input = $editModal.find('input[name=name]'),
            name = $input.val();
        if (name) {
          $editModal.one('hidden.bs.modal', function (e) {
            $target.before(personTemplate({name: name}));
          });
          $input.val('');
        }
        $editModal.modal('hide');
      });
      $editModal.modal('show');
    });

    $opNav.on('click', 'a.js-edit-btn', function (e) {
      e.preventDefault();
      var $toEditHosts = $people.find(':checkbox:checked').parent('li'),
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
          alert('只能对单个人员进行操作');
        } else if ($toEditHosts.length < 1) {
          alert('请选择人员');
        }
      }
    });

    $opNav.on('click', 'a.js-delete-btn', function (e) {
      e.preventDefault();
      var $toDeletePeople = $people.find(':checkbox:checked').parent('li');
      if ($toDeletePeople.length < 1) return alert('请选择人员');
      $deleteModal.one('click', '.js-confirm-btn', function (e) {
        $deleteModal.one('hidden.bs.modal', function (e) {
          $toDeletePeople.remove();
          $(document).trigger('sync.nas.actionbar', [$people]);
        });
        $deleteModal.modal('hide');
      });
      $deleteModal.modal('show');
    });

    $people.on('change', ':checkbox', function (e) {
      NAS.facilities.onFacilityChecked(e);
      $(document).trigger('sync.nas.actionbar', [$people]);
    });
    $(document).on('sync.nas.actionbar', NAS.utils.syncActionbar);
  });
}.call(this, window.jQuery);
