#AngularJS directives and services

##Contents
* [AutomaticResize](#automatic_resize)
* [DelayedInput](#delayed_input)
* [Disqus](#disqus)
* [GetResizeWidth](#get_resize_width)
* [PreventDefaultClick](#prevent_default_click)


##<a id="automatic_resize"></a>AutomaticResize

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
```