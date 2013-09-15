+function ($, Handlebars, NAS) { 'use strict';
  var evtDetailHandlerFactory = {};

  NAS.scheduling.closePopover = function (trigger) {
    //FIXME: `destroy' not remove the popover dom element
    //       `toggle' comes to the rescue (workaround)
    //       feels like a bootstrap bug
    $(trigger).popover('toggle');
    $('body').off('click.nas.evtDetailElse');
  };

  evtDetailHandlerFactory.create = function (options) {
    options = options || {};
    // parse options
    var detailTemplate = options.detailTemplate,
        detailElem = options.detailElem,
        cancelHandler = options.cancelHandler ||
          function (e) {
            e.preventDefault();
            NAS.scheduling.closePopover(e.data.trigger);
          },
        confirmHandler = options.confirmHandler ||
          function (e) {
            e.preventDefault();
            NAS.scheduling.closePopover(e.data.trigger);
          };

    return function bindOnTrigger (e) {
      var $trigger = $(e.currentTarget);
      $trigger.popover({
        content: detailTemplate,
        container: 'body',
        html: true,
        trigger: 'manual'
      });
      $trigger.popover('toggle');

      var $detail = $(detailElem),
          $nursesAppointed = $detail.find('input[name="nurses"]'),
          $cancelDetailBtn = $detail.find('.popover-close'),
          $confirmDetailBtn = $detail.find('.js-confirm-btn'),
          $appointNursesBtn = $detail.find('.js-appoint-nurses'),
          $deleteEvtBtn = $detail.find('.js-delete-btn');

      $appointNursesBtn.on('click', function (e) {
        var $addNursesModal = $('#add-nurses'),
            $addNursesConfirmBtn = $('#add-nurses .js-confirm-btn');

        if (!$nursesAppointed.val()) {
          $addNursesModal.find(':checked').prop('checked', false);
        }

        $addNursesConfirmBtn.one('click', function (e) {
          var nursesNames = $.trim(
            $addNursesModal.find(':checked')
                  .parent()
                  .text())
                  .split(/\s+/)
                  .join(', ');
          $addNursesModal.one('hidden.bs.modal', function (e) {
            $nursesAppointed.val(nursesNames);
          });
          $addNursesModal.modal('hide');
        });
        $addNursesModal.modal('show');
      });

      $cancelDetailBtn.one('click', null, {
        trigger: $trigger,
        detail: $detail
      }, cancelHandler);

      $confirmDetailBtn.one('click', null, {
        trigger: $trigger,
        detail: $detail
      }, confirmHandler);

      if ($deleteEvtBtn) {
        $deleteEvtBtn.one('click', function (e) {
          NAS.scheduling.closePopover($trigger);
          $trigger.remove();
        });
      }

      NAS.utils.bindDismissOnClickElsewhere({
        safeZones: [$trigger, detailElem, '#add-nurses'],
        dismissFunc: function (e) {
          $trigger.popover('toggle');
        },
        evtNamespace: 'click.nas.evtDetailElse',
        once: true
      });
    };
  };

  NAS.scheduling.evtDetailHandlerFactory = evtDetailHandlerFactory;

  NAS.scheduling.bindNewEvent = function (options) {
    options = options || {};
    $('button.js-schedule-new-evt-btn').on('click',
      evtDetailHandlerFactory.create({
        detailTemplate: Handlebars.compile(
          $('#event-detail-template').html())({edit: false}),
        detailElem: '.schedule-detail',
        cancelHandler: options.cancelHandler,
        confirmHandler: options.confirmHandler
      })
    );
  };
}(window.jQuery, window.Handlebars, window.NAS);
