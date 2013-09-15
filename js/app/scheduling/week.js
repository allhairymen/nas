+function ($, NAS) { 'use strict';
  $(document).ready(function () {
    NAS.scheduling.bindNewEvent();
    var $calTbl = $('table.calendar.weeks');
    $calTbl.on('click', '.event', function (e) {
      var $target = $(e.currentTarget),
          nurses = $target.html(),
          handler = NAS.scheduling.evtDetailHandlerFactory.create({
            detailTemplate: Handlebars.compile(
              $('#event-detail-template').html())({
                edit: true,
                nurses: nurses
              }),
            detailElem: '.schedule-detail',
            confirmHandler: function (e) {
              var $trigger = $(e.data.trigger),
                  $detail = $(e.data.detail);
              e.preventDefault();
              if (nurses = $.trim($detail.find('input[name=nurses]').val())) {
                $trigger.html(nurses);
              }
              NAS.scheduling.closePopover($trigger);
            }
          });
      handler(e);
    });
  });
}(window.jQuery, window.NAS);
