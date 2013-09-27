+function ($, NAS) { 'use strict';
  if(NAS.scheduling.day == undefined){
    NAS.scheduling.day = { };
    
    NAS.scheduling.day.bindCalendarNavEvent = function () {
      $('table.calendar-day .day').on('click', function (e) {
        var trigger = $(this);
        if(trigger.is('.today')) return;
        
        var day = parseInt(trigger.html());
        NAS.scheduling.day.activeDay($($('.js-day-nav .pages a')[day - 1]));
      });
    };
    
    NAS.scheduling.day.bindDayNavEvent = function () {
      $('.js-day-nav .pages a').on('click', function (e) {
        e.preventDefault();
        var trigger = $(this);
        if (trigger.is('.active')) return;        
        NAS.scheduling.day.activeDay(trigger);
      });
      
      $('.js-day-nav .prev').on('click', function (e) {
        e.preventDefault();        
        var current = $('.js-day-nav .active');
        var prev = current.prev('a:first');
        if (prev.length) NAS.scheduling.day.activeDay(prev);
      });
      
      $('.js-day-nav .next').on('click', function (e) {
        e.preventDefault();        
        var current = $('.js-day-nav .active');
        var next = current.next('a:first');
        if (next.length) NAS.scheduling.day.activeDay(next);
      });
    };
    
    NAS.scheduling.day.activeDay = function (el) {
        var currentDay = parseInt(el.html());        
        $('.js-day-nav .active').removeClass('active');
        el.addClass('active');
        $('table.calendar-day .day.today').removeClass('today');
        $($('table.calendar-day .day')[currentDay - 1]).addClass('today');
        // display
        $('div.current-day h1').text(currentDay);
        $('div.current-day h3').html($('div.current-day h3').html()
          .replace(/\u6708\d+/, '\u6708' + currentDay));
    };
  }

  $(document).ready(function () {
    NAS.scheduling.bindNewEvent();
    NAS.scheduling.day.bindDayNavEvent();
    NAS.scheduling.day.bindCalendarNavEvent();
    
    var $calTbl = $('table.calendar.days');
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
