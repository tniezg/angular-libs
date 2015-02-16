#AngularJS directives and services with examples

##Contents
* [Bulk Image Loader](#tnBulkImageLoader)
* [Measure On Resize](#tnMeasureOnResize)
* [Action Popup](#tnActionPopup)
* [Direct Click](#tnDirectClick)
* [Local Storage](#tnLocalStorage)
* [PersistentConfig](#tnPersistentConfig)


##<a id="tnBulkImageLoader"></a>Bulk Image Loader (service)
Allows preloading of multiple images at once in the background. Provides events on image load success and error.

###In a controller or directive:
```javascript
angular.module('app').controller(
    'ExampleCtrl', [
        'tnBulkImageLoader', '$scope',
        function(tnBulkImageLoader, $scope) {
            function onImageLoad(information) {
				// do something on image load
            }

            $scope.downloadImages = function() {
                tnBulkImageLoader.load([
                    'images/bulk-loader-1.jpg',
                    'images/bulk-loader-2.jpg'
                ]);

                tnBulkImageLoader.on('imageLoadDone', onImageLoad);
            };
        }
    ]
);
```

##<a id="tnMeasureOnResize"></a>Measure On Resize (directive)
Gets element's position and dimensions on browser window size changes and page scroll.

###In a view:
```html
<div tn-measure-on-resize="onResize(width, height, top, left, relativeTop, relativeLeft)" tn-measure-on-resize-init="onResize(width, height, top, left, relativeTop, relativeLeft)"></div>
```

##<a id="tnActionPopup"></a>Action Popup (service)
Displays a modal popup (by default) that can be populated with content.

###In a controller or directive:
```javascript
angular.module('app').controller(
    'ExampleCtrl', [
        '$scope', 'tnActionPopup',
        function($scope, tnActionPopup) {
            popup = tnActionPopup.open({
                contentTemplate: 'views/actionPopupExampleContent.html',
                scope: $scope
            });
        }
    ]
);
```

##<a id="tnDirectClick"></a>Direct Click (directive)
Variation of ng-click reacting only when tag with attached directive is clicked, not it's children.

###In a view:
```html
<div tn-direct-click="valueIncreasedWithDirectClick = valueIncreasedWithDirectClick + 1">
    Click me directly
    <button>Can't click me</button>
</div>
```

##<a id="tnLocalStorage"></a>Local Storage (service)
Adapter for native localStorage.

###In a controller or service:
```javascript
angular.module('app').controller(
    'ExampleCtrl', [
        'tnLocalStorage', '$scope',
        function(tnLocalStorage, $scope) {

            $scope.put = function() {
                tnLocalStorage.put('name', 'Foo');
            };

            $scope.remove = function() {
                tnLocalStorage.remove('name');
            };

            $scope.get = function() {
                return tnLocalStorage.get('name');
            };
        }
    ]
);
```

##<a id="tnPersistentConfig"></a>PersistentConfig (service)
Provides a convenient and concise method of saving information to localStorage.

###In a controller or service:
```javascript
angular.module('app').controller(
    'ExampleCtrl', [
        'tnPersistentConfig', '$scope',
        function(configObject, $scope) {
            configObject.name = 'Tom';
            configObject.country = 'Poland';
        }
    ]
);
```






<!--##<a id="automatic_resize"></a>AutomaticResize

Extends ngModel to enable automatic resizing of input fields horizontally based on contents.

###Place an input in a view:
```html
<input automatic-resize min-width="200" max-width="145" ng-model="search" type="text"/>
```




##<a id="delayed_input"></a>DelayedInput

A directive that extends ngModel to synchronize the view with the view-model but after a custom delay.

###In a view:
```html
<input delayed-input="searchDelayed" propagation-delay="300" ng-model="search" type="text"/>
```






##<a id="disqus"></a>Disqus

Allows embedding of [Disqus](http://disqus.com) dinamically, multiple times after the page has loaded. Required Disqus embed script as an AMD dependency under the name `disqusEmbed`.

###Add a global variable before disqus gets initialized:
```html
var disqus_shortname = 'yourshortname';
```

###Usage inside views:

```html
<div disqus-identifier="{{postId}}" disqus-url="{{url}}/{{postId}}" disqus></div>
```







##<a id="get_resize_width"></a>GetResizeWidth

Directive for AngularJS which listens for the window resize event and sets a model value with the width of the chosen element.

###In a view:
```
<div get-resize-width="targetModel">element resized with browser window</div>
```






##<a id="prevent_default_click"></a>PreventDefaultClick

PreventDefaultClick allows `<a>` links to be opened in another window when **ctrl** or **cmd** buttons are pressed while clicking on them. Otherwise, an expression will be evaluated, the same behavior as when using ng-click. The directive is wrapped in a RequireJS module.

###Connect it to Angular:
`module` - reference to an Angular module
```javascript
module.directive('preventDefaultClick', preventDefaultClick);
```

###In a view:
```html
<a href="someurl.com" prevent-default-click="expression_to_evaluate()" target="_blank">link</a>
```-->