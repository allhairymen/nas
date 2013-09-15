+function ($, Handlebars, NAS) { 'use strict';
  NAS.scheduling.bindNewEvent = function (options) {
    options = options || {};
    var $newEvtBtn = $('button.js-schedule-new-evt-btn'),
        newEvtTemplate = Handlebars.compile(
          $('#new-event-template').html())({delete: false}),

        // parse options
        cancelHandler = options.cancelHandler ||
          function (e) {
            e.preventDefault();
            //FIXME: `destroy' not remove the popover dom element
            //       `toggle' comes to the rescue (workaround)
            //       feels like a bootstrap bug
            $newEvtBtn.popover('toggle');
          },
        confirmHandler = options.confirmHandler;

    $newEvtBtn.on('click', function (e) {
      $newEvtBtn.popover({
        content: newEvtTemplate
      });
      $newEvtBtn.popover('toggle');

      var $newEvtDialog = $('.new-schedule'),
          $nursesAppointed = $('.new-schedule input[name="nurses"]'),
          $cancelNewEvtBtn = $('.new-schedule .popover-close'),
          $confirmNewEvtBtn = $('.new-schedule .js-confirm-btn'),
          $appointNursesBtn = $('.new-schedule .js-appoint-nurses');

      $appointNursesBtn.on('click', function (e) {
          var $modal = $('#add-nurses'),
              $confirmBtn = $('#add-nurses .js-confirm-btn');

          if (!$nursesAppointed.val()) {
            $modal.find(':checked').prop('checked', false);
          }
          $confirmBtn.one('click', function (e) {
            var nursesNames = $.trim(
              $modal.find(':checked')
                    .parent()
                    .text())
                    .split(/\s+/)
                    .join(', ');
            $modal.one('hidden.bs.modal', function (e) {
              $nursesAppointed.val(nursesNames);
            });
            $modal.modal('hide');
          });
          $modal.modal('show');
        });
      $cancelNewEvtBtn.one('click', null, {newEvtDialog: $newEvtDialog},
        cancelHandler);
      $confirmNewEvtBtn.one('click', null, {newEvtDialog: $newEvtDialog},
        confirmHandler);
    });
  };
}(window.jQuery, window.Handlebars, window.NAS);
