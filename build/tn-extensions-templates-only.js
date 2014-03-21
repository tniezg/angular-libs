angular.module('tn.extensions.templates', ['template/actionPopup/actionPopupTemplate.html']);

angular.module("template/actionPopup/actionPopupTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/actionPopup/actionPopupTemplate.html",
    "<div class=\"tn-action-popup-window\">\n" +
    "    <div class=\"tn-action-popup-window-content\" ng-transclude></div>\n" +
    "</div>");
}]);
