+function ($) { 'use strict';
  var Handlebars = this.Handlebars,
      $pin = $('<img>').attr('src', 'img/pin.png')
                       .attr('width', '50px')
                       .attr('height', '40px'),
      landmarkId = 1,
      FACILITY_LANDMARK_ID_MIMETYPE = 'text/x-nas-facility-landmark-id',

  bindSmoothZoom = function ($floorImg) {
    $floorImg.smoothZoom({
      width: 850,
      height: 515,
      pan_BUTTONS_SHOW: "NO",
      pan_LIMIT_BOUNDARY: "NO",
      button_SIZE: 24,
      button_ALIGN: "top right",
      zoom_MAX: 200,
      border_TRANSPARENCY: 20,
      container: 'zoom_container'
    });
  },

  onFacilityDragStart = function (e) {
    var origEvt = e.originalEvent,
        dt = origEvt.dataTransfer;

    dt.setDragImage($pin[0], 25, 40);
    dt.setData('text/plain', $.trim($(this).text()));
    dt.effectAllowed = 'link';
  },

  onFacilityDragAgain = function (e) {
    var origEvt = e.originalEvent,
        dt = e.originalEvent.dataTransfer;

    dt.setDragImage($pin[0], 25, 40);
    dt.setData('text/plain', $(this).text());
    dt.setData(FACILITY_LANDMARK_ID_MIMETYPE, $(this).attr("id"));
    dt.effectAllowed = 'move';
  },

  _dropRemoveFacility = function ($floorImg, dataTransfer) {
    if (dataTransfer.effectAllowed === 'move') {
      $floorImg.smoothZoom('removeLandmark',
        [dataTransfer.getData(FACILITY_LANDMARK_ID_MIMETYPE)]);
    }
  },

  bindDropFacilityElsewhere = function ($floorImg) {
    $('body').on('drop', function (e) {
      var origEvt = e.originalEvent,
          dt = e.originalEvent.dataTransfer;

      if (dt.effectAllowed === 'move') _dropRemoveFacility($floorImg, dt);
    });
  },

  bindDropFacilityOnMap = function ($dropzone, $floorImg, landmarkTemplate) {
    $dropzone.on('drop', function (e) {
      var origEvt = e.originalEvent,
          dt = origEvt.dataTransfer,
          facilityName = dt.getData('text/plain'),
          id = 'facility-landmark-' + landmarkId++,
          landmark = landmarkTemplate({
            posX: origEvt.offsetX,
            posY: origEvt.offsetY,
            name: facilityName,
            id: id
          });

      if (dt.effectAllowed === 'move') _dropRemoveFacility($floorImg, dt);
      $floorImg.smoothZoom('addLandmark', [landmark]);
      $('div#' + id).on('dragstart', onFacilityDragAgain);
    });
  };

  $(document).ready(function () {
    var $floorImg = $('#floor-plan'),
        $dropzone = $('#zoom_container'),
        landmarkTemplate = Handlebars.compile($('#landmark-template').html());

    bindSmoothZoom($floorImg);
    bindDropFacilityOnMap($dropzone, $floorImg, landmarkTemplate);
    bindDropFacilityElsewhere($floorImg);
    $('.nav-pane-container ul').on('dragstart', '[draggable=true]',
      onFacilityDragStart);
    $dropzone.on('dragover', false);
    $('body').on('dragover', false);
  });
}.call(this, window.jQuery);
