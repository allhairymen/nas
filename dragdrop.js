(function () {
  'use strict';
  var $pin = $('<img>').attr('src', 'img/pin.png');

  var bindPanZoom = function () {
    $(".panzoom").panzoom({
      $zoomIn: $(".zoom-in"),
      $zoomOut: $(".zoom-out"),
      $zoomRange: $(".zoom-range"),
      $reset: $(".reset"),
      contain: "invert",
      minScale: 1
    }).panzoom("zoom");
  },

  bindDragDrop = function () {
    $("img").on("dragover", function (e) {
      e.preventDefault();
      var evt = e.originalEvent;
      $("#pos").html(evt.offsetX + ',' + evt.offsetY);
    });

    $("img").on("drop", function (e) {
      e.preventDefault();
      // var evt = e.originalEvent;
      // $("#pos").html(evt.offsetX + ',' + evt.offsetY);
    });

    $("#drag").on("dragstart", function (e) {
      var evt = e.originalEvent;
      evt.dataTransfer.setDragImage($pin.get(0), 25, 10);
      evt.dataTransfer.effectAllowed = 'none';
      e.stopPropagation();
    });

    $("#drag").on("dragend", function (e) {
      var evt = e.originalEvent;
      e.stopPropagation();
      // $("#pos").html(evt.pageX + ',' + evt.pageY);
    });
  };

  $(document).ready(function () {
    // bindPanZoom();
    bindDragDrop();
  });

}());
