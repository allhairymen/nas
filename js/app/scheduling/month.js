+function ($, NAS) { 'use strict';
  var confirmNewEvtHandler = function (e) {
    var $dialog = e.data.newEvtDialog;
  };

  $(document).ready(function () {
    NAS.scheduling.bindNewEvent();
  });
}(window.jQuery, window.NAS);
