define(['jquery', 'angular', 'text!./webVideoPlayerTemplate.html'],
	function($, angular, playerTemplate) {
		var getResizeHeight = ['$parse',
			function($parse) {
				return {
					scope: {
						source: '=webVideoPlayer',
						volume: '=webVideoPlayerVolume',
						cues: '=webVideoPlayerCues',
						lastCue: '=webVideoPlayerLastCueIndex',
						progress: '=webVideoPlayerProgress',
						paused: '=webVideoPlayerPaused'
					},
					replace: true,
					template: playerTemplate,
					controller: function($scope, $element, $attrs) {
						var volumeClickarea = $($element).
						find('.web-video-player-volume>div'),
							volumePic = $($element.find('.web-video-player-volume>div>div')),
							documentElement = $(document),
							timelineElement = $($element).
							find('.web-video-player-timeline'),
							timelineBar = $($element).
							find('.web-video-player-timeline>div>div');

						$scope.videoPath;
						$scope.progressPercent = 0;
						$scope.pause = true;

						$scope.cuePoints = [];

						$scope.$watch('cues', function(newValue) {

							if (Array.isArray(newValue)) {
								$scope.cuePoints = newValue;
							}
						});

						$scope.videoLoaded = false;

						$scope.$watch('paused', function(newValue) {

							if (typeof newValue !== 'undefined') {
								$scope.changePause(newValue);
							}
						});

						$scope.changePause = function(newValue) {

							if (newValue) {
								getVideoElement().pause();
								$scope.pause = true;

								if (typeof $scope.paused !== 'undefined') {
									$scope.paused = true;
								}
							} else {
								getVideoElement().play();
								$scope.pause = false;

								if (typeof $scope.paused !== 'undefined') {
									$scope.paused = false;
								}
							}
						};

						$scope.$watch('progress', function(newValue) {

							if ($scope.videoLoaded && typeof newValue !== 'undefined' && $scope.progressPercent !==
								newValue) {
								$scope.progressPercent = newValue;
								reset();
							}
						});

						function reset() {
							$scope.videoLoaded = true;
							$scope.seek($scope.progress / 100);
						}

						$scope.seek = function(fraction) {
							getVideoElement().currentTime =
								getVideoElement().duration * fraction;
						};

						function getVideoElement() {
							return $($element).find('video')[0];
						}

						$scope.isPlaying = function() {
							return !getVideoElement().paused;
						};

						function getLastCue() {
							var currentFraction = getVideoElement().currentTime /
								getVideoElement().duration,
								cueIndex = -1,
								cues = $scope.cuePoints,
								left,
								right,
								center;

							if (cues.length == 0 || cues[0] > currentFraction) {
								return -1;
							}

							left = 0;
							right = cues.length - 1;
							while (left < right) {
								center = Math.floor((left + right) / 2);

								if (currentFraction < cues[center]) {
									right = center - 1;
								} else {
									left = center + 1;
								}
							}

							if (cues[left] > currentFraction) {
								return left - 1;
							} else {
								return left;
							}
						}

						$scope.$watch('volume', function(newValue) {

							if (typeof newValue !== 'undefined') {
								changeVolume(newValue);
							}
						});

						function changeVolume(newValue) {

							if (newValue < 0 || newValue > 1) {
								throw new Error('Incorrect volume value: ' +
									newValue);
							}

							getVideoElement().volume = newValue;
							volumePic.css('width', newValue * 100 + '%');

							$scope.volume = newValue;
						}

						$scope.$watch('source', function(newValue) {
							$(getVideoElement()).empty().
							append('<source src="' + newValue + '" type="video/webm">');
							$scope.videoPath = newValue;
						});

						function onTimeupdate() {
							var that = this;

							$scope.$apply(function() {
								var percent = that.currentTime / that.duration * 100;

								$scope.progressPercent = percent;

								if (typeof $attrs.webVideoPlayerLastCueIndex !==
									'undefined') {
									$scope.lastCue = getLastCue();
								}

								if (typeof $scope.progress !== 'undefined') {
									$scope.progress = $scope.progressPercent;
								}
							})
						}

						function onTimelineClick(event) {

							if (!$(event.target).is('.web-video-player-cue')) {
								$scope.$apply(function() {
									var fraction = (event.pageX -
										timelineBar.offset().left) /
										timelineBar.width();

									getVideoElement().currentTime =
										getVideoElement().duration * fraction;

									$scope.progressPercent = fraction * 100;
								});
							}
						}

						function onVolumeMousedown(event) {
							$scope.$apply(function() {
								changeVolume(event.offsetX / volumeClickarea.width());
							});
						}

						function attachListeners() {
							$(getVideoElement()).on('timeupdate', onTimeupdate);
							timelineElement.on('click', onTimelineClick);
							volumeClickarea.on('mousedown', onVolumeMousedown);
							$(getVideoElement()).on('loadedmetadata', reset);
						}

						function detachListeners() {
							$(getVideoElement()).off('timeupdate', onTimeupdate);
							timelineElement.off('click', onTimelineClick);
							volumeClickarea.off('mousedown', onVolumeMousedown);
							$(getVideoElement()).off('loadedmetadata', reset);
						}

						$scope.toggleVideo = function() {

							if (getVideoElement().paused) {
								$scope.changePause(false);
							} else {
								$scope.changePause(true);
							}
						};

						$scope.$on('$destroy', function(event) {
							detachListeners();
						});

						attachListeners();
					}
				}
			}
		];

		return getResizeHeight;
	});