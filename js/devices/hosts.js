+function ($) { "use strict";
  var bindDrag = function () {
    $(".js-devices-list").on("dragstart", '[draggable="true"]', function (e) {
      var dataTransfer = e.originalEvent.dataTransfer;
      e.stopPropagation();
      dataTransfer.effectAllowed = "link";
      dataTransfer.dropEffect = "link";
      dataTransfer.setData("text/plain", this.innerHTML);
    });
  },

  bindDrop = function () {
    var $dropzone = $(".js-dropzone"),
        $modal = $("#js-modal"),
        $confirmBtn = $("#js-modal .js-confirm-btn");

    $dropzone.on("dragover", function (e) {
      e.preventDefault();
      e.originalEvent.dataTransfer.dropEffect = "link";
    });

    $dropzone.on("drop", function (e) {
      var hostIP = e.originalEvent.dataTransfer.getData("text/plain");
      e.stopPropagation();
      $modal.modal("show");
      $confirmBtn.one("click", function (e) {
        $modal.one("hidden.bs.modal", function (e) {
          $dropzone.html($("<strong>").html(hostIP));
        });
        $modal.modal("hide");
      });
    });
  };

  $(document).ready(function () {
    bindDrag();
    bindDrop();
  });
}(window.jQuery);
