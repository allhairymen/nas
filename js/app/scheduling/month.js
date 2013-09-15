+function ($, Handlebars, NAS) { 'use strict';
  NAS.scheduling.MONTH_GRID_MAX_HEIGHT = '82px';
  var CALENDAR_TBL_SEL = 'table.calendar.months',

  _calcEvtListHeight = function (evtList) {
    var height = 0,
        $evtList = $(evtList);

    $evtList.find('li').each(function (index, evt) {
      height += $(evt).outerHeight();
    });

    return height;
  },

  testRemoveMoreLink = function (evtList) {
    if (_calcEvtListHeight(evtList) <=
        parseInt(NAS.scheduling.MONTH_GRID_MAX_HEIGHT, 10)) {
      $(evtList).siblings('a.more').hide();
    }
  },

  testRemoveNotNeededMoreLink = function () {
    var $calendarTbl = $(CALENDAR_TBL_SEL);
    $calendarTbl.find('.event').each(function (index, evtList) {
      testRemoveMoreLink(evtList);
    });
  },

  testAddMoreLink = function (evtList) {
    if (_calcEvtListHeight(evtList) >
        parseInt(NAS.scheduling.MONTH_GRID_MAX_HEIGHT, 10)) {
      $(evtList).siblings('a.more').show();
    }
  },

  bindShowMoreOrLessEvents = function () {
    var $calendarTbl = $(CALENDAR_TBL_SEL),

    showMoreHandler = function (e) {
      var $moreLink = $(e.currentTarget);
      e.preventDefault();
      $moreLink.siblings('.event').css('max-height', 'none');

      // show less
      var $lessLink = $moreLink;
      $lessLink.html('收起');
      $lessLink.one('click', hideMoreHandler);
    },

    hideMoreHandler = function (e) {
      var $lessLink = $(e.currentTarget);
      e.preventDefault();
      $lessLink.siblings('.event')
               .css('max-height', NAS.scheduling.MONTH_GRID_MAX_HEIGHT);

      // show more
      var $moreLink = $lessLink;
      $moreLink.html('更多');
      $moreLink.one('click', showMoreHandler);
    };

    $calendarTbl.one('click', 'td a.more', showMoreHandler);
  },

  confirmNewEvtHandler = function (e) {
    var $calTbl = $(CALENDAR_TBL_SEL),
        $detail = e.data.detail,
        $trigger = e.data.trigger,
        // pure stab
        $monthEvtList = $calTbl.find('.the-day .event'),
        nurses = $detail.find('input[name="nurses"]').val(),
        evtEntryTemplate = Handlebars.compile(
          $('#month-event-entry-template').html())({nurses: nurses});

    e.preventDefault();
    NAS.scheduling.closePopover($trigger);
    if (nurses) {
      var evtList;
      if (!(evtList = $monthEvtList.find('ul'))[0]) {
        evtList = $('<ul>').append(evtEntryTemplate);
      } else {
        evtList.append(evtEntryTemplate);
      }
      $monthEvtList.html(evtList);
    }
  },

  bindMonthEvtEntry = function (e) {
    var $target = $(e.currentTarget),
        nurses = $target.find('.people').html(),
        handler = NAS.scheduling.evtDetailHandlerFactory.create({
          detailTemplate: Handlebars.compile(
            $('#event-detail-template').html())({
              edit: true,
              nurses: nurses
            }),
          detailElem: '.schedule-detail'
        });
    handler(e);
  },

  syncActiveIndicator = function (e) {
    var $target = $(e.currentTarget),
        $calTbl = $(CALENDAR_TBL_SEL);
    $calTbl.find('.event li').removeClass("active");
    $target.addClass("active");
  };

  $(document).ready(function () {
    bindShowMoreOrLessEvents();
    testRemoveNotNeededMoreLink();
    NAS.scheduling.bindNewEvent({
      confirmHandler: confirmNewEvtHandler
    });

    var $calTbl = $(CALENDAR_TBL_SEL);
    $calTbl.on('click', '.event li', syncActiveIndicator);
    $calTbl.on('click', '.event li', bindMonthEvtEntry);
  });
}(window.jQuery, window.Handlebars, window.NAS);
