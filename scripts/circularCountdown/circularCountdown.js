define(['jquery', 'angular', 'kineticjs', 'createImageLoader'],
	function($, angular, kineticjs, createImageLoader) {

		var circularCountdown = ['$parse',
			function($parse) {
				return {
					replace: true,
					scope: {
						radius: '@circularCountdownRadius',
						delays: '=circularCountdownDelays',
						pause: '=circularCountdownPause',
						onTimer: '&circularCountdownOnTimer',
						onComplete: '&circularCountdownOnComplete',
						onChange: '&circularCountdownOnChange',
						distance: '=circularCountdownProgress',
						partial: '@circularCountdownPartial',
						fill: '@circularCountdownFill',
						events: '=circularCountdownEvents',
						onEvent: '&circularCountdownOnEvent'
					},
					link: function(scope, element, attributes) {
						var elementObj = $(element),
							defaults = {
								radius: 100,
								delays: [10000],
								updateRate: 50,
								pause: false,
								onComplete: null,
								onChange: null,
								onTimer: null,
								distance: 0,
								partial: true,
								propagateAfter: 10,
								events: {
									fromEnd: null,
									fromStart: null
								},
								onEvent: null
							},
							degreeJump = Math.PI * 2 / 4,
							images = null,
							ready = false,
							lastDelayIndex = null,
							path = null,
							interval = null,
							currentOptions = $.extend({}, defaults),
							currentRefresh;

						function startCountdown() {
							var _options = currentOptions;

							if (interval === null) {
								interval = setInterval(function() {

									var delayIndex = currentDelayIndex();

									_options.distance += _options.updateRate;

									if (delayIndex >= _options.delays.length) {
										stopCountdown();
										scope.pause = true;
										scope.distance = maxDistance();
										_options.onComplete();
									} else {
										scope.distance = _options.distance;
									}

									if (!currentRefresh) {
										currentRefresh = currentOptions.propagateAfter;

										scope.$apply(function() {
											var distance = currentDelay() - currentDelayLeft(),
												lower = distance - currentOptions.updateRate *
													currentOptions.propagateAfter,
												upper = distance;

											fireEvents(lower, upper, delayIndex);

											_options.onChange({
												distance: distance
											});

											if (lastDelayIndex !== delayIndex) {
												lastDelayIndex = delayIndex;

												_options.onTimer({
													delayIndex: delayIndex
												});
											}
										});
									}

									currentRefresh--;

									refresh();
								}, _options.updateRate);
							}
						}

						function fireEvents(lower, upper, delayIndex) {
							var index,
								fromEndLength,
								eventValue;

							// fromEnd
							if (currentOptions.events.fromEnd) {
								fromEndLength = currentOptions.events.fromEnd.length;

								for (index = 0; index < fromEndLength; index++) {
									eventValue = currentOptions.events.fromEnd[index];

									if (lower <= eventValue && eventValue < upper) {

										currentOptions.onEvent({
											distance: eventValue,
											type: 'fromEnd',
											index: delayIndex
										});
									}
								}
							}
						}

						function stopCountdown() {

							if (interval) {
								clearInterval(interval);
								interval = null;
							}
						}

						function createArcMaskData(startDegree, endDegree, radius,
							degreeJump) {
							var currentDegree = startDegree,
								result = 'M' + radius + ',' + radius + ',',
								rimOffset = Math.sqrt(2) * radius - radius;

							while (endDegree > currentDegree) {
								result += Math.round(Math.sin(currentDegree) * (radius + rimOffset) +
									radius) + ',' + Math.round(-Math.cos(currentDegree) *
									(radius + rimOffset) + radius) + ',';
								currentDegree += degreeJump;
							}

							result += result += Math.round(
								Math.sin(endDegree) * (radius + rimOffset) + radius) +
								',' + Math.round(-Math.cos(endDegree) * (radius + rimOffset) + radius) +
								'z';

							return result;
						}

						function wholeDistance() {
							var index,
								_options = currentOptions,
								delay,
								result = 0;

							for (index = 0; delay = _options.delays[index]; index++) {
								result += delay;
							}

							return result;
						}

						function maxDistance() {
							var distance = 0,
								delayIndex = 0,
								delays = currentOptions.delays;

							for (; delayIndex < delays.length; delayIndex++) {
								distance += delays[delayIndex];
							}

							return distance;
						}

						function currentDelayIndex() {
							var progress = currentOptions.distance,
								delays = currentOptions.delays,
								delayIndex = 0,
								delaysLength = delays.length;

							while (progress - delays[delayIndex] >= 0 &&
								delayIndex < delaysLength) {

								progress -= delays[delayIndex];
								delayIndex++;
							}

							return delayIndex;
						}

						function currentDelay() {
							var progress = currentOptions.distance,
								delays = currentOptions.delays,
								delayIndex = 0;

							while (progress - delays[delayIndex] >= 0 &&
								delayIndex < delays.length) {

								progress -= delays[delayIndex];
								delayIndex++;
							}

							if (delayIndex === delays.length) {
								return 0;
							} else {
								return delays[delayIndex];
							}
						}

						function currentDelayLeft() {
							var distance = currentOptions.distance,
								delays = currentOptions.delays,
								delayIndex = 0;

							while (distance - delays[delayIndex] >= 0 &&
								delayIndex < delays.length) {

								distance -= delays[delayIndex];
								delayIndex++;
							}

							return distance;
						}

						function currentCountdownAngle() {
							var _options = currentOptions,
								result;

							if (_options.partial) {
								result = (currentDelayLeft() / currentDelay()) *
									(2 * Math.PI);
							} else {
								result = (_options.distance / wholeDistance()) *
									(2 * Math.PI);
							}

							return result;
						}

						function refresh() {

							if (ready) {
								var _options = currentOptions,
									angle;

								angle = currentCountdownAngle();

								path.setData(createArcMaskData(
									angle,
									Math.PI * 2,
									_options.radius,
									degreeJump
								));
								path.setFillPatternImage(images[0]);

								path.getParent().draw();
							}
						}

						function init(_images) {
							// fillPatternImage
							var stage;
							var shapesLayer = new Kinetic.Layer();
							var _options = currentOptions;

							images = _images;

							stage = new Kinetic.Stage({
								container: elementObj[0],
								width: currentOptions.radius * 2,
								height: currentOptions.radius * 2
							});

							path = new kineticjs.Path({
								x: 0,
								y: 0
							});


							shapesLayer.add(path);
							stage.add(shapesLayer);

							ready = true;

							refresh();

							if (!_options.pause) {
								currentRefresh = 0;
								startCountdown();
							} else {
								stopCountdown();
							}
						}

						scope.$watch('pause', function(newValue) {

							if (typeof newValue !== 'undefined') {
								currentOptions.pause = newValue;

								if (ready) {

									if (!newValue) {
										currentRefresh = 0;
										startCountdown();
									} else {
										stopCountdown();
									}
								}
							}
						});

						scope.$watch('onTimer', function(newValue) {

							if (typeof newValue === 'function') {
								currentOptions.onTimer = newValue;
							}
						});

						scope.$watch('onEvent', function(newValue) {

							if (typeof newValue === 'function') {
								currentOptions.onEvent = newValue;
							}
						});

						scope.$watch('onComplete', function(newValue) {

							if (typeof newValue === 'function') {
								currentOptions.onComplete = newValue;
							}
						});

						scope.$watch('onChange', function(newValue) {

							if (typeof newValue === 'function') {
								currentOptions.onChange = newValue;
							}
						});

						scope.$watch('partial', function(newValue) {
							currentOptions.partial = newValue;
						});

						scope.$watch('delays', function(newValue) {

							if (Array.isArray(newValue)) {
								currentOptions.delays = newValue;
							}
						});

						scope.$watch('events', function(newValue) {

							if (typeof newValue !== 'undefined') {
								currentOptions.events = newValue;
							}
						});

						scope.$watch('distance', function(newValue) {
							var _options = currentOptions,
								delayIndex;

							if (typeof newValue === 'number' &&
								newValue !== currentOptions.distance) {

								currentOptions.distance = newValue;
								refresh();

								delayIndex = currentDelayIndex();

								_options.onTimer({
									delayIndex: delayIndex
								});

								if (delayIndex >= _options.delays.length) {
									stopCountdown();
									scope.pause = true;
									scope.distance = maxDistance();
									_options.onComplete();
								}
							}
						});

						scope.$watch('radius', function(newValue) {

							if (typeof newValue !== 'undefined') {
								currentOptions.radius = parseInt(newValue);
								refresh();
							}
						});

						scope.$watch('fill', function(newValue) {

							if (typeof newValue !== 'undefined') {
								createImageLoader().load([newValue]).done(init);
							}
						});

						scope.$on('$destroy', function() {
							stopCountdown();
						});
					}
				}
			}
		];

		return circularCountdown;
	});