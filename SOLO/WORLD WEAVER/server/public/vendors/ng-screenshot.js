if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  module.exports = 'ng-screenshot';
}

(function() {
  'use strict';
  var html2canvas = null,
    saveAs = null;

  if (window && window.html2canvas) {
    html2canvas = window.html2canvas;
  } else if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
    module.exports === exports && module.exports === 'ng-screenshot'
  ) {
    html2canvas = require('html2canvas');
  }

  if (window && window.saveAs) {
    saveAs = window.saveAs;
  } else if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
    module.exports === exports && module.exports === 'ng-screenshot'
  ) {
    saveAs = require('file-saver').saveAs;
  }

  angular.module('ng-screenshot', ['ng'])
    .directive('screenshot', function() {

      return {
        restrict: 'EA',
        template: '<div ng-transclude></div>',
        transclude: true,
        replace: true,
        compile: function(element, attrs) {
          return {
            post: function(scope, element, attrs) {
              var screenshot = function(ele) {
                html2canvas(ele).then(function(canvas) {
                  canvas.toBlob(function(blob) {
                    saveAs(blob, "screenshot.png");
                  }, 'image/png');
                })
              }
              if (attrs.screenshotTrigger) {
                angular.element(attrs.screenshotTrigger).click(function() {
                  screenshot(element);
                })
              }

            }
          }
        }
        // link: function(scope, element, attrs) {}
      }
    });
})();
