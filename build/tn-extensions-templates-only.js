angular.module('tn.extensions.templates', ['template/tn/actionPopup/actionPopupTemplate.html', 'template/tn/actionPopup/actionTooltipTemplate.html']);

angular.module("template/tn/actionPopup/actionPopupTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tn/actionPopup/actionPopupTemplate.html",
    "<div class=\"tn-action-popup-window\" tn-direct-click=\"close()\">\n" +
    "    <div class=\"tn-action-popup-window-content\" ng-transclude></div>\n" +
    "</div>");
}]);

angular.module("template/tn/actionPopup/actionTooltipTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tn/actionPopup/actionTooltipTemplate.html",
    "<div class=\"tn-action-popup-window\" tn-direct-click=\"close()\">\n" +
    "    <div class=\"tn-action-tooltip-window-content\" \n" +
    "        ng-style=\"{top: popupOptions.tooltip.top+popupOptions.tooltip.height+'px', left: popupOptions.tooltip.left+popupOptions.tooltip.width+'px'}\">\n" +
    "        <div ng-transclude></div>\n" +
    "    </div>\n" +
    "</div>");
}]);
