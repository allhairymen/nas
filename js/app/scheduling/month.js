+function ($, NAS) { 'use strict';
  NAS.scheduling.MONTH_GRID_MAX_HEIGHT = '82px';

  var _calcEvtListHeight = function (evtList) {
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
    var $calendarTbl = $('table.calendar.months');
    $calendarTbl.find('.today .event').each(function (index, evtList) {
      testRemoveMoreLink(evtList);
    });
  },

  testAddMoreLink = function (evtList) {
    if (_calcEvtListHeight(evtLIst) >
        parseInt(NAS.scheduling.MONTH_GRID_MAX_HEIGHT, 10)) {
      $(evtList).siblings('a.more').show();
    }
  },

  bindShowMoreOrLessEvents = function () {
    var $calendarTbl = $('table.calendar.months'),

    showMoreHandler = function (e) {
      var $moreLink = $(e.target);
      e.preventDefault();
      $moreLink.siblings('.event').css('max-height', 'none');

      // show less
      var $lessLink = $moreLink;
      $lessLink.html('收起');
      $lessLink.one('click', hideMoreHandler);
    },

    hideMoreHandler = function (e) {
      var $lessLink = $(e.target);
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
    var $newEvtDialog = e.data.newEvtDialog,
        $newEvtBtn = e.data.newEvtBtn;
  };

  $(document).ready(function () {
    testRemoveNotNeededMoreLink();
    bindShowMoreOrLessEvents();
    NAS.scheduling.bindNewEvent();
  });
}(window.jQuery, window.NAS);
