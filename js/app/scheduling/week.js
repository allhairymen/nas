+function ($, NAS) { 'use strict';
  if(NAS.scheduling.week == undefined){
    NAS.scheduling.week = { };
    
    NAS.scheduling.week.bindNavEvent = function () {
      $('.pagination.weeks .pages a').on('click', function () {
        NAS.scheduling.week.nav(this);
      });
      
      $('.pagination.weeks .prev').on('click',  function() {
        NAS.scheduling.week.nav($('.pagination.weeks .pages a.active').prev('a:first'));
      });
      
      $('.pagination.weeks .next').on('click',  function() {
        NAS.scheduling.week.nav($('.pagination.weeks .pages a.active').next('a:first'));
      });
    };
    
    NAS.scheduling.week.nav = function (el) {
      el = $(el);
      if (!el || !el.length || el.is('.active')) return;
      $('.pagination.weeks .pages a.active').removeClass('active');
      el.addClass('active');
      $('.calendar.weeks .date').each( function (index) {
        var date = new Date(el.attr('data-weekfrom'));
        date.setDate(date.getDate() + index);
        $(this).html((date.getMonth() + 1) + '\u6708' + date.getDate() + '\u65E5');
      });
    };
  }

  $(document).ready(function () {
    NAS.scheduling.bindNewEvent();
    NAS.scheduling.week.bindNavEvent();
    
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
